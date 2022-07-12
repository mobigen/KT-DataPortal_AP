<template>
  <div>
    <h1>FAQ</h1>
    <div>자주 묻는 질문내용을 정리해서 제공합니다.</div>
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
      :nameTagList="faqListRes.faqList"
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
  name: "faq",
  components: {BasicPagination, BasicSearchBar, NameTagList, BasicTabMenu},
  // async asyncData({store}) {
  //   console.log(store)
  //   let result={
  //     paginationKey : "faqPaging",
  //     param : {
  //       category:'',
  //       searchKeyword:'',
  //       page:1,
  //       rowsPerPage:3
  //     },
  //   }
  //   await store.dispatch("board/faq/faq/getFaqListRes",result.param)
  //   store.dispatch("module/pagination/setTotalCount",{
  //     key: result.paginationKey,
  //     totalCount: store.getters["board/faq/faq/faqListRes"].totalCount
  //   })
  //   return {result}
  // },
  async created() {
    await this.getResult()
  },
  data() {
    return {
      paginationKey : "faqPaging",
      param : {
        category:'',
        searchKeyword:'',
        page:1,
        rowsPerPage:3
      },
      tabMenuList: [
        { menuId: 1, menuName: "전체" },
        { menuId: 2, menuName: "데이터" },
        { menuId: 3, menuName: "회원가입" },
        { menuId: 4, menuName: "기타"}
      ]
    }
  },
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"]),
    ...mapGetters("module/pagination", ["paging"]),
    ...mapGetters("board/faq/faq",["faqListRes"])
  },
  methods: {
    ...mapActions("board/faq/faq",["getFaqListRes"]),
    ...mapActions("module/pagination", ["setTotalCount","setPage"]),
    async getResult(){
      await this.getFaqListRes(this.param)
      this.setTotalCount({
        key: this.paginationKey,
        totalCount: this.faqListRes.totalCount
      })
      this.setPage({
        key: this.paginationKey,
        page: this.param.page
      })
    },
    async tabMenuClick(menuId) {
      switch (menuId){
        case 1 : this.reset(); break;
        case 2 : this.reset(); this.param.category="데이터";  break;
        case 3 : this.reset(); this.param.category="회원가입";  break;
        case 4 : this.reset(); this.param.category="기타";  break;
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
      alert(id)
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
