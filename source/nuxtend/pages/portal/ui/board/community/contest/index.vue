<!--경진대회-->
<template>
  <div>
    <h1>경진대회</h1>
    <p>데이터를 활용한 새로운 아이디어 및 서비스 개발 경진대회 도전을 응원합니다.</p>
    전체 {{ totCnt }}건
    <basic-search-bar
      :searchKeyword="searchKeyword"
      @search="goSearch"
    ></basic-search-bar>
    <hr />

    <basic-table
      :headerList="tableHeaderList"
      :dataList="list"
      rowKey="conteId"
      :useSerialNum="true"
      serialNumText="번호"
      :tableButtonUse="false"
      @columnAction="rowClick"
    ></basic-table>

    <basic-pagination
      :paging-key="paginationKey"
      :paging-object="{
        [CONSTANTS.PAGING.ITEMS_PER_PAGE]: rowsPerPage,
        [CONSTANTS.PAGING.VISIBLE_PAGES]: 10,
        [CONSTANTS.PAGING.PAGE]: 1
      }"
      @pagingEvent="goPage"
      :needSetPaging="false"
      :show-test-table="false"
    ></basic-pagination>
  </div>
</template>

<script>
import BasicTable from "@component/aiPlatform/basic/basic-table";
import BasicSearchBar from "@component/aiPlatform/basic/basic-search-bar";
import BasicPagination from "@component/aiPlatform/basic/basic-pagination";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "contest-list",
  components: {BasicTable, BasicSearchBar, BasicPagination},
  data() {
    return {
      paginationKey: 'contestPaging',
      searchKeyword: '',
      totCnt: 0,
      rowsPerPage: 10,
      list: [],
      tableHeaderList: [
        //{column_name : 'conteId'},
        {column_name : 'conteTitle'},
        {column_name : 'apyDate'},
        // {column_name : 'apyStDate'},
        // {column_name : 'apyFnsDate'},
        {column_name : 'regDate'}
      ],
      //tableDataList: []
    }
  },
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"]),
    ...mapGetters("module/pagination", ["paging"]),
    startRow() {
      return this.rowsPerPage * (this.currentPage - 1)
    },
    currentPage() {
      return this.paging.contestPaging.page
    },
    query() {
      return this.searchKeyword ?
        { keyword: this.searchKeyword, page: this.currentPage } : { page: this.currentPage }
    }
  },
  beforeMount() {
    this.searchKeyword = this.$route.query.keyword || ''
  },
  mounted() {
    let page = Number(this.$route.query.page)
    if(page) {
      // 페이징 정보 갱신
      this.setPage({
        key:this.paginationKey,
        page: page
      })
    }
    this.getDataList()
  },
  methods: {
    ...mapActions("module/pagination", ["setPage", "setTotalCount"]),
    goPage() {
      this.getResult(this.searchKeyword, false)
    },
    goSearch(keyword) {
      this.searchKeyword = keyword
      this.getResult(this.searchKeyword, true)
    },
    getResult(keyword, reset) {
      if(reset) {
        this.setPage({
          key:this.paginationKey,
          page:1
        })
      }
      this.$router.push({path: this.$route.path, query: this.query})
    },
    async getDataList() {
      let res = await this.$axios.get(`${this.$config.API_BOARD_PREFIX}/contest/list?searchKeyword=${this.searchKeyword}&rowsPerPage=${this.rowsPerPage}
      &startRow=${this.startRow}&currentPage=${this.currentPage}`)
      //console.log(res)
      this.list = res.list
      this.totCnt = res.totCnt
      this.setTotalCount({
        key: this.paginationKey,
        totalCount: this.totCnt
      })
    },
    rowClick(key) {
      this.$router.push({path: `/portal/ui/board/community/contest/view/${key}`, query: this.query})
    }
  }
}
</script>

<style scoped>

</style>
