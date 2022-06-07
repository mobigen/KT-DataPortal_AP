<template lang="html">
  <div class="breadcrumbs__wrap pc-only">
    <div class="breadcrumb__list">
      <a href="#" class="breadcrumbs__item breadcrumbs__item--home">홈</a>
      <a href="#" class="breadcrumbs__item" v-for="(item, index) in contents" :key="index">{{ item.title }}</a>
    </div>
    <div class="breadcrumb__link">
      <base-button class="breadcrumb__button-url">URL 복사</base-button>
      <base-button class="breadcrumb__button-share">공유하기</base-button>
      <div class="breadcrumb__tooltip-share">
        <ul>
          <li class="breadcrumb__tooltip-kakaotalk"><a href=#>카카오톡</a></li>
          <li class="breadcrumb__tooltip-cafe"><a href=#>카페</a></li>
        </ul>  
      </div>
      <base-checkbox class="checkbox--favorite" name="myFavoriteData" checkbox-id="breadcrumb__check-myfavoritedata">
        <template v-slot:label>관심데이터 추가</template>
      </base-checkbox>
    </div>
  </div>
</template>
<script type="text/javascript">
import BaseCheckbox from "@component/project/katech/atoms/base-checkbox/base-checkbox";
import BaseButton from "@component/project/katech/atoms/base-button/base-button";
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
  methods: {
    onClickItem(item) {
      this.$emit("select", item);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./group-breadcrumb.scss";
</style>
