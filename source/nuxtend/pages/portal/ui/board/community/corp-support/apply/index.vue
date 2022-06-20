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
        v-model="result.title"
        ref="title"
        maxlength="100"
        placeholder="신청 제목을 입력합니다."
      />
    </div>
    <div>
      신청 유형
<!--      <basic-com-code-->
<!--        type="select"-->
<!--        code-id="TEST_CODE"-->
<!--        @onChanged="onCodeChanged"-->
<!--      ></basic-com-code>-->
      <basic-com-code
        type="select"
        :data-list="apyDivList"
        @onChanged="onCodeChanged"
      ></basic-com-code>
    </div>
    <div>
      활용 데이터 <span>* 분석/ 컨설팅 신청시 활용 될 데이터가 있는 경우 선택</span>
      <p>
        {{ viewSelectedDataList.length > 1 ?
        (viewSelectedDataList[0].title + ' 외 ' + (viewSelectedDataList.length - 1) + '건')
        : viewSelectedDataList[0].title }}
      </p>
      <span
        v-if="selectedDataList.length > 0"
        v-for="(data, i) in viewSelectedDataList"
      >
        {{ data.title }}
        <button
          type="button"
          @click="deleteDataSet(i)"
        >X</button>
        <br>
      </span>
      <basic-button @click="searchDataSet">
        <slot>
          <span>검색</span>
        </slot>
      </basic-button>
    </div>
    <hr>
    <div
      v-if="viewSearchDataSet"
    >
      데이터셋 목록 (팝업 컴포넌트 개발 완료 후 이동)<br>
      총 {{ dataSetTotCnt }}건
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
                :id="data.dataSetId"
                :value="data.dataSetId"
                v-model="selectedIdList"
              />
            </td>
            <td :style="{padding:'10px'}">{{ data.dataSetDiv }}</td>
            <td :style="{padding:'10px'}">{{ data.title }}</td>
            <td :style="{padding:'10px'}">{{ data.dataDiv }}</td>
          </tr>
        </tbody>
      </table>
      <basic-button @click="cancelData">
        <slot>
          <span>취소</span>
        </slot>
      </basic-button>
      <basic-button @click="setData">
        <slot>
          <span>등록</span>
        </slot>
      </basic-button>
    </div>
    <hr>
    <div>
      신청 내용
      <textarea
        v-model="result.sbst"
        ref="sbst"
        maxlength="4000"
        placeholder="신청데이터에 포함된 주용 내용을 기재합니다."
      ></textarea>
      {{ sbstLength }} / 4000 bytes
    </div>
    <div>
      활용 목적 및 기대효과
      <textarea
        v-model="result.usesPrps"
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
    <basic-button @click="apply">
      <slot>
        <span>등록</span>
      </slot>
    </basic-button>

  </div>
</template>

<script>
import BasicButton from "@component/aiPlatform/basic/basic-button";
import BasicTable from "@component/aiPlatform/basic/basic-table/basic-table";
import BasicComCode from "@component/DPTeam/code/basic-com-code";
import {mapGetters} from "vuex";

export default {
  name: "community-corp-support-apply",
  components: {BasicButton,BasicTable,BasicComCode},
  data() {
    return {
      result: {
        title: '',
        apyDiv: 'DATA',
        sbst: '',
        usesPrps: '',
        sttus: '',
        delYn: '',
        dataSetList: []
      },
      apyDivList: [
        { codeNm: '데이터 분석', codeId: 'DATA'},
        { codeNm: '컨설팅 지원', codeId: 'CONSUL'},
        { codeNm: '기타', codeId: 'ETC'}
      ],
      viewSearchDataSet: false,
      searchKeyword: "",
      dataSetTotCnt: 0,
      dataSetList: [],
      selectedIdList: [],
      selectedDataList: [],
      viewSelectedDataList: [
        {
          dataSetId: '',
          title: ''
        }
      ]
    }
  },
  computed: {
    ...mapGetters("users/user", ["getUserInfo"]),
    sbstLength() {
      return this.result.sbst ? this.result.sbst.length : 0
    },
    usesPrpsLength() {
      return this.result.usesPrps ? this.result.usesPrps.length : 0
    }
  },
  methods: {
    cancel() {
      this.$router.push('/portal/ui/board/community/corp-support')
    },
    cancelData() {
      this.viewSearchDataSet = false
    },
    onCodeChanged(data) {
      console.log('compo test ======== 111')
      console.log(data)
    },
    setData() {
      this.viewSelectedDataList = this.selectedDataList
      this.viewSearchDataSet = false
    },
    searchDataSet() {
      this.viewSearchDataSet = true
      let param = {
        searchKeyworld: this.searchKeyword
      }
      this.$axios.post(`${this.$config.API_BOARD_PREFIX}/corpSupport/getTestDataSetList`, param)
        .then((res) => {
          this.dataSetTotCnt = res.totCnt
          this.dataSetList = res.list
        })
    },
    deleteDataSet(index){
      this.viewSelectedDataList.splice(index, 1)
      this.selectedIdList.splice(index, 1)
      this.selectedDataList.splice(index, 1)
      if(this.viewSelectedDataList.length === 0) {
        this.viewSelectedDataList = [{ dataSetId: '', title: ''}]
      }
    },
    checkValidate() {
      if(!this.result.title) {
        alert('제목을 입력하십시오.')
        this.$refs.title.focus()
        return false
      }
      if(!this.result.apyDiv){
        alert('신청 유형을 선택하십시오.')
        return false
      }
      if(!this.result.sbst) {
        alert('신청 내용을 입력하십시오.')
        this.$refs.sbst.focus()
        return false
      }
      return true
    },
    rowClicked(data) {
      let index = this.selectedDataList.findIndex((obj) => {
        return data === obj
      })
      if(index === -1) {
        this.selectedIdList.push(data.dataSetId)
        this.selectedDataList.push(data)
      } else {
        this.selectedIdList.splice(index, 1)
        this.selectedDataList.splice(index, 1)
      }
    },
    apply() {
      if(!this.checkValidate()) {
        return false
      }
      if(!confirm('작성하신 내용을 등록하시겠습니까?\n' +
        '관리자 검토 후 신청결과는 마이페이지에서 확인 가능합니다\n')) {
        return false
      }

      let param = {
        ...this.result,
        dataSetList: this.selectedDataList
      }
      this.$axios.post(`${this.$config.API_BOARD_PREFIX}/corpSupport/save`, param)
        .then((res) => {
          if(res.message === 'success') alert('성공적으로 신청되었습니다.')
          else alert('error')
        })
    }
  }
}
</script>

<style scoped>

</style>
