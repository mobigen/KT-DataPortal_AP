<template lang="html">
  <div class="contents-wrap">
    <h2 class="hidden">데이터 검색</h2>
    <div class="contents-subject">
      <group-breadcrumb></group-breadcrumb>
      <div class="subject">
        <h3 class="subject__title">데이터 통합검색</h3>
        <p class="subject__desc">
          데이터를 트리구조로 검색할 수 있는 트리뷰를 제공합니다.
        </p>
      </div>
    </div>
    <div class="content-top">
      <div class="contents-top__search">
        <search-input-field
          :searchKeyword="searchKeyword"
          :use-recent-search="true"
          :use-inner-search="true"
          @search="searchBtnClick"
          @filterCheck="rescanFilterCheck"
        ></search-input-field>
        <div class="contents-top__recommend">
          <h4>추천검색어</h4>
          <basic-tag-list
            :tagList="tagList"
            previousText="#"
            :useCancelButton="false"
            @tagClick="recommendTagClick"
          ></basic-tag-list>
        </div>
      </div>
      <search-result-box
        class="contents-search-result"
        :showSearchResultBox="showSearchResultBox"
        :searchResultSuccess="searchResultSuccess"
      >
        <template
          v-if="searchKeywordList.length < 2"
          v-slot:resultSuccessTrueText
        >
          <strong>'{{ searchKeyword }}'</strong>에 대한 검색결과 총
          <strong>{{ contents.totalcount }}</strong> 건이 검색되었습니다.
        </template>

        <!-- TODO: '교통체증' & '대중교통' & '자전거' 와 같이 item 사이에 구분자 css 처리 필요 / 임시로 일단 처리해둠 -->
        <template v-else v-slot:resultSuccessTrueText>
          <strong
            v-for="(item, index) in searchKeywordList"
            :key="'searchKeyword_' + index"
            >'{{ item }}'
            <span
              v-if="searchKeywordList.length - 1 !== index"
              style="color: black"
              >&</span
            >
          </strong>
          검색 결과, 총 <strong>{{ contents.totalcount }}</strong> 건 입니다.
        </template>
      </search-result-box>

      <!-- TODO : 한자연 기획 변경 (상세검색 선택패널 삭제) 으로 삭제하였습니다.-->
      <!--      <div class="contents-top__detail">-->
      <!--        <base-button-->
      <!--          class="detail-button-default"-->
      <!--          :class="isDetailOpen ? 'detail-button-open' : ''"-->
      <!--          @click="toggleDetail"-->
      <!--          title="상세검색"-->
      <!--          >상세검색</base-button-->
      <!--        >-->
      <!--      </div>-->
    </div>
    <div class="contents">
      <!--사이드메뉴-->
      <aside>
        <h3 class="hidden">검색필터 상세선택</h3>
        <!--        높이 임시로 넣었습니다.-->
        <div class="aside__category">
          <div
            class="aside__category-default"
            :class="isCategoryExpand ? 'aside__category-expand' : ''"
          >
            <h4 class="aside__title">카테고리</h4>
            <base-button
              class="aside__button-expand"
              :class="isCategoryExpand ? 'aside__button-default' : ''"
              @click="toggleCategoryExpand"
            ></base-button>

            <!-- 카테고리 트리 component -->
            <group-search-filter
              :component-key="treeObj.componentKey"
              :tree-obj="treeObj"
              :tree-key="treeObj.treeKey"
            ></group-search-filter>
          </div>
        </div>

        <!-- filter checkbox component : 제공기관 -->
        <checkbox-filter-list
          :use-expand-button="true"
          :filter-id="CONSTANTS.FILTER.KEYS.PROVIDER"
          filter-title="제공기관"
          :filter-list="searchFilterList[CONSTANTS.FILTER.KEYS.PROVIDER]"
          :select-checkbox-list="
            selectSearchFilterList[CONSTANTS.FILTER.KEYS.PROVIDER]
          "
          @changeCheckboxList="changeCheckboxList"
        >
        </checkbox-filter-list>

        <!-- filter checkbox component : 데이터타입-->
        <checkbox-filter-list
          :use-expand-button="false"
          :filter-id="CONSTANTS.FILTER.KEYS.TYPE"
          filter-title="데이터타입"
          :filter-list="searchFilterList[CONSTANTS.FILTER.KEYS.TYPE]"
          :select-checkbox-list="
            selectSearchFilterList[CONSTANTS.FILTER.KEYS.TYPE]
          "
          @changeCheckboxList="changeCheckboxList"
        >
        </checkbox-filter-list>

        <!-- filter checkbox component : 키워드 -->
        <checkbox-filter-list
          :use-expand-button="false"
          :filter-id="CONSTANTS.FILTER.KEYS.KEYWORD"
          filter-title="키워드"
          :filter-list="searchFilterList[CONSTANTS.FILTER.KEYS.KEYWORD]"
          :select-checkbox-list="
            selectSearchFilterList[CONSTANTS.FILTER.KEYS.KEYWORD]
          "
          @changeCheckboxList="changeCheckboxList"
        >
        </checkbox-filter-list>
      </aside>

      <!-- // 사이드메뉴 -->
      <section>
        <!--탭 -->
        <group-tab
          :tabList="tabList"
          :useTabNum="true"
          @tabClick="tabClick"
        ></group-tab>
        <!-- // 탭 -->
        <div class="contents__list">
          <div class="contents__list-head">
            <h4>
              전체<span>{{ contents.totalcount }}</span>
            </h4>
            <div class="list-head__options">
              <div class="list-head__options-sort">
                <basic-option
                  radioClass="radio--check"
                  :optionList="sortOptionList"
                  type="text"
                  name="radio-sort"
                  @checkOption="sortOptionChange"
                ></basic-option>
              </div>
              <div class="list-head__options-view">
                <basic-option
                  class="radios--toggle"
                  radioClass="radio--icon"
                  :optionList="viewOptionList"
                  type="icon"
                  name="radio-view"
                  @checkOption="viewOptionChange"
                ></basic-option>
              </div>
            </div>
          </div>
          <div>
            <!--   카드형인 경우, data-box-list--card 클래스 추가-->
            <search-list
              :class="isListCard ? 'data-box-list--card' : ''"
              :list="contents.searchList"
              :myFavoriteDataList="myFavoriteDataList"
              :searchKeyword="searchKeyword"
              :searchKeywordList="searchKeywordList"
              @dataBoxClick="listDataBoxClick"
              @keywordClick="listKeywordClick"
              @myFavoriteDataClick="myFavoriteDataClick"
            ></search-list>
          </div>
        </div>
        <div class="contents__pagination">
          <group-pagination
            :paging-key="paginationKey"
            :paging-object="{
              [CONSTANTS.PAGING.ITEMS_PER_PAGE]: 5,
              [CONSTANTS.PAGING.VISIBLE_PAGES]: 3,
              [CONSTANTS.PAGING.PAGE]: 1
            }"
            @pagingEvent="getGridData"
            :show-test-table="false"
          ></group-pagination>
        </div>
      </section>
    </div>
  </div>
</template>

<script type="text/javascript">
import BaseButton from "@common/atoms/base-button/base-button";
import BaseCheckbox from "@common/atoms/base-checkbox/base-checkbox";
import GroupTab from "@component/common/molecules/group-tab/group-tab";
import GroupPagination from "@component/common/molecules/group-pagination/group-pagination";
import GroupBreadcrumb from "@common/molecules/group-breadcrumb/group-breadcrumb";
import GroupSearchFilter from "@component/common/molecules/group-search-filter/group-search-filter";
import SearchList from "@component/common/organisms/search-list/search-list.vue";
import SearchInputField from "@component/common/organisms/search-input-field/search-input-field.vue";
import SearchResultBox from "@component/common/atoms/search-result-box/search-result-box";
import BasicTagList from "@component/common/atoms/basic-tag-list/basic-tag-list";
import BasicOption from "@component/common/atoms/basic-option/basic-option";
import { mapActions, mapGetters } from "vuex";
import CheckboxFilterList from "@component/common/molecules/checkbox-filter-list/checkbox-filter-list.vue";

export default {
  name: "fullSearch",
  computed: {
    ...mapGetters({
      contents: "meta/keyword-search/contents",
      CONSTANTS: "defaults/constants/CONSTANTS",
      keyword: "meta/keyword-search/searchKeyword"
    }),
    ...mapGetters("meta/search/search", [
      "searchFilterList",
      "selectSearchFilterList"
    ])
  },
  components: {
    CheckboxFilterList,
    BaseButton,
    BaseCheckbox,
    GroupPagination,
    GroupBreadcrumb,
    GroupSearchFilter,
    GroupTab,
    SearchList,
    SearchInputField,
    SearchResultBox,
    BasicTagList,
    BasicOption
  },
  data() {
    return {
      isDetailOpen: true,
      isCategoryExpand: false,
      isListCard: false,
      filterObj: {
        category: {
          label: "카테고리",
          componentType: "checkbox"
        },
        provider: {
          label: "제공기관",
          componentType: "checkbox"
        },
        dataType: {
          label: "데이터 타입",
          componentType: "checkbox"
        },
        treeView: {
          label: "트리뷰",
          componentType: "tree"
        }
      },
      treeObj: {
        componentKey: "metaTreeKey",
        treeRestApi: "/getCategoryList",
        checkboxLabel: "상위자동선택",
        treeKey: {
          NODE_NM: "node_nm", // node title
          NODE_ID: "node_id", // node key
          PRNTS_ID: "prnts_id" // parent key
        }
      },
      searchKeyword: "",
      searchKeywordList: [],
      rescanFilterChecked: false,
      showSearchResultBox: false,
      searchResultSuccess: false,
      tagList: [
        { itemId: 1, itemName: "결빙사고" },
        { itemId: 2, itemName: "사고다발지역" },
        { itemId: 3, itemName: "교통체증" },
        { itemId: 4, itemName: "대중교통" },
        { itemId: 5, itemName: "자전거" }
      ],
      tabList: [
        { num: "999+", title: "전체" },
        { num: "133", title: "내부데이터" },
        { num: "0", title: "CKAN" },
        { num: "71", title: "분원데이터" }
      ],
      paginationKey: "fullSearchPagination",
      sortOptionList: [
        { label: "정확도순", option: "accuracy" },
        { label: "수정일순", option: "updateDate" },
        { label: "조회순", option: "view" }
      ],
      viewOptionList: [
        { label: "목록형", option: "list", svgIconName: "list_katech" },
        { label: "카드형", option: "card", svgIconName: "list_card_katech" }
      ],
      myFavoriteDataList: ["1", "3", "4"]
    };
  },
  methods: {
    ...mapActions("meta/keyword-search", ["getContents", "setSearchKeyword"]),
    ...mapActions("meta/search/search", [
      "getSearchFilterList",
      "changeSearchFilterList"
    ]),
    toggleCategoryExpand: function () {
      this.isCategoryExpand = !this.isCategoryExpand;
    },
    searchBtnClick(inputData) {
      this.searchKeyword = inputData.trim();
      this.search();
    },
    searchResultBox(show, success) {
      this.showSearchResultBox = show;
      this.searchResultSuccess = success;
    },
    search() {
      if (this.searchKeyword.trim() === "") {
        this.searchResultBox(false, false);
        alert("값을 입력해주세요.");
        return;
      } else {
        this.searchResultBox(true, true);
      }

      if (this.rescanFilterChecked) {
        if (this.searchKeywordList.length >= 3) {
          alert("결과 내 재검색 3회이상으로 추가 검색이 불가능 합니다.");
          this.searchKeyword = "";
          return;
        } else if (this.searchKeywordList.includes(this.searchKeyword)) {
          alert("동일한 검색어 입력으로 추가 검색이 불가능 합니다.");
          return;
        }
      } else {
        this.searchKeywordList = [];
      }

      this.searchKeywordList.push(this.searchKeyword);

      this.getGridData();
    },
    recommendTagClick(tagObj) {
      this.searchKeyword = tagObj.itemName;
      this.search();
    },
    tabClick({ tabObj }) {
      console.log(tabObj);
    },
    getGridData() {
      this.getContents({
        paginationKey: this.paginationKey,
        searchKeywordList: this.searchKeywordList
      });
    },
    sortOptionChange(option) {
      console.log("sort option: " + option);
    },
    viewOptionChange(option) {
      console.log("view option: " + option);
      this.isListCard = option === "card";
    },
    listKeywordClick(tagObj) {
      console.log(tagObj.itemId + ", " + tagObj.itemName);
    },
    listDataBoxClick({ postId }) {
      this.$router.push({
        path: "/portal/ui/meta/search/fullSearch/detail",
        query: { postId }
      });
    },
    myFavoriteDataClick({ postId, bool }) {
      console.log(postId + ", " + bool);
    },
    changeCheckboxList({ checkboxKey, changeList }) {
      this.changeSearchFilterList({
        key: checkboxKey,
        changeList: changeList
      });
    },
    rescanFilterCheck({ bool }) {
      this.rescanFilterChecked = bool;
      if (bool === false && this.searchKeyword === "") {
        this.searchKeywordList = [];
        this.searchKeyword = "";
        this.searchResultBox(false, false);
        this.getGridData();
      }
    },
    searchDetailKeyword() {
      this.search();
      this.setSearchKeyword("");
    }
  },
  mounted() {
    if (this.keyword === "") {
      this.getGridData();
    } else {
      this.searchKeyword = this.keyword;
      this.searchDetailKeyword();
    }
  },
  created() {
    this.getSearchFilterList();
  }
};
</script>

<style lang="scss" scoped>
@import "pages/portal/ui/meta/search/fullSearch/index";
</style>
