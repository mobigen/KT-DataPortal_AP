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
        previousText="#"
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
      previousText=""
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

    <h3>필터 - 체크 1단, 2단 component</h3>
    <complex-checkbox
      :checkboxKey="checkboxKey"
      :complexCheckboxList="filterData"
      :checkboxColumnCount="checkboxColumnCount"
      @changeCheckboxList="changeCheckboxList"
    ></complex-checkbox>

    <div>필터 - tree component</div>

    <!-- bottom-right-->
    <div>
      검색결과 요약 component (전체 몇건, sort options.. 개발 우선순위 밀림)
    </div>
    <div>검색결과 panel component</div>

    <div>
      <h5>paging component</h5>
      <basic-pagination paging-key="fullSearchPagination"
      :paging-object="pagingObj" />
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
import ComplexCheckbox from "@/components/aiPlatform/group/complex-checkbox.vue";
import BasicPagination from "@/components/aiPlatform/basic/basic-pagination";

export default {
  name: "app-search-full",
  extends: {},
  props: {},
  data() {
    return {
      tagList: [
        { itemId: 1, itemName: "tag01" },
        { itemId: 2, itemName: "tag02" },
        { itemId: 3, itemName: "tag03" },
        { itemId: 4, itemName: "tag04" },
        { itemId: 5, itemName: "tag05" }
      ],
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
          filterList: [
            { itemId: 1, itemName: "자동차부품" },
            { itemId: 2, itemName: "자동차제조" },
            { itemId: 3, itemName: "자동차정비" },
            { itemId: 4, itemName: "화물운송" },
            { itemId: 5, itemName: "관제사고" },
            { itemId: 6, itemName: "미래차산업" }
          ],
          selectFilterList: [
            { itemId: 1, itemName: "자동차부품" },
            { itemId: 2, itemName: "자동차제조" },
            { itemId: 4, itemName: "화물운송" }
          ]
        },
        {
          label: "제공기관",
          filterList: [
            { itemId: 7, itemName: "도로교통공단" },
            { itemId: 8, itemName: "한국지질자원연구원" },
            { itemId: 9, itemName: "한국과학기술정보연구원" },
            { itemId: 10, itemName: "국토교통부" },
            { itemId: 11, itemName: "한국지질자원연구원" },
            { itemId: 12, itemName: "도로교통공단" },
            { itemId: 13, itemName: "한국지질자원연구원" },
            { itemId: 14, itemName: "한국과학기술정보연구원" },
            { itemId: 15, itemName: "도로교통공단" },
            { itemId: 16, itemName: "한국지질자원연구원" }
          ],
          selectFilterList: [
            { itemId: 10, itemName: "국토교통부" },
            { itemId: 9, itemName: "한국과학기술정보연구원" },
            { itemId: 7, itemName: "도로교통공단" }
          ]
        },
        {
          label: "데이터 타입",
          filterList: [
            { itemId: 17, itemName: "데이터셋(파일)" },
            { itemId: 18, itemName: "데이터 서비스" }
          ],
          selectFilterList: [{ itemId: 17, itemName: "파일" }]
        },
        {
          label: "트리뷰",
          filterList: [],
          selectFilterList: []
        }
      ],
      RadioList: [
        { value: 0, label: "포함" },
        { value: 1, label: "제외" }
      ],
      checkboxKey: {
        listName: "filterList",
        selectListName: "selectFilterList"
      },
      checkboxColumnCount: [1, 1, 2, 1],

      pagingObj: {
        visiblePages: 5
      }
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
    ComplexCheckbox,
    BasicPagination
  },
  watch: {},
  methods: {
    searchClick(inputData) {
      this.searchKeyword = inputData.trim();
      this.search();
    },
    tagClick(tagObj) {
      this.searchKeyword = tagObj.itemName;
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
    },
    changeCheckboxList(index, checkboxList) {
      this.filterData[index].selectFilterList = checkboxList;
    }
  },
  created() {}
};
</script>

<style lang="scss">
// @import ""
</style>
