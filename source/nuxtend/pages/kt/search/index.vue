<template>
  <div class="container">
    <div class="contents-subject"><!-- contents-subject은 나중에 따로 빠질수 있음 -->
      <h2 class="hidden">데이터</h2>
      <group-breadcrumb></group-breadcrumb>
    </div>
    <!-- contents-wrap -->
    <div class="contents-wrap">
      <!-- contents-group : subject + content-top + contents(L : R) -->
      <div class="contents-group">
        <subject></subject>
        <!-- content-top : 데이터 검색/ 상세-->
        <div class="content-top">
          <!-- contents-top__search : 통합검색 -->
          <div class="contents-top__search">
            <search-input-field></search-input-field>
            <div class="contents-top__recommend">
              <!-- 추천검색어 : 검색어 입력창에 검색어 입력 없이 빈 상태일 때 추천 검색어 노출 -->
              <p>추천검색어</p>
              <div class="tags">
                <base-tag href="#"><span class="tag__label">#데이터사업</span></base-tag>
                <base-tag href="#"><span class="tag__label">#업종</span></base-tag>
                <base-tag href="#"><span class="tag__label">#콜등급</span></base-tag>
                <base-tag href="#"><span class="tag__label">#트래픽</span></base-tag>
                <base-tag href="#"><span class="tag__label">#CU</span></base-tag>
                <base-tag href="#"><span class="tag__label">#RTPO</span></base-tag>
              </div>
              <!-- // 추천검색어 -->
            </div>
          </div>
          <!-- contents-search-result : 결과값 -->
          <div class="contents-search-result">
            <p class="contents-search-result__text">
              <strong>SGI</strong>에 대한 검색결과, 총 <strong>150</strong> 건 입니다.
            </p>
          </div>
          <!-- // contents-search-result -->
          <!-- contents-top__detail : 데이터 상세검색 토글영역 -->
          <div class="contents-top__detail">
            <base-button
              class="detail-button-default"
              :class="isDetailOpen ? 'detail-button--open' : ''" @click="toggleDetail" title="상세검색">데이터 상세검색</base-button>
            <div class="contents-top__filter" :class="isDetailOpen ? 'contents-top__filter--open' : ''">
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
            </div>
            <!-- // 검색필터 상세선택 -->
            <!-- 검색 목록 -->
            <div class="data-result-wrap">
              <!--탭 -->
              <div class="tab tab--horizontal">
                <ul class="tab__bar">
                  <li
                    class="tab__item"
                    v-for="(item, index) in tabList"
                    :class="item.selected ? 'tab__item--selected' : ''"
                    :key="index"
                  >
                    <button type="button" class="tab__button" role="tab" aria-selected="false">
                      <div class="tab__button-text">
                        {{ item.title }}
                      </div>
                    </button>
                  </li>
                </ul>
              </div>
              <!--//탭 -->
              <!-- heading-group -->
              <div class="heading-group">
                <h4>전체<span>(<strong>152</strong>건)</span></h4>
                <div class="heading-group__options">
                  <!-- sort -->
                  <div class="options-sort">
                    <!-- radios -->
                    <div class="radios">
                      <span class="hidden">정렬선택</span>
                      <base-radio name="radio-check" radioId="radio-sort1" class="radio--check" checked>
                        <template v-slot:label><span class="radio-check-first">정확도순</span></template>
                      </base-radio>
                      <base-radio name="radio-check" radioId="radio-sort2" class="radio--check">
                        <template v-slot:label><span>최신등록순</span></template>
                      </base-radio>
                      <base-radio name="radio-check" radioId="radio-sort3" class="radio--check">
                        <template v-slot:label><span>조회순</span></template>
                      </base-radio>
                      <base-radio name="radio-check" radioId="radio-sort4" class="radio--check">
                        <template v-slot:label><span>다운로드순</span></template>
                      </base-radio>
                    </div>
                    <!-- select -->
                    <base-select class="select w-107">
                      <template v-slot:title>
                        <span class="select-selector__title">20개씩</span>
                      </template>
                      <template v-slot:list>
                        <li class="select-container__item">
                          <button class="select-container__button" type="button" role="option">
                            <span class="select-container__text">12개씩</span>
                          </button>
                        </li>
                        <li class="select-container__item">
                          <button class="select-container__button" type="button" role="option">
                            <span class="select-container__text">20개씩</span>
                          </button>
                        </li>
                        <li class="select-container__item">
                          <button class="select-container__button" type="button" role="option">
                            <span class="select-container__text">40개씩</span>
                          </button>
                        </li>
                      </template>
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
                  <search-list :list="contents"></search-list>
                </div>
              </div>
              <!-- // data-result -->
              <group-pagination></group-pagination>
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
import BaseTag from "@component/common/atoms/base-tag/base-tag";
import BaseSelect from "@component/common/atoms/base-select/base-select";
import BaseButton from "@component/common/atoms/base-button/base-button";
import BaseCheckbox from "@component/common/atoms/base-checkbox/base-checkbox";
import BaseSwitch from "@component/common/atoms/base-switch/base-switch";
import GroupPagination from "@component/common/molecules/group-pagination/group-pagination";
import GroupBreadcrumb from "@component/common/molecules/group-breadcrumb/group-breadcrumb";
import Subject from "@component/common/organisms/subject/subject.vue";
import GroupSearchFilter from "@component/common/molecules/group-search-filter/group-search-filter";
import SearchList from "@component/common/organisms/search-list/search-list.vue";
import SearchInputField from "@component/common/organisms/search-input-field/search-input-field.vue";
import { mapGetters } from "vuex";

export default {
  name: "Index",
  layout: "kt/kt",
  async asyncData({ store }) {
    await store.dispatch("kt/keyword-search/getContents");
  },
  computed: {
    ...mapGetters({
      contents: "kt/keyword-search/contents"
    })
  },
  components: {
    BaseRadio,
    BaseButton,
    BaseTag,
    BaseSelect,
    BaseCheckbox,
    BaseSwitch,
    GroupPagination,
    GroupBreadcrumb,
    Subject,
    GroupSearchFilter,
    SearchList,
    SearchInputField
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
      tabList: [
        { title: "데이터 컨텐츠 (308)", selected: true },
        { title: "원천 데이터 (1207)", selected: false },
        { title: "메타데이터 (3205)", selected: false }
      ]
    };
  },
  methods: {
    toggleDetail: function () {
      this.isDetailOpen = !this.isDetailOpen;
    }
  }
};

</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
