<template>
  <div class="contents-wrap">
    <h2 class="hidden">데이터</h2>
    <div class="contents-subject">
      <group-breadcrumb></group-breadcrumb>
      <subject></subject>
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
          <!-- 추천검색어 : 검색어 입력창에 검색어 입력 없이 빈 상태일 때 추천 검색어 노출 -->
          <p>추천검색어</p>

          <basic-tag-list
            :tagList="recommendTagList"
            previousText="#"
            :useCancelButton="false"
            @tagClick="recommendTagClick"
          ></basic-tag-list>
          <!-- //추천검색어 -->
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
          <p class="contents-search-result__text">
            <strong>{{ searchKeyword }}</strong
            >에 대한 검색결과, 총 <strong>{{ contents.totalcount }}</strong> 건
            입니다.
          </p>
        </template>

        <template v-else v-slot:resultSuccessTrueText>
          <span class="contents-search-result__text">
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
          </span>
        </template>
      </search-result-box>

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
              <base-switch>
                <span>전체 선택</span>
              </base-switch>
              <!-- //토글스위치 -->
              <div class="filter-group__notice">
                <p class="info-text">분류를 선택하세요. (중복가능)</p>
              </div>
            </div>
            <!-- 필터그룹핑 -->
            <div class="search-filter-group search-filter-group--horizontal">
              <group-search-filter
                :component-key="treeObj.componentKey"
                :tree-obj="treeObj"
                :tree-key="treeObj.treeKey"
              ></group-search-filter>
              <group-search-filter
                :component-key="treeObj.componentKey"
                :tree-obj="treeObj"
                :tree-key="treeObj.treeKey"
              ></group-search-filter>
              <group-search-filter
                :component-key="treeObj.componentKey"
                :tree-obj="treeObj"
                :tree-key="treeObj.treeKey"
              ></group-search-filter>
            </div>
            <!-- //필터그룹핑 -->
          </div>
        </div>
      </div>
    </div>
    <div class="contents">
      <!--사이드메뉴-->
      <aside class="aside">
        <h3 class="hidden">검색필터 상세선택</h3>
        <div class="aside-category">
          <div class="aside-category__options">
            <!-- 토글스위치 -->
            <base-switch>
              <span>전체 선택</span>
            </base-switch>
            <!-- //토글스위치 -->
          </div>
          <div class="search-filter-group search-filter-group--vertical">
            <group-search-filter
              :component-key="treeObj.componentKey"
              :tree-obj="treeObj"
              :tree-key="treeObj.treeKey"
            ></group-search-filter>
            <group-search-filter
              :component-key="treeObj.componentKey"
              :tree-obj="treeObj"
              :tree-key="treeObj.treeKey"
            ></group-search-filter>
            <group-search-filter
              :component-key="treeObj.componentKey"
              :tree-obj="treeObj"
              :tree-key="treeObj.treeKey"
            ></group-search-filter>
          </div>
        </div>
      </aside>
      <!-- // 사이드메뉴 -->
      <section>
        <div class="contents__result">
          <!--탭 -->
          <div class="contents__tab">
            <group-tab></group-tab>
          </div>
          <!-- // 탭 -->
          <div class="contents__list">
            <div class="contents__list_inner">
              <!-- heading-group -->
              <div class="heading-group">
                <h4>전체<span>(<strong>152</strong>건)</span></h4>
                <div class="heading-group__options">
                  <!-- sort -->
                  <div class="options-sort">
                    <!-- radios -->
                    <div class="radios">
                      <span class="hidden">정렬선택</span>
                      <base-radio
                        name="radio-check"
                        radioId="radio-sort1"
                        class="radio--check"
                        checked
                      >
                        <template v-slot:label
                          ><span class="radio-check-first"
                            >정확도순</span
                          ></template
                        >
                      </base-radio>
                      <base-radio
                        name="radio-check"
                        radioId="radio-sort2"
                        class="radio--check"
                      >
                        <template v-slot:label
                          ><span>최신등록순</span></template
                        >
                      </base-radio>
                      <base-radio
                        name="radio-check"
                        radioId="radio-sort3"
                        class="radio--check"
                      >
                        <template v-slot:label><span>조회순</span></template>
                      </base-radio>
                      <base-radio
                        name="radio-check"
                        radioId="radio-sort4"
                        class="radio--check"
                      >
                        <template v-slot:label
                          ><span>다운로드순</span></template
                        >
                      </base-radio>
                    </div>
                    <!-- select -->
                    <base-select class="select w-107">
                      <template v-slot:title>
                        <span class="select-selector__title">20개씩</span>
                      </template>
                      <template v-slot:list>
                        <li class="select-container__item">
                          <button
                            class="select-container__button"
                            type="button"
                            role="option"
                          >
                            <span class="select-container__text">12개씩</span>
                          </button>
                        </li>
                        <li class="select-container__item">
                          <button
                            class="select-container__button"
                            type="button"
                            role="option"
                          >
                            <span class="select-container__text">20개씩</span>
                          </button>
                        </li>
                        <li class="select-container__item">
                          <button
                            class="select-container__button"
                            type="button"
                            role="option"
                          >
                            <span class="select-container__text">40개씩</span>
                          </button>
                        </li>
                      </template>
                    </base-select>
                  </div>
                </div>
              </div>
              <!-- <div class="list-head__options-view">
                <div class="radios radios--toggle">
                  <base-radio name="radio-test-icon" radioId="radio1" class="radio--icon" checked>
                    <template v-slot:label>
                      <svg-icon name="list_katech" class="svg-icon" />
                      <span class="hidden">목록형</span>
                    </template>
                  </base-radio>
                  <base-radio name="radio-test-icon" radioId="radio2" class="radio--icon">
                    <template v-slot:label>
                      <svg-icon name="list_card_katech" class="svg-icon" />
                      <span class="hidden">카드형</span>
                    </template>
                  </base-radio>
                </div>
              </div> 2022-06-16 DEL : KT는 카드형이 없음 -->
            </div>
          </div>
          <div>
            <!-- 검색된 목록 리스트 -->
            <!-- TODO: 실제 search-list 연동 필요 -->
            <!-- <search-list :list="contents"></search-list> -->
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Index",
  layout: "kt/kt",
  computed: {
    ...mapGetters({
      contents: "kt/keyword-search/contents",
      CONSTANTS: "defaults/constants/CONSTANTS",
      keyword: "kt/keyword-search/searchKeyword"
    })
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
    SearchResultBox
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
      paginationKey: "ktFullSearchPagination"
    };
  },
  methods: {
    ...mapActions("kt/keyword-search", ["getContents", "setSearchKeyword"]),
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
  created() {}
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
