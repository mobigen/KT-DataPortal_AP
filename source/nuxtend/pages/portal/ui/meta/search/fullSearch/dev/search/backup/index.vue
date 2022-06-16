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
        <search-input-field></search-input-field>
        <div class="contents-top__recommend">
          <h4>추천검색어</h4>
          <div class="tags">
            <base-tag class="tag">#결빙사고</base-tag>
            <base-tag class="tag">#사고다발지역</base-tag>
            <base-tag class="tag">#교통체증</base-tag>
            <base-tag class="tag">#대중교통</base-tag>
            <base-tag class="tag">#자전거</base-tag>
          </div>
        </div>
      </div>
      <div class="contents-search-result">
        <strong>'결빙사고'</strong>에 대한 검색결과 총 <strong>150</strong> 건이
        검색되었습니다.
      </div>
      <div class="contents-top__detail">
        <base-button
          class="detail-button-default"
          :class="isDetailOpen ? 'detail-button-open' : ''"
          @click="toggleDetail"
          title="상세검색"
          >상세검색</base-button
        >
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
            <group-search-filter></group-search-filter>
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
        <group-tab></group-tab>
        <!-- // 탭 -->
        <div class="contents__list">
          <div class="contents__list-head">
            <h4>전체<span>164</span></h4>
            <div class="list-head__options">
              <div class="list-head__options-sort">
                <div class="radios">
                  <base-radio
                    name="radio-check"
                    radioId="radio-sort1"
                    class="radio--check"
                    checked
                  >
                    <template v-slot:label
                      ><span class="radio-check-first">정확도순</span></template
                    >
                  </base-radio>
                  <base-radio
                    name="radio-check"
                    radioId="radio-sort2"
                    class="radio--check"
                  >
                    <template v-slot:label><span>수정일순</span></template>
                  </base-radio>
                  <base-radio
                    name="radio-check"
                    radioId="radio-sort3"
                    class="radio--check"
                  >
                    <template v-slot:label><span>조회순</span></template>
                  </base-radio>
                </div>
              </div>
              <div class="list-head__options-view">
                <div class="radios radios--toggle">
                  <base-radio
                    name="radio-test-icon"
                    radioId="radio1"
                    class="radio--icon"
                    checked
                  >
                    <template v-slot:label>
                      <svg-icon name="list_katech" class="svg-icon" />
                      <span class="hidden">목록형</span>
                    </template>
                  </base-radio>
                  <base-radio
                    name="radio-test-icon"
                    radioId="radio2"
                    class="radio--icon"
                  >
                    <template v-slot:label>
                      <svg-icon name="list_card_katech" class="svg-icon" />
                      <span class="hidden">카드형</span>
                    </template>
                  </base-radio>
                </div>
              </div>
            </div>
          </div>
          <div>
            <!--   카드형인 경우, data-box-list--card 클래스 추가-->
            <search-list :list="contents"></search-list>
          </div>
        </div>
        <div class="contents__pagination">
          <group-pagination></group-pagination>
        </div>
      </section>
    </div>
  </div>
</template>

<script type="text/javascript">
import BaseRadio from "@common/atoms/base-radio/base-radio";
import BaseTag from "@common/atoms/base-tag/base-tag";
import BaseButton from "@common/atoms/base-button/base-button";
import BaseCheckbox from "@common/atoms/base-checkbox/base-checkbox";
import GroupTab from "@common/molecules/group-tab/group-tab";
import GroupPagination from "@common/molecules/group-pagination/group-pagination";
import GroupBreadcrumb from "@common/molecules/group-breadcrumb/group-breadcrumb";
import GroupSearchFilter from "@common/molecules/group-search-filter/group-search-filter";
import SearchList from "@common/organisms/search-list/search-list.vue";
import SearchInputField from "@common/organisms/search-input-field/search-input-field.vue";
import { mapGetters } from "vuex";
export default {
  name: "Index",
  layout: "katech/katech",
  async asyncData({ store }) {
    await store.dispatch("meta/keyword-search/getContents");
  },
  computed: {
    ...mapGetters({
      contents: "meta/keyword-search/contents"
    })
  },
  components: {
    BaseRadio,
    BaseButton,
    BaseTag,
    BaseCheckbox,
    GroupPagination,
    GroupBreadcrumb,
    GroupSearchFilter,
    GroupTab,
    SearchList,
    SearchInputField
  },
  data() {
    return {
      isDetailOpen: false,
      isCategoryExpand: false,
      isProviderExpand: false
    };
  },
  methods: {
    toggleDetail: function () {
      this.isDetailOpen = !this.isDetailOpen;
    },
    toggleCategoryExpand: function () {
      this.isCategoryExpand = !this.isCategoryExpand;
    },
    toggleProviderExpand: function () {
      this.isProviderExpand = !this.isProviderExpand;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
