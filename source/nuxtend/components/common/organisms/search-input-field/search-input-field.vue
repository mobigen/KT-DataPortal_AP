<template lang="html">
  <div class="search-input-field">
    <div class="search-input-field__inner">
      <form action="">
        <fieldset>
          <legend class="hidden">검색 정보입력</legend>
          <div class="search-input-field__select">
            <!--셀렉트박스 : 검색조건 // 기본값 : 제목 + 내용 -->
            <div class="select" :class="isSearchselectOpen ? 'select--open' : ''" @click="isSearchselectOpen = !isSearchselectOpen">
              <div class="select-selector -md">
                <button class="select-selector__button -md">
                  <span class="select-selector__title">제목 + 내용</span>
                  <svg-icon
                    class="svg-icon select-selector__icon"
                    name="chevron-down-medium"
                    aria-hidden="true"
                  ></svg-icon>
                </button>
              </div>
              <div class="select-container">
                <ul class="select-container__list">
                  <li class="select-container__item">
                    <button class="select-container__button -md" type="button">제목 + 내용</button>
                  </li>
                  <li class="select-container__item">
                    <button class="select-container__button -md" type="button">제목</button>
                  </li>
                  <li class="select-container__item">
                    <button class="select-container__button -md" type="button">내용</button>
                  </li>
                </ul>
              </div>
            </div>
            <!-- // 셀렉트박스 : 파일유형 -->
          </div>
          <div class="search-input-field__search">
            <group-search
              :searchKeyword="searchKeyword"
              :useRecentSearch="useRecentSearch"
              @search="search"
            ></group-search>
          </div>
          <div v-show="useInnerSearch" class="search-input-field__filter">
            <base-checkbox
              name="filter-check"
              checkbox-id="'filter-check"
              @changeData="filterCheck"
            >
              <template v-slot:label> 결과 내 재검색 </template>
            </base-checkbox>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script type="text/javascript">
import GroupSearch from "@common/molecules/group-search/group-search";
import BaseButton from "@common/atoms/base-button/base-button";
import BaseCheckbox from "@common/atoms/base-checkbox/base-checkbox";
export default {
  name: "SearchInputField",
  extends: {},
  props: {
    searchKeyword: {
      type: String,
      require: false
    },
    useInnerSearch: {
      type: Boolean,
      require: false,
      default: false
    },
    useRecentSearch: {
      type: Boolean,
      require: false,
      default: false
    }
  },
  data() {
    return {
      isSearchselectOpen: false
    };
  },
  computed: {},
  components: { BaseCheckbox, BaseButton, GroupSearch },
  watch: {},
  methods: {
    search(inputData) {
      this.$emit("search", inputData);
    },
    filterCheck(bool, name) {
      this.$emit("filterCheck", { bool, name });
    }
  },
  beforeCreate() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "search-input-field";
</style>
