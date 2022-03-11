<template lang="html">
  <div class="search-filter">
    <div class="search-filter__item">
      <span class="search-filter__title">
        키워드 <span class="required">*</span>
      </span>
      <div class="search-filter__form">
        <input type="text" class="text-input" placeholder="검색어를 입력하세요."/>
      </div>
      <div class="checkbox">
        <input id="check-01" type="checkbox" class="checkbox__input" value="label"/>
        <label for="check-01" class="checkbox__label">결과 내 재검색</label>
      </div>
    </div>
    <div class="search-filter__item">
      <span class="search-filter__title">
        검색 조건 <span class="required">*</span>
      </span>
      <div class="search-filter__form">
        <div class="select" :class="isSelectOpen ? 'select--open' : ''" @click="isSelectOpen = !isSelectOpen">
          <div class="select-selector">
            <button class="select-selector__button" type="button">
              <span class="select-selector__title">검색 대상</span>
              <icon class="svg-icon select-selector__icon" data="@icon/chevron-down-medium.svg"
                    aria-hidden="true"></icon>
            </button>
          </div>
          <div class="select-container">
            <ul class="select-container__list">
              <li class="select-container__item">
                <button class="select-container__button" type="button">
                  <span class="select-container__text">Sample Select</span>
                </button>
              </li>
              <li class="select-container__item">
                <button class="select-container__button" type="button">
                  <span class="select-container__text">Sample Select</span>
                </button>
              </li>
              <li class="select-container__item">
                <button class="select-container__button" type="button">
                  <span class="select-container__text">Sample Select</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="select" :class="isSelectOpen ? 'select--open' : ''" @click="isSelectOpen = !isSelectOpen">
          <div class="select-selector">
            <button class="select-selector__button" type="button">
              <span class="select-selector__title">언론사</span>
              <icon class="svg-icon select-selector__icon" data="@icon/chevron-down-medium.svg"
                    aria-hidden="true"></icon>
            </button>
          </div>
          <div class="select-container">
            <ul class="select-container__list">
              <li class="select-container__item">
                <button class="select-container__button" type="button">
                  <span class="select-container__text">Sample Select</span>
                </button>
              </li>
              <li class="select-container__item">
                <button class="select-container__button" type="button">
                  <span class="select-container__text">Sample Select</span>
                </button>
              </li>
              <li class="select-container__item">
                <button class="select-container__button" type="button">
                  <span class="select-container__text">Sample Select</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="select" :class="isSelectOpen ? 'select--open' : ''" @click="isSelectOpen = !isSelectOpen">
          <div class="select-selector">
            <button class="select-selector__button" type="button">
              <span class="select-selector__title">상세 키워드</span>
              <icon class="svg-icon select-selector__icon" data="@icon/chevron-down-medium.svg"
                    aria-hidden="true"></icon>
            </button>
          </div>
          <div class="select-container">
            <ul class="select-container__list">
              <li class="select-container__item">
                <button class="select-container__button" type="button">
                  <span class="select-container__text">Sample Select</span>
                </button>
              </li>
              <li class="select-container__item">
                <button class="select-container__button" type="button">
                  <span class="select-container__text">Sample Select</span>
                </button>
              </li>
              <li class="select-container__item">
                <button class="select-container__button" type="button">
                  <span class="select-container__text">Sample Select</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="select" :class="isSelectOpen ? 'select--open' : ''" @click="isSelectOpen = !isSelectOpen">
          <div class="select-selector">
            <button class="select-selector__button" type="button">
              <span class="select-selector__title">기간</span>
              <icon class="svg-icon select-selector__icon" data="@icon/chevron-down-medium.svg"
                    aria-hidden="true"></icon>
            </button>
          </div>
          <div class="select-container">
            <ul class="select-container__list">
              <li class="select-container__item">
                <button class="select-container__button" type="button">
                  <span class="select-container__text">Sample Select</span>
                </button>
              </li>
              <li class="select-container__item">
                <button class="select-container__button" type="button">
                  <span class="select-container__text">Sample Select</span>
                </button>
              </li>
              <li class="select-container__item">
                <button class="select-container__button" type="button">
                  <span class="select-container__text">Sample Select</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="button-group h-group">
        <button
            class="button button--tertiary"
            type="button"
        >
          <icon class="svg-icon" data="@icon/reset.svg" aria-hidden="true"></icon>
          <span class="button__text">초기화</span>
        </button>
        <button
            class="button button--primary"
            type="button"
        >
          <icon class="svg-icon" data="@icon/search.svg" aria-hidden="true"></icon>
          <span class="button__text">검색</span>
        </button>
      </div>
    </div>
    <div class="search-filter__guidance">
      <span class="required">*</span> 필수 항목
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "SearchFilter",
  extends: {},
  data() {
    return {
      isSelectOpen: false
    }
  },
  props: {
    bar: {},
    foo: {},
    fooBar: {}
  },
  computed: {},
  components: {},
  watch: {},
  methods: {}
};
</script>

<style lang="scss">
 @import "./search-filter.scss"
</style>
