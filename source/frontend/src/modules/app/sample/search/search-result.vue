<template lang="html">
  <div class="search-results">
    <strong class="search-results__text">
      검색어<em class="text-emphasis color-emphasis">'키워드'</em>에 대한 총
      <em class="text-emphasis">1,265,082건</em>
      의 검색 결과를 찾았습니다.
    </strong>
    <div class="search-results__tab tab tab--container tab--horizontal">
      <ul class="tab__bar" role="tablist">
        <li class="tab__item">
          <button
            type="button"
            class="tab__button"
            role="tab"
            aria-selected="false"
          >
            <span class="tab__button-text">전체</span>
          </button>
        </li>
        <li class="tab__item tab__item--selected" aria-selected="true">
          <button
            type="button"
            class="tab__button"
            role="tab"
            aria-selected="false"
          >
            <span class="tab__button-text">뉴스기사</span>
          </button>
        </li>
        <li class="tab__item">
          <button
            type="button"
            class="tab__button"
            role="tab"
            aria-selected="false"
          >
            <span class="tab__button-text">뉴스댓글</span>
          </button>
        </li>
        <li class="tab__item">
          <button
            type="button"
            class="tab__button"
            role="tab"
            aria-selected="false"
          >
            <span class="tab__button-text">카페 게시글</span>
          </button>
        </li>
        <li class="tab__item">
          <button
            type="button"
            class="tab__button"
            role="tab"
            aria-selected="false"
          >
            <span class="tab__button-text">카페댓글</span>
          </button>
        </li>
        <li class="tab__item tab__item--disabled">
          <button
            type="button"
            class="tab__button"
            role="tab"
            aria-selected="false"
          >
            <span class="tab__button-text">블로그</span>
          </button>
        </li>
      </ul>
    </div>
    <div class="search-results__content">
      <div class="article">
        <div class="article__topic">
          <strong class="article__topic-title"> 뉴스 기사 </strong>
          <span class="article__topic-text"> (642,743) </span>
          <div class="article__controller">
            <button class="button button--link" type="button">
              <span class="button__text">정확도순</span>
            </button>
            <span class="division-line" aria-hidden="true"></span>
            <button class="button button--link" type="button">
              <span class="button__text">최신순</span>
            </button>
          </div>
          <div class="article__controller">
            <button class="button button--tertiary" type="button">
              <icon
                class="svg-icon"
                data="@icon/refresh.svg"
                aria-hidden="true"
              ></icon>
              <span class="button__text">새로고침</span>
            </button>
            <button class="button button--support" type="button">
              <icon
                class="svg-icon"
                data="@icon/dual-axis.svg"
                aria-hidden="true"
              ></icon>
              <span class="button__text">평판분석</span>
            </button>
            <div
              class="select"
              :class="isSelectOpen ? 'select--open' : ''"
              @click="isSelectOpen = !isSelectOpen"
              role="select"
              aria-expanded="false"
            >
              <div class="select-selector">
                <button
                  class="select-selector__button"
                  type="button"
                  title="보기 방식 선택"
                >
                  <span class="select-selector__title">10개씩 보기</span>
                  <icon
                    class="svg-icon select-selector__icon"
                    data="@icon/chevron-down-medium.svg"
                    aria-hidden="true"
                  ></icon>
                </button>
              </div>
              <div class="select-container">
                <ul class="select-container__list">
                  <li class="select-container__item">
                    <button
                      class="select-container__button"
                      type="button"
                      role="option"
                    >
                      <span class="select-container__text">Sample Select</span>
                    </button>
                  </li>
                  <li class="select-container__item">
                    <button
                      class="select-container__button"
                      type="button"
                      role="option"
                    >
                      <span class="select-container__text">Sample Select</span>
                    </button>
                  </li>
                  <li class="select-container__item">
                    <button
                      class="select-container__button"
                      type="button"
                      role="option"
                    >
                      <span class="select-container__text">Sample Select</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <search-result-article></search-result-article>
        <div class="article__view-more">
          <button class="button button--underline" type="button">
            <span class="button__text">더보기</span>
            <icon
              class="svg-icon"
              data="@icon/next.svg"
              aria-hidden="true"
            ></icon>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import SearchResultArticle from "./search-result-article.vue";

export default {
  name: "SearchResult",
  extends: {},
  props: {
    bar: {},
    foo: {},
    fooBar: {}
  },
  data() {
    return {
      isSelectOpen: false
    };
  },
  computed: {},
  components: {
    SearchResultArticle
  },
  watch: {},
  methods: {}
};
</script>

<style lang="scss">
@import "./search-result";
</style>
