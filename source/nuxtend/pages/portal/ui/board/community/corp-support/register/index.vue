<template>
  <div>

    <h1>기업지원</h1>
    <p>자동차분야의 중소,벤처기업의 효율적,체계적 성장지원을 위한 데이터 분석 및 컨설팅을 지원합니다.</p>
    <h2>신청자 정보</h2>
    <div>
      신청자 <span v-if="getUserInfo">{{ getUserInfo.username }}</span>
    </div>
    <h2>신청 내용</h2>
    <div>
      제목
      <input
        type="text"
        v-model="post.title"
        ref="title"
        maxlength="100"
        placeholder="신청 제목을 입력합니다."
      />
    </div>
    <div>
      신청 유형
      <basic-com-code
        type="select"
        code-id="CORP_SUPPORT_APY_DIV"
        @onChanged="onCodeChanged"
      ></basic-com-code>
    </div>
    <div>
      활용 데이터 <span>* 분석/ 컨설팅 신청시 활용 될 데이터가 있는 경우 선택</span>
      <basic-button @click="openModal">
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
    </div>
    <hr>

    <div>
      신청 내용
      <textarea
        v-model="post.sbst"
        ref="sbst"
        maxlength="4000"
        placeholder="신청데이터에 포함된 주용 내용을 기재합니다."
      ></textarea>
      {{ sbstLength }} / 4000 bytes
    </div>
    <div>
      활용 목적 및 기대효과
      <textarea
        v-model="post.usesPrps"
        ref="usesPrps"
        maxlength="4000"
        placeholder="데이터 활용 목적을 상세하게 기재해주시기 바랍니다."
      ></textarea>
      {{ usesPrpsLength }} / 4000 bytes
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
      :show-modal="isShowModal"
      @cancel="cancelModal"
      @confirm="confirmModal"
    >
      <template #header>
        데이터 검색
      </template>
      <template #body>
        <basic-search-bar
          :searchKeyword="dataSetSrchKeyword"
          @search="goDataSetSearch"
        ></basic-search-bar>
        <br>
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
            :key="'ds_'+i"
            @click="rowClicked(data)"
          >
            <td :style="{padding:'10px'}">
              <input
                type="checkbox"
                :id="data.biz_dataset_id"
                :value="data.biz_dataset_id"
                v-model="selectedIdList"
              />
            </td>
            <td :style="{padding:'10px'}">{{ data.biz_dataset_id }}</td>
            <td :style="{padding:'10px'}">{{ data.data_nm }}</td>
            <td :style="{padding:'10px'}">{{ data.data_shap }}</td>
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

  </div>
</template>

<script>
import BasicButton from "@common/atoms/basic-button"
import BasicTable from "@common/atoms/basic-table"
import BasicComCode from "@component/common/atoms/basic-code-view/basic-com-code"
import Modal from "@component/common/molecules/modal/modal"
import BasicPagination from "@common/atoms/basic-pagination"
import BasicSearchBar from "@common/atoms/basic-search-bar"
import _ from "lodash"
import {mapActions, mapGetters} from "vuex"

export default {
  name: "community-corp-support-register",
  components: {BasicButton,BasicTable,BasicComCode, Modal,BasicPagination,BasicSearchBar},
  data() {
    return {
      post: {
        title: "",
        apyDiv: "DATA",
        sbst: "",
        usesPrps: "",
        sttus: "",
        delYn: "",
        dataSetList: []
      },
      isShowModal: false,
      dataSetList: [],
      selectedIdList: [],
      selectedDataList: [],
      viewSelectedDataList: [],
      dataSetSrchKeyword: "",
      dataSetPaginationKey: "corpSupportDataSetPaging",
      rowsPerPage: 5,
      pagingObject: {},
      dataSetTotCnt: 0,
    }
  },
  computed: {
    ...mapGetters("users/user", ["getUserInfo"]),
    ...mapGetters("defaults/constants", ["CONSTANTS"]),
    ...mapGetters("module/pagination", ["paging"]),
    sbstLength() {
      return this.post.sbst ? this.post.sbst.length : 0
    },
    usesPrpsLength() {
      return this.post.usesPrps ? this.post.usesPrps.length : 0
    },
    dataSetCurPage() {
      return this.paging.corpSupportDataSetPaging.page
    },
  },
  methods: {
    ...mapActions("module/pagination", ["setPage", "setTotalCount", "setNewPagination"]),
    cancel() {
      this.$router.push("/portal/ui/board/community/corp-support")
    },
    onCodeChanged(data) {
      this.apyDiv = data
    },
    checkValidate() {
      if(!this.post.title) {
        alert("제목을 입력하십시오.")
        this.$refs.title.focus()
        return false
      }
      if(!this.post.apyDiv){
        alert("신청 유형을 선택하십시오.")
        return false
      }
      if(!this.post.sbst) {
        alert("신청 내용을 입력하십시오.")
        this.$refs.sbst.focus()
        return false
      }
      return true
    },
    rowClicked(data) {
      let index = this.selectedDataList.findIndex((obj) => {
        return data === obj
      })
      if (index === -1) {
        if(this.selectedDataList.length === 0) {
          this.selectedIdList.push(data.biz_dataset_id)
          this.selectedDataList.push(data)
        } else {
          this.selectedIdList.splice(0, 0, data.biz_dataset_id)
          this.selectedDataList.splice(0, 0, data)
        }
      } else {
        this.selectedIdList.splice(index, 1)
        this.selectedDataList.splice(index, 1)
      }
    },
    async save() {
      if(!this.checkValidate()) {
        return false
      }
      if(!confirm("작성하신 내용을 등록하시겠습니까?\n관리자 검토 후 신청결과는 마이페이지에서 확인 가능합니다.")) {
        return false
      }

      let param = {
        ...this.post,
        dataSetIdList: this.selectedIdList
      }

      let res = await this.$axios.post(`${this.$config.ROUTE_API_BOARD_PREFIX}/corpSupport/save`, param)
      if(res.message === "success") {
        this.$router.push('/portal/ui/board/community/corp-support')
      }
      // else alert("error")
    },
    openModal() {
      this.isShowModal = true
      this.dataSetSrchKeyword = ""
      this.getDataSetResult(this.dataSetSrchKeyword, true)
    },
    cancelModal() {
      this.isShowModal = false
    },
    confirmModal() {
      this.viewSelectedDataList = _.cloneDeep(this.selectedDataList)
      this.isShowModal = false
    },
    goDataSetPage() {
      this.getDataSetResult(this.dataSetSrchKeyword, false)
    },
    goDataSetSearch(keyword) {
      this.dataSetSrchKeyword = keyword
      this.getDataSetResult(this.dataSetSrchKeyword, true)
    },
    getDataSetResult(keyword, reset) {
      if(reset) {
        this.setPage({
          key:this.dataSetPaginationKey,
          page:1
        })
      }
      this.getDataSetList()
    },
    async getDataSetList() {
      const res = await this.$axios.get(`${this.$config.ROUTE_API_META_PREFIX}/getBizMetaList?perPage=${this.rowsPerPage}&curPage=${this.dataSetCurPage}&keyword1=${this.dataSetSrchKeyword}`)
      // console.log(res)
      this.dataSetList = res.searchList
      this.dataSetTotCnt = res.totalcount
      this.setTotalCount({
        key: this.dataSetPaginationKey,
        totalCount: this.dataSetTotCnt
      })
    },
    deleteDataSet(index){
      this.viewSelectedDataList.splice(index, 1)
      this.selectedIdList.splice(index, 1)
      this.selectedDataList.splice(index, 1)
    }
  },
  beforeMount() {
    this.pagingObject = {
      [this.CONSTANTS.PAGING.ITEMS_PER_PAGE]: this.rowsPerPage,
      [this.CONSTANTS.PAGING.VISIBLE_PAGES]: 10,
      [this.CONSTANTS.PAGING.PAGE]: 1
    }
    this.setNewPagination({
      key: this.dataSetPaginationKey,
      data: this.pagingObject
    })
  },
}
</script>

<style scoped>

</style>
