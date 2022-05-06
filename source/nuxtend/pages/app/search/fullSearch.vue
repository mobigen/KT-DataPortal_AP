<template lang="html">
  <div>
    <h5>데이터 통합검색</h5>
    <!-- top-->
    <div class="search-box">
      <div class="component">
        <h3>검색바 component</h3>
        <basic-search-bar
          @search="searchClick"
          :searchKeyword="searchKeyword"
        />
      </div>

      <div class="component">
        <h3>추천검색어 component</h3>
        <recommend-search-tag
          tagLabel="추천검색어"
          :tagList="searchTagList"
          previousText="#"
          :useCancelButton="false"
          :cursorPointer="true"
          @tagClick="tagClick"
        ></recommend-search-tag>
      </div>

      <div class="component">
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
    </div>

    <div class="component">
      <h3>필터 component</h3>
      <select-filter-list
        :filterData="selectFilterData"
        previousText=""
        :useCancelButton="true"
        :cursorPointer="false"
        @filterClick=""
        @filterTagCancel="filterTagCancel"
        @selectFilterReset="selectFilterReset"
      ></select-filter-list>
    </div>

    <!-- bottom-->
    <div class="component">
      <h3>tab component</h3>
      <basic-tab-menu
        :menuList="tabMenuList"
        @currentTabData="currentTabData"
      ></basic-tab-menu>
    </div>

    <!-- bottom-left-->
    <div class="component">
      <h3>검색바 component (radio가 포함된)</h3>
      <radio-button-search-bar
        :radioButtonList="RadioList"
        labelName="radioSelectSearch"
        :defaultValue="0"
        @searchClick="radioSelectSearch"
      ></radio-button-search-bar>
    </div>

    <!-- 모두보기 버튼/닫기 버튼(버튼토글) 추가해야함-->
    <div class="component">
      <h3>필터 - 체크 1단, 2단 component</h3>
      <complex-checkbox
        :complexCheckboxList="filterData"
        :selectCheckboxList="selectFilterData"
        :checkboxColumnCount="checkboxColumnCount"
        @changeCheckboxList="changeCheckboxList"
      ></complex-checkbox>
    </div>

    <div class="component">
      <h3>필터 - tree component</h3>

      <complex-tree
        :component-key="treeObj.componentKey"
        :tree-rest-api="treeObj.treeRestApi"
        :use-single-checkbox="true"
        :checkbox-label="treeObj.checkboxLabel"
        :tree-key="treeObj.treeKey"
        :tree-mode="CONSTANTS.TREE.TREE_MODE.VIEW"
        :tree-select-type="CONSTANTS.TREE.TREE_TYPE.LEAF"
      >
      </complex-tree>
    </div>

    <!-- bottom-right-->
    <div class="component">
      <h3>
        검색결과 요약 component (전체 몇건, sort options.. 개발 우선순위 밀림)
      </h3>

      <h4>sort options</h4>
      <basic-sort-options
        :sortList="sortList"
        :useSeparator="true"
        separator="|"
        :textPreviousIcon="[]"
        :textNextIcon="[]"
        @sortOptionsClick="sortOptionsClick"
      ></basic-sort-options>
    </div>

    <div class="component">
      <h3>검색결과 panel component</h3>
    </div>

    <div class="component">
      <h3>paging component</h3>
      <basic-pagination
        paging-key="fullSearchPagination"
        :paging-object="pagingObj"
      />
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
import ComplexTree from "@/components/aiPlatform/group/complex-tree";
import BasicSortOptions from "@/components/aiPlatform/basic/basic-sort-options.vue";

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
      checkboxColumnCount: [1, 1, 2, 1],
      pagingObj: {
        visiblePages: 5
      },
      treeObj: {
        componentKey: "metaTreeKey",
        treeRestApi: "/api/meta/getCategoryList",
        checkboxLabel: "상위자동선택",
        treeKey: {
          nodeName: "node_name", // node title
          nodeIdText: "node_id", // node key
          parentIdText: "parent_id" // parent key
        }
      },
      sortList: [
        { sortName: "정확도순", orderBy: "accuracy" },
        { sortName: "최신순", orderBy: "latest" },
        { sortName: "다운로드순", orderBy: "download" },
        { sortName: "조회순", orderBy: "view" }
      ]
    };
  },
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"]),
    ...mapGetters("app/search/search", ["searchTagList", "tabMenuList"]),
    filterData: {
      get() {
        const data = this.$store.getters["app/search/search/searchFilterList"];
        return JSON.parse(JSON.stringify(data));
      }
    },
    selectFilterData: {
      get() {
        const data =
          this.$store.getters["app/search/search/selectSearchFilterList"];
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
    BasicPagination,
    ComplexTree,
    BasicSortOptions
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
    changeCheckboxList(key, checkboxList) {
      this.changeSearchFilterList({ key, changeList: checkboxList });
    },
    filterTagCancel(key, tagList) {
      this.changeSearchFilterList({ key, changeList: tagList });
    },
    sortOptionsClick(orderBy) {
      alert(orderBy);
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
.component {
  padding: 20px;
  border: 1px solid lightgrey;
  margin: 10px;
}
</style>
