<!--경진대회-->
<template>
  <div>
    <h1>경진대회</h1>
    <p>데이터를 활용한 새로운 아이디어 및 서비스 개발 경진대회 도전을 응원합니다.</p>
    전체 {{ totCnt }}건
    <basic-search-bar
      :searchKeyword="srchKwd"
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
      @columnAction="rowClicked"
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
import BasicTable from "@common/atoms/basic-table"
import BasicSearchBar from "@common/atoms/basic-search-bar"
import BasicPagination from "@common/atoms/basic-pagination"
import {mapActions, mapGetters} from "vuex";

export default {
  name: "contest-list",
  data() {
    return {
      paginationKey: "contestPaging",
      srchKwd: "",
      totCnt: 0,
      rowsPerPage: 10,
      list: [],
      tableHeaderList: [
        {column_name : "conteTitle"},
        {column_name : "apyDate"},
        {column_name : "regDate"}
      ],
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
      return this.srchKwd ?
        { keyword: this.srchKwd, page: this.currentPage } : { page: this.currentPage }
    }
  },
  components: {BasicTable, BasicSearchBar, BasicPagination},
  methods: {
    ...mapActions("module/pagination", ["setPage", "setTotalCount"]),
    goPage() {
      this.getResult(this.srchKwd, false)
    },
    goSearch(keyword) {
      this.srchKwd = keyword
      this.getResult(this.srchKwd, true)
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
      let res = await this.$axios.get(`${this.$config.ROUTE_API_BOARD_PREFIX}/contest/list?searchKeyword=${this.srchKwd}&rowsPerPage=${this.rowsPerPage}&startRow=${this.startRow}&currentPage=${this.currentPage}`)
      //console.log(res)
      this.list = res.list
      this.totCnt = res.totCnt
      this.setTotalCount({
        key: this.paginationKey,
        totalCount: this.totCnt
      })
    },
    rowClicked(key, data) {
      if(data.dtlYn === "N") {
        window.open(data.conteUrl,"_blank")
      } else {
        this.$router.push({path: `/portal/ui/board/community/contest/detail/${key}`, query: this.query})
      }
    }
  },
  beforeMount() {
    this.srchKwd = this.$route.query.keyword || ""
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
  }
}
</script>

<style scoped>

</style>
