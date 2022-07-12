<template>
  <div>
    <h1>공지사항</h1>
    <div>공지사항을 정리해서 제공합니다.</div>
    <BasicTabMenu
      :menu-list="tabMenuList"
      @tabMenuClick="tabMenuClick"
    >
    </BasicTabMenu>
    <BasicSearchBar
      @search="searchClick"
      :searchKeyword="param.searchKeyword"
    >
    </BasicSearchBar>
    <NameTagList
      :nameTagList="noticeResMap.noticeList"
      width="wide"
      @nameTagClick="nameTagClick"
    ></NameTagList>

    <basic-pagination
      :paging-key= "paginationKey"
      :paging-object="{
        [CONSTANTS.PAGING.ITEMS_PER_PAGE]: param.rowsPerPage,
        [CONSTANTS.PAGING.PAGE]: param.page,
      }"
      @pagingEvent="goPage"
    >
    </basic-pagination>
  </div>
</template>

<script>
import BasicTabMenu from "@common/atoms/basic-tab-menu";
import NameTagList from "@common/atoms/name-tag-list";
import { mapActions,mapGetters} from "vuex";
import BasicSearchBar from "@common/atoms/basic-search-bar";
import BasicPagination from "@common/atoms/basic-pagination";
export default {
  name: "notice",
  components: {BasicPagination, BasicSearchBar, NameTagList, BasicTabMenu},
  async created() {
    await this.getResult()
  },
  data() {
    return {
      paginationKey : "noticePaging",
      param : {
        category:'',
        searchKeyword:'',
        page:1,
        rowsPerPage:3
      },
      tabMenuList: [
        { menuId: 1, menuName: "전체" },
        { menuId: 2, menuName: "공지" },
        { menuId: 3, menuName: "이벤트" },
        { menuId: 4, menuName: "시스템" },
        { menuId: 5, menuName: "안내" }
      ]
    }
  },
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"]),
    ...mapGetters("module/pagination", ["paging"]),
    ...mapGetters("board/notice/notice",["noticeResMap"])
  },
  methods: {
    ...mapActions("board/notice/notice",["getNoticeList"]),
    ...mapActions("module/pagination", ["setTotalCount","setPage"]),
    async getResult(){
      await this.getNoticeList(this.param)
      this.setTotalCount({
        key: this.paginationKey,
        totalCount: this.getNoticeList.totalCount
      })
      this.setPage({
        key: this.paginationKey,
        page: this.param.page
      })
    },
    async tabMenuClick(menuId) {
      switch (menuId){
        case 1 : this.reset(); break;
        case 2 : this.reset(); this.param.category="공지";  break;
        case 3 : this.reset(); this.param.category="이벤트";  break;
        case 4 : this.reset(); this.param.category="시스템";  break;
        case 5 : this.reset(); this.param.category="안내";  break;
      }
      await this.getResult()
    },
    reset(){
      this.param.category='';
      this.param.page = 1
      this.param.searchKeyword=''
    },
    async searchClick(inputData){
      this.param.searchKeyword = inputData.trim();
      await this.getResult()
    },
    nameTagClick(id) {
      this.$router.push(`${this.$route.path}/detail?id=${id}`)
    },
    async goPage(){
      this.param.page = this.paging[this.paginationKey].page
      await this.getResult()
    },
  },
}
</script>

<style scoped>

</style>
