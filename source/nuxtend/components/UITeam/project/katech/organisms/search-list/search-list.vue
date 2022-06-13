<template lang="html">
  <!--  검색 리스트 - 리스트형 / 카드형 -->
  <ul class="data-box-list">
    <li class="data-box" v-for="(item, index) in contents" :key="index">
      <a href="#" class="data-box__link">
        <div class="data-box__information">
          <div class="data-box__top-content">
            <div class="badges">
              <!-- 제공기관 로고 (카드형일때만 보임) -->
              <div class="badge--provider-logo">
                <img src="~@/assets/style-product/images/common/provider_logo01.png" alt="제공기관"><!-- 로고 있는경우 로고 이미지 출력 -->
                <!-- <span>국토교통부</span><!--로고 없는 경우 제공기관명 텍스트 출력-->
              </div>
              <!-- // 제공기관 로고 -->
              <base-badge class="badge--w-gray">
                <span class="badge__label">내부</span>
              </base-badge>
              <base-badge class="badge--w-primary badge--provider">
                <span class="badge__label">국토교통부</span>
              </base-badge>
              <base-badge class="badge--w-primary">
                <span class="badge__label">자동차부품</span>
              </base-badge>
            </div>
            <div class="data-options">
              <base-checkbox class="checkbox--favorite" name="myFavoriteData" checkbox-id="data-box__check-myfavoritedata">
                <template v-slot:label>관심데이터 추가</template>
              </base-checkbox>
            </div>
            
          </div>
          <div class="data-box__content">
            
            <strong class="data-box__title">
              {{ item.title }}<mark>결빙사고</mark> 다발지역 <!-- 검색어에 mark 태그 적용 -->
            </strong>
            <div class="data-filetype">
              <div class="badge--filetype-01"><span class="badge__label">CSV</span></div>
              <div class="badge--filetype-02"><span class="badge__label">XML</span></div>
              <div class="badge--filetype-03"><span class="badge__label">JSON</span></div>
            </div>
            
          </div>
          <div>
            <p class="data-box__description">
              {{ item.content }}
            </p>
          </div>
          <div class="data-box__bottom-content">
            <div class="data-box__details">
              <div class="tags">
                <base-tag class="tag">#결빙사고</base-tag>
                <base-tag class="tag">#사고다발지역</base-tag>
                <base-tag class="tag">#교통체증</base-tag>
                <base-tag class="tag">#대중교통</base-tag>
                <base-tag class="tag">#자전거</base-tag>  
              </div>
                
              <div class="data-box__details-group">
                <dl>
                  <dt><span>수정일</span></dt>
                  <dd>2022-05-21</dd>
                  <dt><span>조회</span></dt>
                  <dd>1,500</dd>
                </dl>
              </div>
            </div>
          </div>
          
        </div>
      </a>
    </li>
  </ul>
</template>

<script type="text/javascript">
import BaseBadge from "@atoms/base-badge/base-badge.vue";
import BaseButton from "@atoms/base-button/base-button.vue";
import BaseTag from "@atoms/base-tag/base-tag.vue";
import BaseCheckbox from "@atoms/base-checkbox/base-checkbox.vue";

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
  components: {BaseBadge, BaseButton, BaseTag, BaseCheckbox},
  watch: {},
  methods: {}
};
</script>

<style lang="scss">
@import "./search-list";
</style>
