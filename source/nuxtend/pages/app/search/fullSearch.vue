<template lang="html">
  <div>
    <h5>데이터 통합검색</h5>
    <!-- top-->
    <div class="search-box">
      <h3>검색바 component</h3>
      <basic-search-bar @search="searchClick" :searchKeyword="searchKeyword" />

      <h3>추천검색어 component</h3>
      <recommend-search-tag
        tagLabel="추천검색어"
        :tagList="tagList"
        :hashTagUse="true"
        :cancelButtonUse="false"
        :cursorPointer="true"
        @tagClick="tagClick"
      ></recommend-search-tag>

      <h3>결과 component</h3>
      <search-result-box :searchResultSuccess="searchResultSuccess">
        <template v-slot:resultSuccessTrueText>
          <span>"{{ searchKeyword }}"</span> 검색결과, 총 데이터
          <span>{{ numberOfData }}</span> 입니다.
        </template>
        <template v-slot:resultSuccessFalseText>
          <span>검색 결과가 없습니다.</span>
        </template>
      </search-result-box>
    </div>

    <h3>필터 component</h3>
    <select-filter-list
      :filterData="filterData"
      :hasTagUse="false"
      :hashTagUse="false"
      :cancelButtonUse="true"
      :cursorPointer="false"
      @filterClick=""
      @selectFilterReset="selectFilterReset"
    ></select-filter-list>

    <!-- bottom-->

    <h3>tab component</h3>
    <basic-tab-menu
      :menuList="menuList"
      @currentTabData="currentTabData"
    ></basic-tab-menu>

    <!-- bottom-left-->
    <h3>검색바 component (radio가 포함된)</h3>
    <radio-button-search-bar
      :radioButtonList="RadioList"
      labelName="radioSelectSearch"
      :defaultValue="0"
      @searchClick="radioSelectSearch"
    ></radio-button-search-bar>

    <div>필터 - 체크 1단 component</div>
    <div>필터 - 체크 2단 component</div>
    <div>필터 - tree component</div>

    <!-- bottom-right-->
    <div>
      검색결과 요약 component (전체 몇건, sort options.. 개발 우선순위 밀림)
    </div>
    <div>검색결과 panel component</div>

    <div>
      <h5>paging component</h5>
      <basic-pagination>

      </basic-pagination>
    </div>
  </div>
</template>

<script type="text/javascript">
import BasicSearchBar from "@/components/aiPlatform/basic/basic-search-bar.vue";
import RecommendSearchTag from "@/components/aiPlatform/basic/recommend-search-tag.vue";
import SearchResultBox from "@/components/aiPlatform/basic/search-result-box.vue";
import BasicTabMenu from "@/components/aiPlatform/basic/basic-tab-menu.vue";
import SelectFilterList from "@/components/aiPlatform/basic/select-filter-list.vue";
import RadioButtonSearchBar from "@/components/aiPlatform/group/radio-button-search-bar.vue";
import BasicPagination from "@/components/aiPlatform/basic-pagination";

export default {
  name: "app-search-full",
  extends: {},
  props: {},
  data() {
    return {
      tagList: ["test01", "test02", "test03", "test04", "test05"],
      searchKeyword: "",
      numberOfData: null,
      searchResultSuccess: false,
      menuList: [
        { menuName: "전체", data: {}, numberOfPosts: 126 },
        { menuName: "내부데이터", data: {}, numberOfPosts: 777 },
        { menuName: "CKAN", data: {}, numberOfPosts: 99 },
        { menuName: "분원데이터", data: {}, numberOfPosts: 456 }
      ],
      filterData: [
        {
          label: "카테고리",
          selectFilterList: ["자동차부품", "자동차제조", "화물운송"]
        },
        {
          label: "제공기관",
          selectFilterList: ["국토교통부", "국토교통부", "국토교통부"]
        },
        { label: "데이터 타입", selectFilterList: ["파일"] },
        {
          label: "트리뷰",
          selectFilterList: ["자동차부품 > 센장 > 자율차센서"]
        }
      ],
      RadioList: [
        { value: 0, label: "포함" },
        { value: 1, label: "제외" }
      ]
    };
  },
  computed: {},
  components: {
    BasicSearchBar,
    RecommendSearchTag,
    SearchResultBox,
    BasicTabMenu,
    SelectFilterList,
    RadioButtonSearchBar,
    BasicPagination
  },
  watch: {},
  methods: {
    searchClick(inputData) {
      this.searchKeyword = inputData.trim();
      this.search();
    },
    tagClick(tagName) {
      this.searchKeyword = tagName;
      this.search();
    },
    search() {
      this.numberOfData = 126;

      if (this.searchKeyword.trim() === "") {
        this.searchResultSuccess = false;
        return;
      }

      this.searchResultSuccess = true;
    },
    currentTabData(data) {
      console.log(data);
    },
    selectFilterReset() {
      this.filterData.forEach((data, i) => {
        data.selectFilterList = [];
      });
    },
    radioSelectSearch(radioValue, searchKeyword) {
      alert("radioValue: " + radioValue + ", searchKeyword: " + searchKeyword);
    }
  },
  created() {}
};
</script>

<style lang="scss">
// @import ""
</style>
