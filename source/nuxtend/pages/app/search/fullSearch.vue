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
        :tagList="searchTagList"
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
      @filterTagCancel="filterTagCancel"
      @selectFilterReset="selectFilterReset"
    ></select-filter-list>

    <!-- bottom-->

    <h3>tab component</h3>
    <basic-tab-menu
      :menuList="tabMenuList"
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

    <!-- 모두보기 버튼/닫기 버튼(버튼토글) 추가해야함-->
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
import { mapActions, mapGetters } from "vuex";
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
      searchKeyword: "",
      numberOfData: null,
      searchResultSuccess: false,
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
  computed: {
    ...mapGetters("app/search/search", ["searchTagList", "tabMenuList"]),
    filterData: {
      get() {
        const data = this.$store.getters["app/search/search/searchFilterList"];
        return JSON.parse(JSON.stringify(data));
      }
    }
  },
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
    ...mapActions("app/search/search", [
      "getSearchTagList",
      "getTabMenuList",
      "getSearchFilterList",
      "changeSearchFilterList",
      "resetSearchFilterList"
    ]),
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
      this.resetSearchFilterList();
    },
    radioSelectSearch(radioValue, searchKeyword) {
      alert("radioValue: " + radioValue + ", searchKeyword: " + searchKeyword);
    },
    changeCheckboxList(index, checkboxList) {
      this.changeSearchFilterList({ index, changeList: checkboxList });
    },
    filterTagCancel(index, tagList) {
      this.changeSearchFilterList({ index, changeList: tagList });
    }
  },
  created() {
    this.getSearchTagList();
    this.getTabMenuList();
    this.getSearchFilterList();
  }
};
</script>

<style lang="scss">
// @import ""
</style>
