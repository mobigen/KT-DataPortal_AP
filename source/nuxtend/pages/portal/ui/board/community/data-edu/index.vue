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
          [CONSTANTS.PAGING.ITEMS_PER_PAGE]: 5,
          [CONSTANTS.PAGING.VISIBLE_PAGES]: 3,
          [CONSTANTS.PAGING.PAGE]: 1,
          totalPage: 1
        }"
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
  created() {
    this.getDataEduList(this.param);
  },
  data(){
    return{
      paginationKey: 'eduPaging',
      param: {
        eduType:'',
        searchKeyword:'',
        page:1,
        itemPerPage:3
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
  },
  methods: {
    ...mapActions("board/dataEdu/dataEdu", ["getDataEduList"]),
    ...mapActions("module/pagination", ["setTotalCount","setPage"]),
    async getResult(){
      await this.getDataEduList(this.param);
      this.setTotalCount({
        key:this.paginationKey,
        totalCount: this.dataEduList.totCnt
      })

    },
    async tabMenuClick(menuId){
      // console.log(menuId);
      this.param.eduType=menuId;
      this.param.searchKeyword='';
      await this.getResult();
    },
    async searchClick(inputData){
      this.param.searchKeyword = inputData.trim();
      await this.getResult();

    },
    dataOfInterest(id) {
      alert("관심데이터/ 게시물ID: " + id);
    },
    dataSharing(id) {
      alert("데이터 공유하기/ 게시물ID: " + id);
    },
    nameTagClick(id) {
      // const dataList = this.searchResultList.find((el) => {
      //   return el.id === id;
      // });
      //
      // // dataLocationKey, path 정해지면 변경
      // if (dataList.dataLocation === "내부") {
      //   this.$router.push({
      //     path: "/portal/ui/meta/search/fullSearch/detail",
      //     query: { postId: id }
      //   });
      // } else {
      //   window.open("/app/search/fullSearch", "_blank");
      // }
    }
  }
}
</script>

<style scoped>

</style>
