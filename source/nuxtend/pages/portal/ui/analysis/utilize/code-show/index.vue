<template>
  <div>
    <h1>코드 뽐내기</h1>
    <p>데이터 분석 시 자주 활용될 수 있는 분석 코드를 제공합니다.</p>
    전체 {{ codeShowRes.totCnt }} 건
    <basic-search-bar
      :searchKeyword="param.searchKeyword"
      @search="searchClick"
    ></basic-search-bar>
    <hr />
    <basic-table
      :headerList="tableHeaderList"
      :dataList="codeShowRes.codeShowList"
      rowKey="codeId"
      :useSerialNum="false"
      serialNumText="번호"
      :tableButtonUse="false"
      @columnAction="rowClick"
    ></basic-table>
    <br>
    <basic-button @click="createCodeShow">
      등록
    </basic-button>
    <br>
    <basic-pagination
      :paging-key="paginationKey"
      :paging-object="{
        [CONSTANTS.PAGING.ITEMS_PER_PAGE]: param.rowsPerPage,
        [CONSTANTS.PAGING.PAGE]: param.page
      }"
      @pagingEvent="goPage"
      :needSetPaging="false"
      :show-test-table="false"
    ></basic-pagination>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import BasicSearchBar from "@common/atoms/basic-search-bar";
import BasicTable from "@common/atoms/basic-table";
import BasicPagination from "@common/atoms/basic-pagination";
import BasicButton from "@common/atoms/basic-button";


export default {
  name: "codeShow",
  components: {BasicButton, BasicPagination, BasicTable, BasicSearchBar},
  data() {
    return {
      paginationKey:'codeShowPaging',
      param:{
        searchKeyword:'',
        page:1,
        rowsPerPage:10
      },
      tableHeaderList: [
        {column_name : "no"},
        {column_name : "codeNm"},
        {column_name : "codeRegDate"},
        {column_name : "searchCnt"}
      ],
    }
  },
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"]),
    ...mapGetters("module/pagination", ["paging"]),
    ...mapGetters("analysis/codeShow/codeShow", ["codeShowRes"]),
    ...mapGetters("users/user",["getUserInfo"]),
    query() {
      return this.param.searchKeyword ?
        { keyword: this.param.searchKeyword, page: this.currentPage } : { page: this.currentPage }
    },
  },
  mounted() {
    let page = Number(this.$route.query.page)

    if(page){
      this.setPage({
        key: this.paginationKey,
        page: page
      })
      this.param.page = page
      this.param.searchKeyword = this.$route.query.keyword || ''
    }
    this.getData();
  },
  methods:{
    ...mapActions("analysis/codeShow/codeShow", ["getCodeShowList"]),
    ...mapActions("module/pagination", ["setTotalCount","setPage"]),
    getData(){
      this.getCodeShowList(this.param);
      this.setTotalCount({
        key: this.paginationKey,
        totalCount: this.codeShowRes.totCnt
      })
      this.setPage({
        key: this.paginationKey,
        page: this.param.page
      })
      this.$router.push({path:this.$route.path, query: this.query})
    },
    searchClick(inputData) {
      this.param.searchKeyword = inputData.trim();
      this.getData();
    },
    rowClick(id){
      const params={
        codeId:id
      }
      this.$axios(`${this.$config.API_ANALYSIS_PREFIX}/codeShow/updateCnt`, {params})
        .then(response => {
          // console.log('cnt: ', response)
        })
        .catch(error =>{})
      this.$router.push({path: `/portal/ui/analysis/utilize/code-show/detail/${id}`, query: this.query})
    },
    goPage(){
      this.param.page = this.paging[this.paginationKey].page
      // this.$router.push({path: this.$route.path, query: this.query})
      this.getData()
    },
    createCodeShow(){
      if(this.getUserInfo.authenticated){
        this.$router.push(`${this.$route.path}/create`)
      }
      else{
        alert("로그인후 이용가능합니다.")
      }
    }
  }
}
</script>

<style scoped>

</style>
