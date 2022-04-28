<template>
  <!--  최소 단위인 Badge Element Component-->
  <div
    class="badge"
    :class="[themeClass, sizeClass]"
    :title="title"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BaseBadge",
  props: {
    /**
     * badge 테마 (red, cyan, teal, green ...)
     */
    theme: {
      type: String,
    },
    /**
     * badge 사이즈 (sm, md, lg)
     */
    size: {
      type: String,
    },
    title: {
      type: String,
      default: ""
    }
  },
  computed: {
    themeClass() {
      // theme가 있을 경우 값 셋팅
      return this.theme ? `badge--${this.theme}` : "";
    },
    sizeClass() {
      // size 유무에 따라 클래스 분기
      return this.size ? `badge--${this.size}` : "";
    }
  },
  methods: {
  }
};
</script>

<style>
</style>
