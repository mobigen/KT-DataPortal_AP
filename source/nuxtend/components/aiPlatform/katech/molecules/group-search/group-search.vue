<template lang="html">
  <div class="text-input-group text-input-group--lg">
    <label for="inp-search-lg-01" class="hidden">Label</label>
    <base-input
      id="inp-search-lg-01"
      :inputData="searchKeyword"
      placeholder="검색어를 입력하세요"
      @input="search"
      @enterEvent="$emit('search', inputData)"
      @keydown="isComboBoxShow = true"
    ></base-input>
    <base-button class="text-input-group__clear-button" title="초기화">
      <svg-icon class="svg-icon" name="close" aria-hidden="true"></svg-icon>
    </base-button>
    <base-button
      title="검색"
      class="text-input-group__search-button"
      @click="$emit('search', inputData)"
      >검색</base-button
    >
    <!--    콤보박스 오픈 시 combo-box--open 추가-->
    <div class="combo-box" :class="isComboBoxShow ? 'combo-box--open' : ''">
      <div>
        <div class="combo-box__title">
          <p>최근 검색어</p>
          <base-button class="button--sm button--link">
            <span class="button__text">전체삭제</span>
          </base-button>
        </div>
        <!--      최근 검색어 : input 포커스 시 최근검색어 open -->
        <div class="recent-search">
          <a
            class="keyword"
            v-for="item in searchList"
            :key="item.num"
            href="#none"
          >
            {{ item.title }}
            <base-button class="keyword__button" title="삭제">
              <svg-icon
                class="svg-icon"
                name="close"
                aria-hidden="true"
              ></svg-icon>
            </base-button>
          </a>
        </div>
      </div>
      <!--      자동완성 : input 입력 시 자동완성 open -->
      <ul class="autocomplete">
        <li class="autocomplete__item" value="1">
          <a
            href=""
            class="autocomplete__link"
            target="_blank"
            title="바로검색하기"
            ><strong class="autocomplete__title">스</strong></a
          >
        </li>
        <li class="autocomplete__item" value="1">
          <a
            href=""
            class="autocomplete__link"
            target="_blank"
            title="바로검색하기"
            ><strong class="autocomplete__title">스</strong>마트</a
          >
        </li>
        <li class="autocomplete__item" value="1">
          <a
            href=""
            class="autocomplete__link"
            target="_blank"
            title="바로검색하기"
            ><strong class="autocomplete__title">스</strong>마트팜</a
          >
        </li>
        <li class="autocomplete__item" value="1">
          <a
            href=""
            class="autocomplete__link"
            target="_blank"
            title="바로검색하기"
            >아<strong class="autocomplete__title">스</strong>파라거<strong
              class="autocomplete__title"
              >스</strong
            ></a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
import BaseButton from "@component/UITeam/project/katech/atoms/base-button/base-button.vue";
import BaseInput from "@component/aiPlatform/katech/atoms/base-input/base-input";
import BaseTag from "@component/UITeam/project/katech/atoms/base-tag/base-tag";

export default {
  name: "GroupSearch",
  props: {
    searchKeyword: {
      type: String,
      require: false
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
      searchList: [
        { num: 0, title: "계절별 교통 증가" },
        { num: 1, title: "결빙" },
        { num: 2, title: "사고다발지역" },
        { num: 3, title: "날씨" },
        { num: 4, title: "국토교통부" },
        { num: 5, title: "결빙사고" },
        { num: 6, title: "도로교통사고" }
      ],
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
@import "./group-search.scss";
</style>
