<template lang="html">
  <div class="breadcrumb__wrap">
    <div class="breadcrumb__inner">
      <div class="breadcrumb__list">
        <a href="#" class="breadcrumb__item breadcrumb__item--home">홈</a>
        <a href="#" class="breadcrumb__item" v-for="(item, index) in contents" :key="index">{{ item.title }}</a>
      </div>
      <!-- 페이지 공유 링크 : 상세정보페이지에서만 공유 링크 활성 -->
      <div class="breadcrumb__link">
        <base-button class="breadcrumb__button-url">URL 복사</base-button>
      </div>
      <!-- // 페이지 공유 링크 -->
    </div>
  </div>
</template>
<script type="text/javascript">
import BaseCheckbox from "@common/atoms/base-checkbox/base-checkbox";
import BaseButton from "@common/atoms/base-button/base-button";
import { mapGetters } from "vuex";

export default {
  name: "GroupBreadcrumb",
  extends: {},
  props: {
    list: {
      type: Array,
      default: function () {
        return [
          { key: "1", title: "데이터 검색" },
          { key: "2", title: "데이터 통합검색" }
        ];
      }
    }
  },
  computed: {
    contents: function () {
      return this.list;
    }
  },
  components: {BaseButton, BaseCheckbox},
  watch: {},
  data() {
    return {
      isShareOpen: false
    }
  },
  methods: {
    onClickItem(item) {
      this.$emit("select", item);
    },
    toggleShare: function() {
      this.isShareOpen = !this.isShareOpen;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./group-breadcrumb.scss";
</style>
