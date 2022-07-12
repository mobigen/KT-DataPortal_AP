<template>
  <div>
    <h1>문의사항</h1>
    <div class="flex-box space-between">
      <div class="flex-box">
        <date-picker @change="changeStartRegDate" :date="startRegDate"/>
        <date-picker @change="changeEndRegDate"/>
      </div>
      <basic-search-bar @search="searchClick" :searchKeyword="params.searchKeyword"/>
    </div>
    <div class="flex-box space-between">
      <div>전체 {{qnaListRes.totalCount}}건</div>
      <base-select :selectList="selectAnsYnList" labelName='ansYn' @changeData="changeData" :selected-key="selectedKey"/>
    </div>
    <basic-table :headerList="tableHeaderList" :data-list="qnaList" @columnAction="rowClick"/>
    <basic-pagination
      :paging-key= "paginationKey" @pagingEvent="goPage"
      :paging-object="{
        [CONSTANTS.PAGING.ITEMS_PER_PAGE]: params.rowsPerPage,
        [CONSTANTS.PAGING.PAGE]: params.page,
      }"/>

  </div>
</template>

<script>
import _ from "lodash"
import BasicTable from "@component/aiPlatform/basic/basic-table";
import datePicker from "@component/common/functional/datepicker/date-picker";
import BasicSearchBar from "@component/aiPlatform/basic/basic-search-bar";
import {mapActions, mapGetters} from "vuex";
import BasicPagination from "@component/aiPlatform/basic/basic-pagination";
import BaseSelect from "@component/common/atoms/base-select/base-select";
export default {
  name: "index",
  components: {BaseSelect, BasicPagination, BasicSearchBar, datePicker,BasicTable},
  async asyncData({store,redirect}){
    // url로 이동시 로그인 여부 체크
    const userInfo = store.getters["users/user/getUserInfo"]
    if(!userInfo.authenticated){
      if(typeof history == "undefined"){redirect(`/`)} else{history.back()}
      if(process.client){alert("로그인후 이용가능합니다.")}
    }
    return {userInfo}
  },
  async mounted(){
    this.selectedKey='ALL'
    await this.getResult()
  },
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"]),
    ...mapGetters("module/pagination", ["paging"]),
    ...mapGetters("board/qna/qna",["qnaListRes"]),
    startRegDate(){
      let today = new Date();
      let year = today.getFullYear()
      let month = today.getMonth()
      let date = today.getDate()
      let diff =3
      if(month<diff){year -=1; month +=(12-diff);} else{month -=diff;}
      if(date>=30){date = new Date(year,month+1,0).getDate();}
      month = month+1<10 ? `0${month+1}`:`${month+1}`
      date = date<10 ? `0${date}`:`${date}`
      return `${year}${month}${date}`
    },
  },
  data() {
    return {
      selectedKey:"",
      selectAnsYnList:[
        {text:'전체',key:'ALL'},
        {text:'대기중',key:'N'},
        {text:'답변완료',key:'Y'},
      ],
      paginationKey:"myArticleQnaPaging",
      userInfo:{},
      qnaList:[],
      tableHeaderList: [
        {column_name : "번호"},
        {column_name : "문의유형"},
        {column_name : "제목"},
        {column_name : "등록일"},
        {column_name : "상태"}
      ],
      params:{
        userId: "",
        page:1,
        rowsPerPage:3,
        startRegDate: "",
        endRegDate: "",
        searchKeyword: "",
        ansYn: ""
      }
    }
  },
  methods: {
    ...mapActions("board/qna/qna",["getQnaListRes"]),
    ...mapActions("module/pagination", ["setPage","setTotalCount"]),
    changeStartRegDate(e) {this.params.startRegDate=e;},
    changeEndRegDate(e) {this.params.endRegDate=e;},
    rowClick(key,qna){
      this.$router.push(`/portal/ui/board/information/qna/detail?id=${qna.id}`);
    },
    async getResult(){
      this.params.userId = this.userInfo.userId
      console.log(this.params)
      await this.getQnaListRes(this.params)
      this.qnaList = _.cloneDeep(this.qnaListRes.qnaList)
      let i=1
      this.qnaList.map((qna)=>{
        qna.번호 = (this.params.page-1)*this.params.rowsPerPage +i;
        qna.rowKey = qna.번호;
        qna.문의유형=qna.category;
        qna.제목=qna.title;
        qna.등록일=qna.regDateStr;
        qna.상태=qna.ansContents == null ? '대기중': '답변완료';
        i++
      })
      this.setTotalCount({
        key: this.paginationKey,
        totalCount: this.qnaListRes.totalCount
      })
      this.setPage({
        key: this.paginationKey,
        page: this.params.page
      })
    },
    async searchClick(inputData){
      this.params.page = 1
      this.params.searchKeyword = inputData.trim();
      await this.getResult()
    },
    async goPage(){
      this.params.page = this.paging[this.paginationKey].page
      await this.getResult()
    },
    changeData({input}){
      this.selectedKey=input
      this.params.ansYn=input
    },
  },

}
</script>

<style scoped>
.flex-box{display: flex;}
.space-between{justify-content: space-between}
</style>
