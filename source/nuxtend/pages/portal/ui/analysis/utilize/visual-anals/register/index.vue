<template>
  <div>
    <h1>데이터 시각분석 등록</h1>
    <p>정보입력 *표시는 필수 입력사항입니다.</p>
    <div>
      <table>
        <tbody>
          <tr>
            <th>제목 *</th>
            <td>
              <text-input
                placeholder="제목을 입력해주세요.(50자 내외)"
                label-name="title"
                @input="changedInput"
              ></text-input>
            </td>
          </tr>
          <tr>
            <th>설명 *</th>
            <td>
              <basic-textarea
                placeholder="설명을 4000자 이내로 입력해주세요."
                maxlength="4000"
                label-name="contsDesc"
                @input="changedTextarea"
              ></basic-textarea>
              <span>{{ descLength }} / 4000</span>
            </td>
          </tr>
          <tr>
            <th>썸네일 이미지 *</th>
            <td>
              <input
                type="file"
                accept="jpg,gif,png,bmp"
                ref="thumbImg"
                @change="changeFile"
              />
              (형식 : JPG, GIF, PNG, BMP / 권장 사이즈 : W800 )
              <img :src="uploadedImage" />
              <basic-button v-if="uploadedImage" @click="deleteFile">
                <slot>
                  <span>X</span>
                </slot>
              </basic-button>
            </td>
          </tr>
          <tr>
            <th>카테고리 *</th>
            <td>
              <basic-com-code
                type="select"
                @onChanged="changedCtgry"
                code-id="VISUAL_ANALS_CTGRY"
              ></basic-com-code>
            </td>
          </tr>
          <tr>
            <th>제공기관</th>
            <td>
              {{ selectedAgency.code_nm }}
              <basic-button @click="openModal('A')">
                <slot>
                  <span>검색</span>
                </slot>
              </basic-button>
            </td>
          </tr>
          <tr>
            <th>활용 데이터 *</th>
            <td>
              <basic-button @click="openModal('D')">
                <slot>
                  <span>검색</span>
                </slot>
              </basic-button>
              <div v-if="selectedDataList.length > 0">
                <span v-for="(item, i) in viewSelectedDataList">
                  {{ item.data_nm }}
                  <basic-button @click="deleteDataSet(i)">
                    <slot>
                      <span>X</span>
                    </slot>
                  </basic-button>
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <th>키워드 *</th>
            <td>
              <text-input
                placeholder="키워드를 입력하세요.(최대 5개) 단어와 단어는 ,(쉼표)로 구분합니다."
                label-name="keywrd"
                @input="changedInput"
              ></text-input>
            </td>
          </tr>
          <tr>
            <th>시각화 URL *</th>
            <td>
              <text-input
                placeholder="값을 입력하지 않으면 분석보기가 나타나지 않습니다. 시각분석을 확인할 수 있는 URL을 입력하세요."
                label-name="url"
                @input="changedInput"
              ></text-input>
            </td>
          </tr>
          <tr>
            <th>등록일</th>
            <td>
              <date-picker
                format="YYYY-MM-DD HH:mm"
                @change="changedDate"
              ></date-picker>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <basic-button @click="cancel">
      <slot>
        <span>취소</span>
      </slot>
    </basic-button>
    <basic-button @click="save">
      <slot>
        <span>등록</span>
      </slot>
    </basic-button>

    <modal
      :show-modal="isShowDataSetModal"
      @cancel="cancelModal('D')"
      @confirm="confirmModal('D')"
    >
      <template #header> 데이터 검색 </template>
      <template #body>
        <basic-search-bar
          :searchKeyword="dataSetSrchKeyword"
          @search="goDataSetSearch"
        ></basic-search-bar>
        <br />
        <span>총 {{ dataSetTotCnt }}건</span>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>데이터유형</th>
              <th>데이터셋 명</th>
              <th>분류</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(data, i) in dataSetList"
              :key="'ds_' + i"
              @click="rowClicked(data)"
            >
              <td :style="{ padding: '10px' }">
                <input
                  type="checkbox"
                  :id="data.biz_dataset_id"
                  :value="data.biz_dataset_id"
                  v-model="selectedIdList"
                />
              </td>
              <td :style="{ padding: '10px' }">{{ data.biz_dataset_id }}</td>
              <td :style="{ padding: '10px' }">{{ data.data_nm }}</td>
              <td :style="{ padding: '10px' }">{{ data.data_shap }}</td>
            </tr>
          </tbody>
        </table>

        <basic-pagination
          :paging-key="dataSetPaginationKey"
          :paging-object="pagingObject"
          @pagingEvent="goDataSetPage"
          :needSetPaging="false"
          :show-test-table="false"
        ></basic-pagination>
      </template>
    </modal>

    <modal
      :show-modal="isShowAgencyModal"
      @cancel="cancelModal('A')"
      @confirm="confirmModal('A')"
    >
      <template #header> 기관명 검색 </template>
      <template #body>
        <basic-search-bar
          :searchKeyword="agencySrchKeyword"
          @search="goAgencySearch"
        ></basic-search-bar>
        <br />
        <span>총 {{ agencyTotCnt }}건</span>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>기관명</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(data, i) in agencyList"
              :key="'ag_' + i"
              @click="agencyRowClicked(data)"
            >
              <td :style="{ padding: '10px' }">
                {{ i + 1 }}
              </td>
              <td :style="{ padding: '10px' }">{{ data.code_nm }}</td>
            </tr>
          </tbody>
        </table>

        <basic-pagination
          :paging-key="agencyPaginationKey"
          :paging-object="pagingObject"
          @pagingEvent="goAgencyPage"
          :needSetPaging="false"
          :show-test-table="false"
        ></basic-pagination>
      </template>
    </modal>
  </div>
</template>

<script>
import BasicButton from "@common/atoms/basic-button";
import TextInput from "@common/atoms/text-input";
import BasicTextarea from "@common/atoms/basic-textarea";
import BasicComCode from "@component/common/atoms/basic-code-view/basic-com-code";
import DatePicker from "@component/common/functional/datepicker/date-picker";
import Modal from "@component/common/molecules/modal/modal";
import BasicPagination from "@common/atoms/basic-pagination";
import BasicSearchBar from "@common/atoms/basic-search-bar";
import _ from "lodash";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "analysis-visual-anals-register",
  components: {
    BasicButton,
    TextInput,
    BasicTextarea,
    BasicComCode,
    DatePicker,
    Modal,
    BasicPagination,
    BasicSearchBar
  },
  data() {
    return {
      post: {
        title: "",
        contsDesc: "",
        ctgry: "",
        prvDeskId: "",
        keywrd: "",
        url: "",
        regDate: "",
        customDate: ""
      },
      file: [],
      uploadedImage: "",
      isShowAgencyModal: false,
      isShowDataSetModal: false,
      dataSetList: [],
      selectedIdList: [],
      selectedDataList: [],
      viewSelectedDataList: [],
      dataSetSrchKeyword: "",
      dataSetPaginationKey: "visualAnalsDataSetPaging",
      rowsPerPage: 5,
      dataSetTotCnt: 0,
      agencySrchKeyword: "",
      agencyPaginationKey: "visualAnalsAgencyPaging",
      agencyTotCnt: 0,
      agencyList: [],
      selectedAgency: {},
      pagingObject: {}
    };
  },
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"]),
    ...mapGetters("module/pagination", ["paging"]),
    query() {
      return {
        keyword: this.$route.query.keyword,
        page: this.$route.query.page,
        tab: this.$route.query.tab
      };
    },
    descLength() {
      return this.post.contsDesc ? this.post.contsDesc.length : 0;
    },
    dataSetCurPage() {
      return this.paging.visualAnalsDataSetPaging.page;
    },
    agencyCurPage() {
      return this.paging.visualAnalsAgencyPaging.page;
    }
  },
  methods: {
    ...mapActions("module/pagination", [
      "setPage",
      "setTotalCount",
      "setNewPagination"
    ]),
    changedInput(data) {
      this.post[data.label] = data.input;
    },
    changedTextarea(data) {
      this.post[data.label] = data.input;
    },
    changedCtgry(value) {
      this.post.ctgry = value;
    },
    changedDate(value) {
      this.post.customDate = value;
    },
    changeFile(e) {
      // console.log(e.target.files)
      this.file = e.target.files;
      if (e.target.files && e.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.uploadedImage = e.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    },
    deleteFile(e) {
      this.$refs.thumbImg.value = "";
      this.file = [];
      this.uploadedImage = "";
    },
    openModal(type) {
      if (type === "A") {
        this.isShowAgencyModal = true;
        this.agencySrchKeyword = "";
        this.getAgencyResult(this.agencySrchKeyword, true);
      } else if (type === "D") {
        this.isShowDataSetModal = true;
        this.dataSetSrchKeyword = "";
        this.getDataSetResult(this.dataSetSrchKeyword, true);
      }
    },
    cancelModal(type) {
      if (type === "A") {
        this.isShowAgencyModal = false;
      } else if (type === "D") {
        this.isShowDataSetModal = false;
      }
    },
    confirmModal(type) {
      if (type === "A") {
        this.isShowAgencyModal = false;
      } else if (type === "D") {
        this.viewSelectedDataList = _.cloneDeep(this.selectedDataList);
        this.isShowDataSetModal = false;
      }
    },
    deleteDataSet(index) {
      this.viewSelectedDataList.splice(index, 1);
      this.selectedIdList.splice(index, 1);
      this.selectedDataList.splice(index, 1);
    },
    rowClicked(data) {
      let index = this.selectedDataList.findIndex((obj) => {
        return data === obj;
      });
      if (index === -1) {
        if (this.selectedDataList.length === 0) {
          this.selectedIdList.push(data.biz_dataset_id);
          this.selectedDataList.push(data);
        } else {
          this.selectedIdList.splice(0, 0, data.biz_dataset_id);
          this.selectedDataList.splice(0, 0, data);
        }
      } else {
        this.selectedIdList.splice(index, 1);
        this.selectedDataList.splice(index, 1);
      }
    },
    goDataSetPage() {
      this.getDataSetResult(this.dataSetSrchKeyword, false);
    },
    goDataSetSearch(keyword) {
      this.dataSetSrchKeyword = keyword;
      this.getDataSetResult(this.dataSetSrchKeyword, true);
    },
    getDataSetResult(keyword, reset) {
      if (reset) {
        this.setPage({
          key: this.dataSetPaginationKey,
          page: 1
        });
      }
      this.getDataSetList();
    },
    async getDataSetList() {
      const res = await this.$axios.get(
        `${this.$config.ROUTE_API_META_PREFIX}/getBizMetaList?perPage=${this.rowsPerPage}&curPage=${this.dataSetCurPage}&keyword1=${this.dataSetSrchKeyword}`
      );
      // console.log(res)
      this.dataSetList = res.searchList;
      this.dataSetTotCnt = res.totalcount;
      this.setTotalCount({
        key: this.dataSetPaginationKey,
        totalCount: this.dataSetTotCnt
      });
    },
    agencyRowClicked(data) {
      this.selectedAgency = data;
    },
    goAgencyPage() {
      this.getAgencyResult(this.agencySrchKeyword, false);
    },
    goAgencySearch(keyword) {
      this.agencySrchKeyword = keyword;
      this.getAgencyResult(this.agencySrchKeyword, true);
    },
    getAgencyResult(keyword, reset) {
      if (reset) {
        this.setPage({
          key: this.agencyPaginationKey,
          page: 1
        });
      }
      this.getAgencyList();
    },
    async getAgencyList() {
      const res = await this.$axios.get(
        `/route/api/sitemng/getCodeList?gropId=AGENCY_TYPE&perPage=${this.rowsPerPage}&curPage=${this.agencyCurPage}&keyword=${this.agencySrchKeyword}`
      );
      // console.log(res)
      this.agencyList = res.list;
      this.agencyTotCnt = res.totalcount;
      this.setTotalCount({
        key: this.agencyPaginationKey,
        totalCount: this.agencyTotCnt
      });
    },
    checkValidate() {
      if (!this.post.title) {
        alert("제목을 입력하십시오.");
        return false;
      }
      if (!this.post.contsDesc) {
        alert("설명을 입력하십시오.");
        return false;
      }
      if (this.post.contsDesc.length > 4000) {
        alert("설명은 4000자 이내로 입력하십시오.");
        return false;
      }
      if (!this.post.ctgry) {
        alert("카테고리를 선택하십시오.");
        return false;
      }
      if (this.selectedDataList.length === 0) {
        alert("활용 데이터를 선택하십시오.");
        return false;
      }
      if (!this.post.keywrd) {
        alert("키워드를 입력하십시오.");
        return false;
      }
      if (!this.post.url) {
        alert("시각화 URL을 입력하십시오.");
        return false;
      }
      return true;
    },
    cancel() {
      if (confirm("입력한 정보가 저장되지 않습니다.\n취소 하시겠습니까?")) {
        this.$router.push({
          path: "/portal/ui/analysis/utilize/visual-anals",
          query: this.query
        });
      }
    },
    async save() {
      if (!this.checkValidate()) return false;
      if (
        !confirm(
          "작성하신 내용을 등록하시겠습니까?\n관리자 승인 후 데이터 시각분석 사례로 제공됩니다."
        )
      )
        return false;

      let data = new FormData();
      let param = {
        ...this.post,
        prvDeskId: this.selectedAgency.code_id,
        dataSetIdList: this.selectedIdList
      };
      data.append(
        "post",
        new Blob([JSON.stringify(param)], { type: "application/json" })
      );
      if (this.file.length > 0) {
        data.append("file", this.file[0]);
      }
      let res = await this.$axios.post(
        `${this.$config.ROUTE_API_ANALYSIS_PREFIX}/visualAnals/save`,
        data
      );
      //console.log(res)
      if (res.message === "success") {
        this.$router.push({
          path: "/portal/ui/analysis/utilize/visual-anals",
          query: this.query
        });
      }
    }
  },
  mounted() {},
  beforeMount() {
    this.pagingObject = {
      [this.CONSTANTS.PAGING.ITEMS_PER_PAGE]: this.rowsPerPage,
      [this.CONSTANTS.PAGING.VISIBLE_PAGES]: 10,
      [this.CONSTANTS.PAGING.PAGE]: 1
    };
    this.setNewPagination({
      key: this.dataSetPaginationKey,
      data: this.pagingObject
    });
    this.setNewPagination({
      key: this.agencyPaginationKey,
      data: this.pagingObject
    });
  }
};
</script>

<style scoped></style>
