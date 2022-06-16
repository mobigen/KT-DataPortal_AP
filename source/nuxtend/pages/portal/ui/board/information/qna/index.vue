<template>
  <div>
    <h1>문의하기</h1>
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
      :nameTagList="qnaListRes.qnaList"
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

    <basic-button
      @click="createQna"
    >문의하기</basic-button>

  </div>
</template>

<script>
import BasicTabMenu from "@component/aiPlatform/basic/basic-tab-menu";
import NameTagList from "@component/aiPlatform/basic/name-tag-list";
import { mapActions,mapGetters} from "vuex";
import BasicSearchBar from "@component/aiPlatform/basic/basic-search-bar";
import BasicPagination from "@component/aiPlatform/basic/basic-pagination";
import BasicButton from "@component/aiPlatform/basic/basic-button";
export default {
  name: "qna",
  components: {BasicButton, BasicPagination, BasicSearchBar, NameTagList, BasicTabMenu},
  async created() {
    await this.getResult();
  },
  data() {
    return {
      paginationKey : "qnaPaging",
      param:{
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
    ...mapGetters("board/qna/qna", ["qnaListRes"]),
    ...mapGetters("users/user",["getUserInfo"])
  },
  methods: {
    ...mapActions("board/qna/qna", ["getQnaListRes"]),
    ...mapActions("module/pagination", ["setPage","setTotalCount"]),
    async getResult(){
      await this.getQnaListRes(this.param)
      this.setTotalCount({
        key: this.paginationKey,
        totalCount: this.qnaListRes.totalCount
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
      this.param.category=''
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
    createQna(){
      if(this.getUserInfo.authenticated){
        this.$router.push(`${this.$route.path}/create`)
      }else{
        alert("로그인후 이용가능합니다.")
      }
    }
  },
}
</script>

<style scoped>

</style>
