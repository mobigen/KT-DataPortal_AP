<template>
  <div class="container">
    <div class="contents-subject">
      <!-- contents-subject은 나중에 따로 빠질수 있음 -->
      <h2 class="hidden">데이터</h2>
      <group-breadcrumb></group-breadcrumb>
    </div>
    <!-- contents-wrap -->
    <div class="contents-wrap">
      <!-- contents-group : subject + content-top + contents(L : R) -->
      <div class="contents-group">
        <subject>
          <template v-slot:title>데이터 검색</template>
          <template v-slot:description>
            관심 데이터를 기초 분석부터 시각화까지 다양한 방식으로 활용 할 수
            있습니다.
          </template>
        </subject>
        <!-- content-top : 데이터 검색/ 상세-->
        <div class="contents-top">
          <!-- contents-top__search : 통합검색 -->
          <div class="contents-top__search">
            <search-input-field
              :searchKeyword="searchKeyword"
              :use-recent-search="true"
              :use-inner-search="true"
              @search="searchBtnClick"
              @filterCheck="rescanFilterCheck"
            >
            </search-input-field>
            <div class="contents-top__recommend">
              <!-- 추천검색어 : 검색어 입력창에 검색어 입력 없이 빈 상태일 때 추천 검색어 노출 -->
              <p>추천검색어</p>
              <basic-tag-list
                :tagList="recommendTagList"
                previousText="#"
                :useCancelButton="false"
                @tagClick="recommendTagClick"
                spanClass="tag__label"
              ></basic-tag-list>
              <!-- // 추천검색어 -->
            </div>
          </div>
          <!-- contents-search-result : 결과값 -->
          <search-result-box
            class="contents-search-result"
            :showSearchResultBox="showSearchResultBox"
            :searchResultSuccess="searchResultSuccess"
          >
            <template
              v-if="searchKeywordList.length < 2"
              v-slot:resultSuccessTrueText
            >
              <p class="contents-search-result__text">
                <mark>{{ searchKeyword }}</mark
                >에 대한 검색결과, 총
                <strong>{{ contents.totalcount }}</strong> 건 입니다.
              </p>
            </template>

            <template v-else v-slot:resultSuccessTrueText>
              <span class="contents-search-result__text">
                <mark
                  v-for="(item, index) in searchKeywordList"
                  :key="'searchKeyword_' + index"
                  >'{{ item }}'
                  <span
                    v-if="searchKeywordList.length - 1 !== index"
                    style="color: black"
                    >&
                  </span>
                </mark>
                검색 결과, 총 <strong>{{ contents.totalcount }}</strong> 건
                입니다.
              </span>
            </template>
          </search-result-box>
          <!-- // contents-search-result -->
          <!-- contents-top__detail : 데이터 상세검색 토글영역 -->
          <div class="contents-top__detail">
            <base-button
              class="detail-button-default"
              :class="isDetailOpen ? 'detail-button--open' : ''"
              @click="toggleDetail"
              title="상세검색"
              >데이터 상세검색</base-button
            >
            <div
              class="contents-top__filter"
              :class="isDetailOpen ? 'contents-top__filter--open' : ''"
            >
              <div class="filter-group">
                <div class="filter-group__options">
                  <!-- 토글스위치 -->
                  <base-switch @isSwitchChanged="isSwitchChanged1">
                    <span class="toggle-switch__label">전체 선택</span>
                  </base-switch>
                  <!-- //토글스위치 -->
                  <div class="filter-group__notice">
                    <p class="info-text">분류를 선택하세요. (중복가능)</p>
                  </div>
                </div>
                <!-- 필터그룹핑 -->
                <div
                  class="search-filter-group search-filter-group--horizontal"
                >
                  <checkbox-filter-list
                    :use-expand-button="true"
                    :filter-id="CONSTANTS.FILTER.KEYS.BM"
                    filter-title="BM"
                    :filter-list="searchFilterList[CONSTANTS.FILTER.KEYS.BM]"
                    :select-checkbox-list="
                      selectSearchFilterList[CONSTANTS.FILTER.KEYS.BM]
                    "
                    :title-check-value="switch1"
                    @changeCheckboxList="changeCheckboxList"
                  />
                  <checkbox-filter-list
                    :use-expand-button="true"
                    :filter-id="CONSTANTS.FILTER.KEYS.OFFERED_UNITS"
                    filter-title="제공단위(P.key)"
                    :filter-list="
                      searchFilterList[CONSTANTS.FILTER.KEYS.OFFERED_UNITS]
                    "
                    :select-checkbox-list="
                      selectSearchFilterList[
                        CONSTANTS.FILTER.KEYS.OFFERED_UNITS
                      ]
                    "
                    :title-check-value="switch1"
                    @changeCheckboxList="changeCheckboxList"
                  />
                  <checkbox-filter-list
                    :use-expand-button="true"
                    :filter-id="CONSTANTS.FILTER.KEYS.DATA_TYPE1"
                    filter-title="데이터 유형"
                    :filter-list="
                      searchFilterList[CONSTANTS.FILTER.KEYS.DATA_TYPE1]
                    "
                    :select-checkbox-list="
                      selectSearchFilterList[CONSTANTS.FILTER.KEYS.DATA_TYPE1]
                    "
                    :title-check-value="switch1"
                    @changeCheckboxList="changeCheckboxList"
                  />
                </div>
                <!-- //필터그룹핑 -->
              </div>
            </div>
          </div>
          <!-- // contents-top__detail -->
        </div>
        <!-- contents : 필터 L : 검색목록 R -->
        <div class="contents">
          <div class="contents-section">
            <!-- 검색필터 상세선택 -->
            <div class="filter-wrap">
              <h3 class="hidden">검색필터 상세선택</h3>
              <div class="filter">
                <div class="filter__options">
                  <!-- 토글스위치 -->
                  <base-switch @isSwitchChanged="isSwitchChanged2">
                    <span class="toggle-switch__label">전체 선택</span>
                  </base-switch>
                  <!-- //토글스위치 -->
                </div>
                <div class="search-filter-group search-filter-group--vertical">
                  <checkbox-filter-list
                    :use-expand-button="true"
                    :filter-id="CONSTANTS.FILTER.KEYS.PROVIDER"
                    filter-title="제공방식"
                    :filter-list="
                      searchFilterList[CONSTANTS.FILTER.KEYS.PROVIDER]
                    "
                    :select-checkbox-list="
                      selectSearchFilterList[CONSTANTS.FILTER.KEYS.PROVIDER]
                    "
                    :title-check-value="switch2"
                    @changeCheckboxList="changeCheckboxList"
                  />
                  <checkbox-filter-list
                    :use-expand-button="true"
                    :filter-id="CONSTANTS.FILTER.KEYS.DATA_TYPE2"
                    filter-title="데이터 형태"
                    :filter-list="
                      searchFilterList[CONSTANTS.FILTER.KEYS.DATA_TYPE2]
                    "
                    :select-checkbox-list="
                      selectSearchFilterList[CONSTANTS.FILTER.KEYS.DATA_TYPE2]
                    "
                    :title-check-value="switch2"
                    @changeCheckboxList="changeCheckboxList"
                  />
                  <checkbox-filter-list
                    :use-expand-button="true"
                    :filter-id="CONSTANTS.FILTER.KEYS.DATA_SOURCE"
                    filter-title="데이터 출처"
                    :filter-list="
                      searchFilterList[CONSTANTS.FILTER.KEYS.DATA_SOURCE]
                    "
                    :select-checkbox-list="
                      selectSearchFilterList[CONSTANTS.FILTER.KEYS.DATA_SOURCE]
                    "
                    :title-check-value="switch2"
                    @changeCheckboxList="changeCheckboxList"
                  />
                  <checkbox-filter-list
                    :use-expand-button="true"
                    :filter-id="CONSTANTS.FILTER.KEYS.KWORD"
                    filter-title="키워드"
                    :filter-list="searchFilterList[CONSTANTS.FILTER.KEYS.KWORD]"
                    :select-checkbox-list="
                      selectSearchFilterList[CONSTANTS.FILTER.KEYS.KWORD]
                    "
                    :title-check-value="switch2"
                    @changeCheckboxList="changeCheckboxList"
                  />
                </div>
              </div>
            </div>
            <!-- // 검색필터 상세선택 -->
            <!-- 검색 목록 -->
            <div class="data-result-wrap">
              <!--탭 -->
              <group-tab
                :tabList="tabList"
                :useTabNum="false"
                name-key="code_nm"
                code-key="code_id"
                active-tab="data_contents"
                :disabledCodeKeyList="disabledCodeKeyList"
                @tabClick="tabClick"
              ></group-tab>
              <!--//탭 -->
              <!-- heading-group -->
              <div class="heading-group">
                <h4 class="heading-group__title">
                  전체<span>
                    (<strong>{{ contents.totalcount }}</strong> 건)
                  </span>
                </h4>
                <div class="heading-group__options">
                  <!-- sort -->
                  <div class="options-sort">
                    <!-- radios -->
                    <span class="hidden">정렬선택</span>
                    <basic-option
                      radioClass="radio--check"
                      :optionList="sortOptionList"
                      type="text"
                      name="radio-sort"
                      @checkOption="sortOptionChange"
                    ></basic-option>
                    <!-- select -->
                    <base-select
                      class="w-107"
                      select-id="select-01"
                      labelName="selectCategory"
                      :select-list="selectCategoryList"
                      :selected-key="selectedKey"
                      :use-select-open="false"
                      @changeData="changeData"
                    >
                    </base-select>
                  </div>
                </div>
              </div>
              <!-- // heading-group -->
              <!-- data-result -->
              <div class="data-result">
                <div class="data-result__list">
                  <!-- 검색된 목록 리스트 -->
                  <!-- TODO: 실제 search-list 연동 필요 -->
                  <search-list
                    rowKey="biz_dataset_id"
                    :list="contents.searchList"
                    :searchKeyword="searchKeyword"
                    :searchKeywordList="searchKeywordList"
                    :myFavoriteDataList="myFavoriteDataList"
                    @dataBoxClick="dataBoxClick"
                    @keywordClick="dataBoxKeywordClick"
                    @myFavoriteDataClick="myFavoriteDataClick"
                  ></search-list>

                  <!-- data-none : 검색된 데이터가 없는경우 -->
                  <div v-if="contents.totalcount === 0" class="data-none">
                    <p
                      class="data-none__title"
                      v-if="searchKeywordList.length < 2"
                    >
                      <mark>{{ searchKeyword }}</mark>
                      에 대한 검색 결과가 없습니다.
                    </p>
                    <p class="data-none__title" v-else>
                      <template v-for="(item, index) in searchKeywordList">
                        <mark :key="'searchKeyword_' + index">{{ item }}</mark>
                        <span
                          v-if="searchKeywordList.length - 1 !== index"
                          style="color: black"
                          >&
                        </span>
                      </template>
                      에 대한 검색 결과가 없습니다.
                    </p>
                    <p class="data-none__description">
                      정확한 검색어인지 확인하시고 다시 검색해 주세요.
                      <span
                        >단어의 철자, 보다 일반적인 검색어로 다시 검색해 보세요.
                        <br />
                        검색어의 띄어쓰기를 다르게 해보세요.</span
                      >
                    </p>
                  </div>
                  <!-- // data-none  -->
                </div>
              </div>
              <!-- // data-result -->
              <group-pagination
                v-if="contents.totalcount !== 0"
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
            <!-- // 검색 목록 -->
          </div>
        </div>
      </div>
    </div>
    <!-- // contents-wrap -->
  </div>
</template>

<script type="text/javascript">
import BaseRadio from "@component/common/atoms/base-radio/base-radio";
import BasicTagList from "@component/common/atoms/basic-tag-list/basic-tag-list";
import BaseSelect from "@component/common/atoms/base-select/base-select";
import BaseButton from "@component/common/atoms/base-button/base-button";
import BaseCheckbox from "@component/common/atoms/base-checkbox/base-checkbox";
import BaseSwitch from "@component/common/atoms/base-switch/base-switch";
import GroupTab from "@component/common/molecules/group-tab/group-tab";
import GroupPagination from "@component/common/molecules/group-pagination/group-pagination";
import GroupBreadcrumb from "@component/common/molecules/group-breadcrumb/group-breadcrumb";
import Subject from "@component/common/organisms/subject/subject.vue";
import GroupSearchFilter from "@component/common/molecules/group-search-filter/group-search-filter";
import SearchList from "@component/common/organisms/search-list/search-list.vue";
import SearchInputField from "@component/common/organisms/search-input-field/search-input-field.vue";
import SearchResultBox from "@common/atoms/search-result-box/search-result-box";
import BasicOption from "@common/atoms/basic-option/basic-option";
import CheckboxFilterList from "@common/molecules/checkbox-filter-list/checkbox-filter-list";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Index",
  layout: "kt/kt",
  computed: {
    ...mapGetters({
      contents: "meta/search/search/contents",
      CONSTANTS: "defaults/constants/CONSTANTS",
      keyword: "meta/search/search/searchKeyword"
    }),
    ...mapGetters("meta/search/search", [
      "searchFilterList",
      "selectSearchFilterList"
    ])
  },
  components: {
    BaseRadio,
    BaseButton,
    BasicTagList,
    BaseSelect,
    BaseCheckbox,
    BaseSwitch,
    GroupPagination,
    GroupBreadcrumb,
    Subject,
    GroupSearchFilter,
    GroupTab,
    SearchList,
    SearchInputField,
    SearchResultBox,
    BasicOption,
    CheckboxFilterList
  },
  data() {
    return {
      isDetailOpen: false,
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
      recommendTagList: [
        { itemId: 1, itemName: "데이터사업" },
        { itemId: 2, itemName: "업종" },
        { itemId: 3, itemName: "콜등급" },
        { itemId: 4, itemName: "트래픽" },
        { itemId: 5, itemName: "CU" },
        { itemId: 5, itemName: "RTPO" }
      ],
      searchKeyword: "",
      searchKeywordList: [],
      rescanFilterChecked: false,
      showSearchResultBox: false,
      searchResultSuccess: false,
      paginationKey: "ktFullSearchPagination",
      sortOptionList: [
        { label: "정확도순", option: "accuracy" },
        { label: "최신등록순", option: "updateDate" },
        { label: "조회순", option: "view" },
        { label: "다운로드순", option: "download" }
      ],
      tabList: [
        { num: "50", code_id: "data_contents", code_nm: "데이터 콘텐츠" },
        { num: "184", code_id: "data_assets", code_nm: "데이터 자산" },
        { num: "56", code_id: "data_meta", code_nm: "데이터 메타" }
      ],
      selectCategoryList: [
        { key: "12", text: "12개씩" },
        { key: "20", text: "20개씩" },
        { key: "40", text: "40개씩" }
      ],
      selectedKey: null,
      switch1: false,
      switch2: false,
      // bmChecked: false,
      // offeredUnitsChecked: false,
      // dataType1Checked: false,
      myFavoriteDataList: [
        "01bfea44-5b42-41e7-9901-8fad6997969c",
        "2c4c3962-ab70-4f42-9681-71ecd7afbe4b"
      ],
      disabledCodeKeyList: ["data_assets", "data_meta"]
    };
  },
  methods: {
    ...mapActions("meta/search/search", ["getContents", "setSearchKeyword"]),
    ...mapActions("meta/search/search", [
      "getSearchFilterList",
      "changeSearchFilterList"
    ]),
    toggleDetail: function () {
      this.isDetailOpen = !this.isDetailOpen;
    },
    recommendTagClick(tagObj) {
      this.searchKeyword = tagObj.itemName;
      this.search();
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
        if (this.searchKeywordList.length === 0) {
          alert("값을 입력해주세요.");
          return;
        }
      } else {
        this.searchResultBox(true, true);
      }
      if (this.rescanFilterChecked) {
        if (this.searchKeywordList.length >= 3) {
          alert("결과 내 재검색 3회이상으로 추가 검색이 불가능 합니다.");
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
    getGridData() {
      this.getContents({
        paginationKey: this.paginationKey,
        searchKeywordList: this.searchKeywordList
      });
    },
    rescanFilterCheck({ bool }) {
      this.rescanFilterChecked = bool;
      if (!bool && this.searchKeyword && this.searchKeywordList.length > 0) {
        this.searchKeywordList = [];
        this.searchKeyword = "";
        this.searchResultBox(false, false);
        this.getGridData();
      }
    },
    searchDetailKeyword() {
      this.search();
      this.setSearchKeyword("");
    },
    sortOptionChange(option) {
      console.log("sort option: " + option);
    },
    tabClick({ tabObj }) {
      console.log(tabObj);
    },
    changeData({ input }) {
      console.log("key: " + input);
      this.selectedKey = input;
    },
    changeCheckboxList({ checkboxKey, changeList }) {
      console.log(checkboxKey);
      this.changeSearchFilterList({
        key: checkboxKey,
        changeList: changeList
      });
    },
    isSwitchChanged1(switchValue) {
      // 데이터 상세검색 switch
      const checkKeys = [
        this.CONSTANTS.FILTER.KEYS.BM,
        this.CONSTANTS.FILTER.KEYS.OFFERED_UNITS,
        this.CONSTANTS.FILTER.KEYS.DATA_TYPE1
      ];
      this.switch1 = switchValue;
      this.switchChecked(switchValue, checkKeys);
    },
    isSwitchChanged2(switchValue) {
      // 좌측 하단 필터 switch
      // provider, dataType2, dataSource, kword
      const checkKeys = [
        this.CONSTANTS.FILTER.KEYS.PROVIDER,
        this.CONSTANTS.FILTER.KEYS.DATA_TYPE2,
        this.CONSTANTS.FILTER.KEYS.DATA_SOURCE,
        this.CONSTANTS.FILTER.KEYS.KWORD
      ];
      this.switch2 = switchValue;
      this.switchChecked(switchValue, checkKeys);
    },
    switchChecked(switchValue, checkKeys) {
      checkKeys.forEach((key) => {
        this.changeCheckboxList({
          checkboxKey: key,
          changeList: switchValue ? this.searchFilterList[key] : []
        });
      }, this);
    },
    dataBoxClick(id) {
      this.$router.push({
        path: "/portal/ui/meta/search/fullSearch/detail",
        query: { datasetId: id }
      });
    },
    dataBoxKeywordClick(tagObj) {
      this.searchKeyword = tagObj.itemName;
      this.search();
    },
    myFavoriteDataClick({ id, checked }) {
      if (checked) {
        this.myFavoriteDataList.push(id);
      } else {
        this.myFavoriteDataList = this.myFavoriteDataList.filter(
          (el) => el !== id
        );
      }
      console.log(this.myFavoriteDataList);
    }
  },
  mounted() {
    if (this.keyword === "") {
      this.getGridData();
    } else {
      this.searchKeyword = this.keyword;
      this.searchDetailKeyword();
    }
    this.selectedKey = "20";
  },
  created() {
    this.getSearchFilterList();
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
