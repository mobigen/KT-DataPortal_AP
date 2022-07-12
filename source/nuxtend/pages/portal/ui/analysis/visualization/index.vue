<template lang="html">
  <div class="contents-wrap">
    <h2 class="hidden">데이터 시각분석</h2>
    <div class="contents-subject">
      <group-breadcrumb></group-breadcrumb>
      <div class="subject">
        <h3 class="subject__title">데이터 시각분석</h3>
        <p class="subject__desc">데이터를 활용한 다양한 시각 분석 활용 사례를 제공합니다.</p>
      </div>
    </div>
    <div class="content-top">
      <div class="board-top__search">
        <search-input-field></search-input-field>
      </div>
    </div>
    <div class="contents">
      <section>
        <!--탭 -->
        <group-tab></group-tab>
        <!-- // 탭 -->
        <div class="contents__list">
          <div class="contents__list-head">
            <h4>전체<span>164</span></h4>
            <div class="list-head__options">
              <base-button class="button--tertiary button__analysis-regist" title="시각분석등록">
                <svg-icon class="svg-icon" name="analysis_katech" aria-hidden="true"></svg-icon>
                <span class="button__text">시각분석 등록</span>
              </base-button>
            </div>
          </div>
          <div>
            <!--   썸네일형 class="data-box-list--thumbnail" -->
            <search-list :list="contents" class="data-box-list--thumbnail"></search-list>
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

export default {
  name: "BasicTemplate",
  extends: {},
  props: {
    bar: {},
    foo: {},
    fooBar: {}
  },
  data() {
    return {};
  },
  computed: {},
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
  watch: {},
  methods: {},
  created() {}
};
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
