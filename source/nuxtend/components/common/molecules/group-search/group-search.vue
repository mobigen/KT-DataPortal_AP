<template lang="html">
  <div class="text-input-group text-input-group--lg">
    <label for="inp-search-lg-01" class="hidden">통합검색</label>
    <base-input
      id="inp-search-lg-01"
      placeholder="검색어를 입력하세요"
      :inputData="searchKeyword"
      @input="search"
      @enterEvent="$emit('search', inputData)"
      @keydown="isComboBoxShow = false"
    ></base-input>
    <base-button class="text-input-group__clear-button" title="초기화">
      <svg-icon class="svg-icon" name="close" aria-hidden="true"></svg-icon>
    </base-button>
    <base-button
      title="검색"
      class="text-input-group__search-button"
      @click="$emit('search', inputData)"
      ><svg-icon
        class="svg-icon"
        name="search-wh-large"
        aria-hidden="true"
      ></svg-icon
    ></base-button>
    <!--    콤보박스 오픈 시 combo-box--open 추가-->
    <div
      v-if="useRecentSearch"
      class="combo-box"
      :class="isComboBoxShow ? 'combo-box--open' : ''"
    >
      <!-- 자동완성 : input 입력 시 자동완성 open 노출 최대 10개 -->
      <strong class="hidden">자동완성 검색어</strong>
      <ul class="autocomplete">
        <li class="autocomplete__item" value="1">
          <a
            href=""
            class="autocomplete__link"
            target="_blank"
            title="바로검색하기"
            ><strong class="autocomplete__title">여행</strong></a
          >
        </li>
        <li class="autocomplete__item" value="1">
          <a
            href=""
            class="autocomplete__link"
            target="_blank"
            title="바로검색하기"
            ><strong class="autocomplete__title">여행</strong>가는 달</a
          >
        </li>
        <li class="autocomplete__item" value="1">
          <a
            href=""
            class="autocomplete__link"
            target="_blank"
            title="바로검색하기"
            ><strong class="autocomplete__title">여행</strong>사</a
          >
        </li>
        <li class="autocomplete__item" value="1">
          <a
            href=""
            class="autocomplete__link"
            target="_blank"
            title="바로검색하기"
            >기간<strong class="autocomplete__title">여행</strong>플랫폼<strong
              class="autocomplete__title"
            ></strong
          ></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
import BaseButton from "@common/atoms/base-button/base-button.vue";
import BaseInput from "@common/atoms/base-input/base-input";
import BaseTag from "@common/atoms/base-tag/base-tag";

export default {
  name: "GroupSearch",
  props: {
    searchKeyword: {
      type: String,
      require: false
    },
    useRecentSearch: {
      type: Boolean,
      require: false,
      default: false
    }
  },
  components: {
    BaseTag,
    BaseInput,
    BaseButton
  },
  data() {
    return {
      isComboBoxShow: false,
      inputData: ""
    };
  },
  methods: {
    search({ input }) {
      this.inputData = input;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./group-search";
</style>
