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
          @search="searchBtnClick"
          :searchKeyword="searchKeyword"
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
        <template v-slot:resultSuccessTrueText>
          <strong>'{{ searchKeyword }}'</strong>에 대한 검색결과 총
          <strong>{{ numOfSearchResult }}</strong> 건이 검색되었습니다.
        </template>
      </search-result-box>
      <div class="contents-top__detail">
        <base-button
          class="detail-button-default"
          :class="isDetailOpen ? 'detail-button-open' : ''"
          @click="toggleDetail"
          title="상세검색"
          >상세검색</base-button
        >

        <!-- TODO : 태그 선택 창 하다가 멈춤 - 유경책임이 진행하고 있는 basic-tag-list랑 겹침 -->
        <!--        <organisms-filter-result-->
        <!--          :filter-obj="filterObj"-->
        <!--          :tree-obj="treeObj"-->
        <!--          :is-detail-open="isDetailOpen"-->
        <!--        />-->
        <ul :class="isDetailOpen ? 'detail_open' : ''">
          <li>
            <h4>카테고리</h4>
            <div class="search-detail__items">
              <a href="#none">
                미래자동차 핵심기술
                <base-button class="detail__delete-button" title="삭제">
                  <svg-icon
                    class="svg-icon"
                    name="close"
                    aria-hidden="true"
                  ></svg-icon>
                </base-button>
              </a>
              <a href="#none">
                자동차제조
                <base-button class="detail__delete-button" title="삭제">
                  <svg-icon
                    class="svg-icon"
                    name="close"
                    aria-hidden="true"
                  ></svg-icon>
                </base-button>
              </a>
              <a href="#none">
                화물운송
                <base-button class="detail__delete-button" title="삭제">
                  <svg-icon
                    class="svg-icon"
                    name="close"
                    aria-hidden="true"
                  ></svg-icon>
                </base-button>
              </a>
              <a href="#none">
                자율주행자동차
                <base-button class="detail__delete-button" title="삭제">
                  <svg-icon
                    class="svg-icon"
                    name="close"
                    aria-hidden="true"
                  ></svg-icon>
                </base-button>
              </a>
            </div>
          </li>
          <li>
            <h4>제공기관</h4>
            <div class="search-detail__items">
              <a href="#none">
                국토교통부
                <base-button class="detail__delete-button" title="삭제">
                  <svg-icon
                    class="svg-icon"
                    name="close"
                    aria-hidden="true"
                  ></svg-icon>
                </base-button>
              </a>
              <a href="#none">
                도로교통공단
                <base-button class="detail__delete-button" title="삭제">
                  <svg-icon
                    class="svg-icon"
                    name="close"
                    aria-hidden="true"
                  ></svg-icon>
                </base-button>
              </a>
              <a href="#none">
                행정안전부
                <base-button class="detail__delete-button" title="삭제">
                  <svg-icon
                    class="svg-icon"
                    name="close"
                    aria-hidden="true"
                  ></svg-icon>
                </base-button>
              </a>
            </div>
          </li>
          <li>
            <h4>데이터 타입</h4>
            <div class="search-detail__items">
              <a href="#none">
                데이터셋(파일)
                <base-button class="detail__delete-button" title="삭제">
                  <svg-icon
                    class="svg-icon"
                    name="close"
                    aria-hidden="true"
                  ></svg-icon>
                </base-button>
              </a>
              <a href="#none">
                링크
                <base-button class="detail__delete-button" title="삭제">
                  <svg-icon
                    class="svg-icon"
                    name="close"
                    aria-hidden="true"
                  ></svg-icon>
                </base-button>
              </a>
            </div>
          </li>
          <li>
            <h4>키워드</h4>
            <div class="search-detail__items">
              <a href="#none">
                EV
                <base-button class="detail__delete-button" title="삭제">
                  <svg-icon
                    class="svg-icon"
                    name="close"
                    aria-hidden="true"
                  ></svg-icon>
                </base-button>
              </a>
              <a href="#none">
                견적
                <base-button class="detail__delete-button" title="삭제">
                  <svg-icon
                    class="svg-icon"
                    name="close"
                    aria-hidden="true"
                  ></svg-icon>
                </base-button>
              </a>
              <a href="#none">
                부품
                <base-button class="detail__delete-button" title="삭제">
                  <svg-icon
                    class="svg-icon"
                    name="close"
                    aria-hidden="true"
                  ></svg-icon>
                </base-button>
              </a>
              <a href="#none">
                정비
                <base-button class="detail__delete-button" title="삭제">
                  <svg-icon
                    class="svg-icon"
                    name="close"
                    aria-hidden="true"
                  ></svg-icon>
                </base-button>
              </a>
              <a href="#none">
                데이터
                <base-button class="detail__delete-button" title="삭제">
                  <svg-icon
                    class="svg-icon"
                    name="close"
                    aria-hidden="true"
                  ></svg-icon>
                </base-button>
              </a>
            </div>
          </li>
          <li>
            <base-button class="detail__reset-button"
              >검색조건 초기화</base-button
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="contents">
      <!--사이드메뉴-->
      <aside>
        <h3 class="hidden">검색필터 상세선택</h3>
        <!--        높이 임시로 넣었습니다.-->
        <div class="aside__category" style="height: 1160px">
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
        <div
          class="aside__provider"
          :class="isProviderExpand ? 'aside__provider-expand' : ''"
        >
          <h4 class="aside__title">제공기관</h4>
          <base-button
            class="aside__button-down"
            :class="isProviderExpand ? 'aside__button-up' : ''"
            @click="toggleProviderExpand"
          ></base-button>
          <ul>
            <li>
              <base-checkbox
                class="checkbox--aside"
                name="searchFilter"
                checkbox-id="check-category01"
              >
                <template v-slot:label>국토교통부</template>
              </base-checkbox>
            </li>
            <li>
              <base-checkbox
                class="checkbox--aside"
                name="searchFilter"
                checkbox-id="check-category02"
              >
                <template v-slot:label>도로교통공단</template>
              </base-checkbox>
            </li>
            <li>
              <base-checkbox
                class="checkbox--aside"
                name="searchFilter"
                checkbox-id="check-category03"
              >
                <template v-slot:label>행정안전부</template>
              </base-checkbox>
            </li>
            <li>
              <base-checkbox
                class="checkbox--aside"
                name="searchFilter"
                checkbox-id="check-category04"
              >
                <template v-slot:label>농림축산부</template>
              </base-checkbox>
            </li>
            <li>
              <base-checkbox
                class="checkbox--aside"
                name="searchFilter"
                checkbox-id="check-category05"
              >
                <template v-slot:label>보건복지부</template>
              </base-checkbox>
            </li>
            <li>
              <base-checkbox
                class="checkbox--aside"
                name="searchFilter"
                checkbox-id="check-category01"
              >
                <template v-slot:label>법무부</template>
              </base-checkbox>
            </li>
            <li>
              <base-checkbox
                class="checkbox--aside"
                name="searchFilter"
                checkbox-id="check-category01"
              >
                <template v-slot:label>지방자치센터</template>
              </base-checkbox>
            </li>
            <li>
              <base-checkbox
                class="checkbox--aside"
                name="searchFilter"
                checkbox-id="check-category01"
              >
                <template v-slot:label>전국화물협동조합</template>
              </base-checkbox>
            </li>
            <li>
              <base-checkbox
                class="checkbox--aside"
                name="searchFilter"
                checkbox-id="check-category01"
              >
                <template v-slot:label>국토교통부</template>
              </base-checkbox>
            </li>
            <li>
              <base-checkbox
                class="checkbox--aside"
                name="searchFilter"
                checkbox-id="check-category01"
              >
                <template v-slot:label>도로교통공단</template>
              </base-checkbox>
            </li>
          </ul>
        </div>
        <div class="aside__type">
          <h4 class="aside__title">데이터타입</h4>
          <div class="aside__type-default">
            <ul>
              <li>
                <base-checkbox
                  class="checkbox--aside"
                  name="searchFilter"
                  checkbox-id="check-category01"
                >
                  <template v-slot:label>데이터셋(파일)</template>
                </base-checkbox>
              </li>
              <li>
                <base-checkbox
                  class="checkbox--aside"
                  name="searchFilter"
                  checkbox-id="check-category01"
                >
                  <template v-slot:label>링크</template>
                </base-checkbox>
              </li>
            </ul>
          </div>
        </div>
        <div class="aside__keyword">
          <h4 class="aside__title">키워드</h4>
          <div class="aside__keyword-default">
            <ul>
              <li>
                <base-checkbox
                  class="checkbox--aside"
                  name="searchFilter"
                  checkbox-id="check-category01"
                >
                  <template v-slot:label>EV</template>
                </base-checkbox>
              </li>
              <li>
                <base-checkbox
                  class="checkbox--aside"
                  name="searchFilter"
                  checkbox-id="check-category01"
                >
                  <template v-slot:label>견적</template>
                </base-checkbox>
              </li>
              <li>
                <base-checkbox
                  class="checkbox--aside"
                  name="searchFilter"
                  checkbox-id="check-category01"
                >
                  <template v-slot:label>부품</template>
                </base-checkbox>
              </li>
              <li>
                <base-checkbox
                  class="checkbox--aside"
                  name="searchFilter"
                  checkbox-id="check-category01"
                >
                  <template v-slot:label>정비</template>
                </base-checkbox>
              </li>
              <li>
                <base-checkbox
                  class="checkbox--aside"
                  name="searchFilter"
                  checkbox-id="check-category01"
                >
                  <template v-slot:label>데이터</template>
                </base-checkbox>
              </li>
            </ul>
          </div>
        </div>
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
            <h4>전체<span>164</span></h4>
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
            <search-list :list="contents"></search-list>
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
import BaseButton from "@component/project/katech/atoms/base-button/base-button";
import BaseCheckbox from "@component/project/katech/atoms/base-checkbox/base-checkbox";
import GroupTab from "@component/aiPlatform/katech/molecules/group-tab/group-tab";
import GroupPagination from "@component/aiPlatform/katech/molecules/group-pagination/group-pagination";
import GroupBreadcrumb from "@component/project/katech/molecules/group-breadcrumb/group-breadcrumb";
import GroupSearchFilter from "@component/aiPlatform/katech/molecules/group-search-filter/group-search-filter";
import SearchList from "@component/project/katech/organisms/search-list/search-list.vue";
import SearchInputField from "@component/aiPlatform/katech/organisms/search-input-field/search-input-field.vue";
import OrganismsFilterResult from "@component/aiPlatform/katech/organisms/filter-result";
import SearchResultBox from "@component/aiPlatform/katech/atoms/search-result-box";
import BasicTagList from "@component/aiPlatform/katech/atoms/basic-tag-list";
import BasicOption from "@component/aiPlatform/katech/atoms/basic-option";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Index",
  computed: {
    ...mapGetters({
      contents: "meta/keyword-search/contents",
      CONSTANTS: "defaults/constants/CONSTANTS"
    })
  },
  components: {
    BaseButton,
    BaseCheckbox,
    GroupPagination,
    GroupBreadcrumb,
    GroupSearchFilter,
    GroupTab,
    SearchList,
    SearchInputField,
    OrganismsFilterResult,
    SearchResultBox,
    BasicTagList,
    BasicOption
  },
  data() {
    return {
      isDetailOpen: true,
      isCategoryExpand: false,
      isProviderExpand: false,
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
          NODE_NM: "NODE_NM", // node title
          NODE_ID: "NODE_ID", // node key
          PRNTS_ID: "PRNTS_ID" // parent key
        }
      },
      searchKeyword: "",
      numOfSearchResult: null,
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
      ]
    };
  },
  methods: {
    ...mapActions("meta/keyword-search", ["getContents"]),
    toggleDetail: function () {
      this.isDetailOpen = !this.isDetailOpen;
    },
    toggleCategoryExpand: function () {
      this.isCategoryExpand = !this.isCategoryExpand;
    },
    toggleProviderExpand: function () {
      this.isProviderExpand = !this.isProviderExpand;
    },
    toggleListCard: function () {
      this.isListCard = !this.isListCard;
    },
    searchBtnClick(inputData) {
      this.searchKeyword = inputData.trim();
      this.search();
    },
    search() {
      this.numOfSearchResult = 135;

      if (this.searchKeyword.trim() === "") {
        this.showSearchResultBox = false;
        this.searchResultSuccess = false;
        return;
      }

      this.showSearchResultBox = true;
      this.searchResultSuccess = true;
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
        paginationKey: this.paginationKey
      });
    },
    sortOptionChange(option) {
      console.log("sort option: " + option);
    },
    viewOptionChange(option) {
      console.log("view option: " + option);
    }
  },
  mounted() {
    this.getGridData();
  }
};
</script>

<style lang="scss" scoped>
@import "pages/portal/ui/meta/search/fullSearch/index";
</style>
