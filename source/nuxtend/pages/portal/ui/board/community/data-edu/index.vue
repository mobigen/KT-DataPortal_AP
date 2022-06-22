<!--데이터 교육-->
<template>
  <div>
    <h1>데이터 교육</h1>
    <div>자동차분야 데이터를 활용한 분석 교육을 제공합니다.</div>
    <BasicTabMenu
      :menu-list="tabMenuList"
      @tabMenuClick="tabMenuClick"
    ></BasicTabMenu>
    <basic-search-bar
    @search="searchClick"
    :searchKeyWord="param.searchKeyword">
    </basic-search-bar>
    <div v-for="(cdata, ci) in this.dataEduRes.dataCardInfo">
        <basic-name-tag
          :nameTagObject="cdata"
          @nameTagClick="nameTagClick"
          @dataOfInterest="dataOfInterest"
          @dataSharing="dataSharing"
          width="narrow"
        >
          <template v-slot:left-side><div></div></template>
          <template v-slot:right-side><div></div></template>
          <template v-slot:body-top>
            <div class="body-top">
              <div>
                <!-- data 가져오는 다른 방법 알아보기 -->
                <basic-single-tag
                  :tagName="cdata.category"
                  previousText=""
                ></basic-single-tag>
                <basic-single-tag
                  :tagName="cdata.dataLocation"
                  previousText=""
                ></basic-single-tag>
              </div>

              <div>
                <basic-icon>CSV</basic-icon>
                <basic-button
                  componentId=""
                  buttonCss="icon-button"
                  :underline="false"
                  :hoverColor="false"
                  @click="dataSharing(cdata.id)"
                >
                  <fa icon="share-nodes" />
                </basic-button>
                <basic-button
                  componentId=""
                  buttonCss="icon-button"
                  :underline="false"
                  :hoverColor="false"
                  @click="dataOfInterest(cdata.id)"
                  title="관심데이터 추가"
                >
                  <fa icon="bookmark" />
                </basic-button>
              </div>
            </div>
          </template>
          <template v-slot:body-bottom><div></div></template>
        </basic-name-tag>
    </div>


      <basic-pagination
        :paging-key="paginationKey"
        :paging-object="{
          [CONSTANTS.PAGING.ITEMS_PER_PAGE]: param.itemsPerPage,
          [CONSTANTS.PAGING.PAGE]: param.page,
        }"
        @pagingEvent="goPage"
      />

  </div>
</template>

<script>
import BasicTabMenu from "@component/aiPlatform/basic/basic-tab-menu";
import BasicSearchBar from "@component/aiPlatform/basic/basic-search-bar";
import BasicButton from "@component/aiPlatform/basic/basic-button.vue";
import BasicIcon from "@component/aiPlatform/basic/basic-icon.vue";
import BasicSingleTag from "@component/aiPlatform/basic/basic-single-tag.vue";
import BasicNameTag from "@component/aiPlatform/basic/basic-name-tag.vue";
import BasicPagination from "@component/aiPlatform/basic/basic-pagination";
import {mapActions, mapGetters} from "vuex";


export default {
  name: "dataEducation",
  components: {
    BasicTabMenu,
    BasicSearchBar,
    BasicButton,
    BasicIcon,
    BasicSingleTag,
    BasicNameTag,
    BasicPagination
  },
  beforeMount() {
    this.param.searchKeyword = this.$route.query.keyword || ''
  },
  mounted() {
    let page = Number(this.$route.query.page)

    if(page) {
      // 페이징 정보 갱신
      this.setPage({
        key:this.paginationKey,
        page: page
      })

      this.param.page = page
    }
    this.getData(this.param);
  },
  data(){
    return{
      paginationKey: 'eduPaging',
      param: {
        eduType:'',
        searchKeyword:'',
        page:1,
        itemsPerPage:3
      },
      tabMenuList: [
        {menuId:'', menuName:"전체", numberOfPosts: 123},
        {menuId:1, menuName:"교육 동영상"},
        {menuId:2, menuName:"튜토리얼"},
        {menuId:3, menuName:"데이터 리포트"}
      ],
    }
  },
  computed:{
    ...mapGetters("defaults/constants", ["CONSTANTS"]),
    ...mapGetters("module/pagination", ["paging"]),
    ...mapGetters("board/dataEdu/dataEdu", ["dataEduRes"]),
    currentPage() {
      return this.paging.eduPaging.page
    },
    query() {
      return this.param.searchKeyword ?
        { keyword: this.param.searchKeyword, page: this.currentPage } : { page: this.currentPage }
    },
  },
  methods: {
    ...mapActions("board/dataEdu/dataEdu", ["getDataEduList"]),
    ...mapActions("module/pagination", ["setTotalCount","setPage"]),
    async getData(){
      await this.getDataEduList(this.param);
      this.setTotalCount({
        key:this.paginationKey,
        totalCount: this.dataEduRes.totCnt
      })
      this.setPage({
        key: this.paginationKey,
        page: this.param.page
      })
      this.$router.push({path: this.$route.path, query: this.query})
    },
    async tabMenuClick(menuId){
      // console.log(menuId);
      this.param.page = 1;
      this.param.eduType=menuId;
      this.param.searchKeyword='';
      await this.getData();
    },
    async searchClick(inputData){
      this.param.searchKeyword = inputData.trim();
      await this.getData();
    },
    dataOfInterest(id) {
      alert("관심데이터/ 게시물ID: " + id);
    },
    dataSharing(id) {
      alert("데이터 공유하기/ 게시물ID: " + id);
    },
    nameTagClick(id) {
      // alert(id)
      let params = {eduId: id}
      console.log('파람파람파람:', params)
      this.$axios(`${this.$config.API_BOARD_PREFIX}/dataEdu/updateCnt`, {params})
        .then(response => {})
        .catch(error =>{})
      this.$router.push({path: `/portal/ui/board/community/data-edu/detail/${id}`, query: this.query})
    },
    async goPage(){
      this.param.page = this.paging[this.paginationKey].page
      await this.getData()
    }
  }
}
</script>

<style scoped>

</style>
