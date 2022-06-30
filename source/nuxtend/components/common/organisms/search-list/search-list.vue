<template lang="html">
  <!--  검색 리스트 - 리스트형 / 카드형 -->
  <ul class="data-box-list">
    <li v-for="(item, index) in contents" :key="index">
      <div class="data-box">
        <div class="data-box__information">
          <div class="data-box__top-content">
            <div class="badges">
              <base-badge class="badge--outline badge--rounded">
                <span class="badge__label">모바일</span><!-- 카테고리구분 -->
              </base-badge>
              <base-badge class="badge--provider">
                <span class="badge__label">그룹사</span
                ><!-- 벤더 -->
              </base-badge>
            </div>
            <dl class="data-box__options">
              <dt>
                <svg-icon name="heart" class="svg-icon"></svg-icon>
                <span class="hidden">관심데이터등록수total</span>
              </dt>
              <dd>20</dd>
              <dt>
                <svg-icon name="eye" class="svg-icon"></svg-icon>
                <span class="hidden">조회수total</span>
              </dt>
              <dd>156</dd>
              <dt>
                <svg-icon name="download" class="svg-icon"></svg-icon>
                <span class="hidden">다운로드수total</span>
              </dt>
              <dd>34</dd>
            </dl>
          </div>
          <div class="data-box__content">
            <a href="#none" class="data-box__link">
              <strong class="data-box__title">
                {{ item.title }}<mark>서비스</mark>
                <!-- 검색어에 mark 태그 적용 -->
              </strong>
              <p class="data-box__description">
                {{ item.content }}
              </p>
            </a>
          </div>
          <div class="data-box__bottom-content">
            <div class="data-box__details">
              <div class="data-box__details-group">
                <dl>
                  <dt>수정일</dt>
                  <dd>2022-06-28</dd>
                </dl>
                <dl>
                  <dt>등록일</dt>
                  <dd>2022-06-28</dd>
                </dl>
                <dl>
                  <dt>키워드</dt>
                  <dd>
                      <div class="tags">
                        <base-tag class="tag--sm" href="#"><span class="tag__label">#트래픽</span></base-tag>
                        <base-tag class="tag--sm" href="#"><span class="tag__label">#URL</span></base-tag>
                        <base-tag class="tag--sm" href="#"><span class="tag__label">#관심</span></base-tag>
                        <base-tag class="tag--sm" href="#"><span class="tag__label">#프로파일</span></base-tag>
                      </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <!-- 오른쪽 옵션 구조 추가 -->
        <div class="data-box__buttons">
            <base-button class="button--primary">
              <span class="button__text">바로활용</span>
            </base-button>
            <base-button class="button--primary-line">
              <span class="button__text">담아두기</span>
            </base-button>
            <div class="favorite-cnt">
              <base-button class="favorite-cnt__button" :class="isToggle ? 'favorite-cnt__button--selected' : ''" @click="toggleBtn">
                <svg-icon class="svg-icon" name="heart_md" aria-hidden="true"></svg-icon>
                <span class="button__text">관심데이터</span>
              </base-button>
            </div>
          </div>
      </div>
    </li>
  </ul>
</template>

<script type="text/javascript">
import BaseBadge from "@common/atoms/base-badge/base-badge.vue";
import BaseButton from "@common/atoms/base-button/base-button";
import BaseTag from "@common/atoms/base-tag/base-tag.vue";
import BaseCheckbox from "@common/atoms/base-checkbox/base-checkbox.vue";

export default {
  name: "SearchList",
  extends: {},
  props: {
    list: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },

  computed: {
    contents: function () {
      return this.list;
    }
  },
  components: { BaseBadge, BaseButton, BaseTag, BaseCheckbox },
  watch: {},
  
  data() {
    return {
      isToggle: false
    };
  },
  methods: {
    toggleBtn: function () {
      this.isToggle = !this.isToggle;
    }
  } // 토글버튼 2022-06-24 ADD
};
</script>

<style lang="scss">
@import "./search-list";
</style>
