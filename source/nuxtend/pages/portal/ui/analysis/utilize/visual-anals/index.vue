<template>
  <div>
    <h1>데이터 시각분석</h1>
    <p>데이터를 활용한 다양한 시각분석 활용 사례를 제공합니다.</p>
    <group-tab-menu
      :tab-list="ctgryList"
      name-key="code_nm"
      code-key="code_id"
      :active-tab="tab"
      @tabClick="changeTab"
    ></group-tab-menu>
    <hr>

    전체 {{ totCnt }}건
    <basic-search-bar
      :searchKeyword="srchKwd"
      @search="goSearch"
    ></basic-search-bar>
    <basic-button @click="register">
      <slot>
        <span>시각분석등록</span>
      </slot>
    </basic-button>

    <hr>

    <div>
      <ul>
        <li
          v-for="(item, i) in list"
          :key="'visual_'+i"
          :style="{border:'1px solid', display: 'inline-block'}"
          @click="rowClicked(item.contsId)"
        >
          <span>
            <img :src="'data:image/'+item.extn+';base64,'+item.fileData" />
          </span>
          <span>{{ getCategoryName(item.ctgry) }}</span><br>
          <span>{{ item.title }}</span><br>
          <!--          <span>{{ item.retvCnt }}</span><br>-->
          <span>{{ item.regDate }}</span>
        </li>
      </ul>
    </div>

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
import BasicSearchBar from "@common/atoms/basic-search-bar"
import BasicPagination from "@common/atoms/basic-pagination"
import BasicButton from "@common/atoms/basic-button"
import GroupTabMenu from "@component/common/molecules/group-tab-menu/group-tab-menu"
import {mapActions, mapGetters} from "vuex"

export default {
  name: "analysis-visual-anals",
  components: { BasicPagination, BasicSearchBar, BasicButton, GroupTabMenu },
  data() {
    return {
      ctgryList: [],
      srchKwd: "",
      tab: "ALL",
      totCnt: 0,
      list: [
        {
          contsId: "",
          title: "",
          ctgry: "",
          retvCnt: 0,
          regDate: "",
          fileData: "",
          extn: ""
        }
      ],
      paginationKey: "visualAnalsPaging",
      rowsPerPage: 8
    }
  },
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"]),
    ...mapGetters("module/pagination", ["paging"]),
    startRow() {
      return this.rowsPerPage * (this.currentPage - 1)
    },
    currentPage() {
      return this.paging.visualAnalsPaging.page
    },
    query() {
      return this.srchKwd ?
        { keyword: this.srchKwd, page: this.currentPage, tab: this.tab } : { page: this.currentPage, tab: this.tab }
    }
  },
  methods: {
    ...mapActions("module/pagination", ["setPage", "setTotalCount"]),
    changeTab(obj) {
      let selected = obj.tabObj
      this.tab = selected.code_id
      this.getResult(this.srchKwd, true)
    },
    async getCategoryList() {
      const res = await this.$axios.get(`/route/api/sitemng/getCodeInfo?groupId=VISUAL_ANALS_CTGRY`)
      this.ctgryList = res
      this.ctgryList.splice(0, 0, { code_id: "ALL", code_nm: "전체"})
    },
    getCategoryName(codeId) {
      let ctgry = this.ctgryList.find((obj) => obj.code_id === codeId)
      return ctgry ? ctgry.code_nm : ""
    },
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
    register() {
      this.$router.push({ append: true, path: "register" })
    },
    async getList() {
      let res = await this.$axios.get(`${this.$config.ROUTE_API_ANALYSIS_PREFIX}/visualAnals/getList?searchKeyword=${this.srchKwd}&startRow=${this.startRow}&rowsPerPage=${this.rowsPerPage}&tab=${this.tab}`)
      this.list = res.list
      this.totCnt = res.totCnt
      this.setTotalCount({
        key: this.paginationKey,
        totalCount: this.totCnt
      })
    },
    rowClicked(id) {
      this.$router.push({ path: this.$route.path + `/detail/${id}`, query: this.query})
    }
  },
  beforeMount() {
    this.srchKwd = this.$route.query.keyword || ""
    this.tab = this.$route.query.tab || "ALL"
    this.getCategoryList()
  },
  mounted() {
    let page = Number(this.$route.query.page)
    if(page) {
      this.setPage({
        key:this.paginationKey,
        page: page
      })
    }
    this.getList()
  }
}
</script>

<style scoped>

</style>
