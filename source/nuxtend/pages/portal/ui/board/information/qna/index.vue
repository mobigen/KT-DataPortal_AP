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
      :searchKeyword="params.searchKeyword"
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
        [CONSTANTS.PAGING.ITEMS_PER_PAGE]: params.rowsPerPage,
        [CONSTANTS.PAGING.PAGE]: params.page,
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
import _ from 'lodash'
import BasicTabMenu from "@common/atoms/basic-tab-menu";
import NameTagList from "@common/atoms/name-tag-list";
import { mapActions,mapGetters} from "vuex";
import BasicSearchBar from "@common/atoms/basic-search-bar";
import BasicPagination from "@common/atoms/basic-pagination";
import BasicButton from "@common/atoms/basic-button";
export default {
  name: "qna",
  components: {BasicButton, BasicPagination, BasicSearchBar, NameTagList, BasicTabMenu},
  async created() {
    await this.getResult();
  },
  data() {
    return {
      paginationKey : "qnaPaging",
      params:{
        category:'',
        searchKeyword:'',
        page:1,
        rowsPerPage:3,
        tabMenuId:0
      },
      tabMenuList: [
        { menuId: 0, menuName: "전체" },
        { menuId: 1, menuName: "데이터" },
        { menuId: 2, menuName: "회원가입" },
        { menuId: 3, menuName: "기타"}
      ]
    }
  },
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"]),
    ...mapGetters("module/pagination", ["paging"]),
    ...mapGetters("board/qna/qna", ["qnaListRes","detailParams","hasDetailParams"]),
    ...mapGetters("users/user",["getUserInfo"])
  },
  methods: {
    ...mapActions("board/qna/qna", ["getQnaListRes","setDetailParams","setHasDetailParams"]),
    ...mapActions("module/pagination", ["setPage","setTotalCount"]),
    async getResult(){
      if(this.hasDetailParams && this.detailParams.category!=null){
        this.params = _.cloneDeep(this.detailParams)
        this.setHasDetailParams(false)
      }
      await this.getQnaListRes(this.params)
      if(process.client){
        let tabMenuElements = document.getElementsByClassName('tab-menu-wrap')[0].children[0].children
        for(let el of tabMenuElements){el.classList.remove('isActive')}
        tabMenuElements[this.params.tabMenuId].classList.add('isActive')
      }
      this.setTotalCount({
        key: this.paginationKey,
        totalCount: this.qnaListRes.totalCount
      })
      this.setPage({
        key: this.paginationKey,
        page: this.params.page
      })
    },
    async tabMenuClick(menuId) {
      switch (menuId){
        case 0 : this.reset(); this.params.tabMenuId=menuId; break;
        case 1 : this.reset(); this.params.tabMenuId=menuId; this.params.category="데이터";  break;
        case 2 : this.reset(); this.params.tabMenuId=menuId; this.params.category="회원가입";  break;
        case 3 : this.reset(); this.params.tabMenuId=menuId; this.params.category="기타";  break;
      }
      await this.getResult()
    },
    reset(){
      this.params.category=''
      this.params.page = 1
      this.params.searchKeyword=''
    },
    async searchClick(inputData){
      this.params.page = 1
      this.params.searchKeyword = inputData.trim();
      await this.getResult()
    },
    goDetail(id){
      this.setDetailParams(_.cloneDeep(this.params))
      this.$router.push(`${this.$route.path}/detail?id=${id}`);
    },
    nameTagClick(id) {
      const qna = this.qnaListRes.qnaList.filter((qna)=> qna.id == id)[0]
      // 비공개글인 경우
      if(qna.openYn === "N"){
        // 작성자 체크
        if(this.getUserInfo.userId == qna.regUser ){ this.goDetail(id); return;}
        // 작성자가 아닌경우
        const res = prompt("비공개 글입니다. 비밀번호를 입력해주세요")
        // 비밀번호가 맞을 경우
        if(res == qna.password){ this.goDetail(id); return;}
        // 비밀번호가 틀릴경우
        if(res != null && res != qna.password){ alert("비밀번호가 올바르지 않습니다."); return }
      }
      //공개글인 경우
      if(qna.openYn === "Y"){ this.goDetail(id); return;}
    },
    async goPage(){
      this.params.page = this.paging[this.paginationKey].page
      await this.getResult()
    },
    createQna(){
      if(this.getUserInfo.authenticated){
        this.$router.push(`${this.$route.path}/register`)
      }else{
        alert("로그인후 이용가능합니다.")
      }
    }
  },
}
</script>

<style scoped>

</style>
