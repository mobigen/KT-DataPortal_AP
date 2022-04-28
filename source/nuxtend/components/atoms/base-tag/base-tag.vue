<template>
  <!--  최소 단위인 tag Component - 기능 별로 쪼개는 작업 필요-->
  <a
    class="tag"
    :class="[themeClass, sizeClass]"
    :disabled="disabled"
    :href="href"
    :target="target"
    :title="title"
  >
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: "BaseTag",
  props: {
    /**
     * tag 테마 (red, cyan, teal, green ...)
     */
    theme: {
      type: String,
    },
    /**
     * tag 사이즈 (sm, md, lg)
     */
    size: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      default: "#"
    },
    target: {
      type: String,
      default: "_blank"
    },
    title: {
      type: String,
      default: ""
    }
  },
  computed: {
    themeClass() {
      // theme가 있을 경우 값 셋팅
      return this.theme ? `tag--${this.theme}` : "";
    },
    sizeClass() {
      // size 유무에 따라 클래스 분기
      return this.size ? `tag--${this.size}` : "";
    }
  },
  methods: {
  }
};
</script>

<style scoped>
</style>
