<template>
  <!-- type="submit" 인 경우, id가 필요 -->
  <button
    class="button"
    :id="submitId"
    :class="[buttonTypeClass, themeClass, subThemeClass, sizeClass]"
    :disabled="disabled"
    :title="title"
    :type="type"
    v-show="submitId"
  >
    <slot></slot>
  </button>
  <!-- 그 외 타입은 id 불필요 -->
  <button
    class="button"
    :class="[buttonTypeClass, themeClass, subThemeClass, sizeClass]"
    :disabled="disabled"
    :type="type"
    @click="handleClick($event)"
    @mousedown="mouseDown($event)"
    :title="title"
    v-else
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    /**
     * 버튼 유형 (button, submit)
     */
    type: {
      type: String,
      default: "button"
    },
    /**
     * 버튼 UI 유형 (button, icon)
     */
    buttonType: {
      type: String
    },

    /**
     * 버튼 테마 (primary, second, support, negative ...)
     */
    theme: {
      type: String,
      default: "tertiary"
    },

    /**
     * 버튼 서브 테마
     */
    subTheme: {
      type: String,
      default: ""
    },

    /**
     * 버튼 사이즈 (sm, md, lg)
     */
    size: {
      type: String,
      default: "md"
    },

    disabled: {
      type: Boolean,
      default: false
    },

    title: {
      type: String,
      default: ""
    },

    submitId: {
      type: String,
      default: null
    }
  },
  computed: {
    buttonTypeClass() {
      // type 값의 유무로 button인지 icon-button인지 판별
      return this.buttonType ? `button--${this.buttonType}` : "";
    },
    themeClass() {
      // theme가 있을 경우 값 셋팅
      return this.theme ? `button--${this.theme}` : "";
    },
    subThemeClass() {
      // theme가 있을 경우 값 셋팅
      return this.subTheme ? `button--${this.subTheme}` : "";
    },
    sizeClass() {
      // size 유무에 따라 클래스 분기
      return this.size ? `button--${this.size}` : "";
    }
  },
  methods: {
    handleClick($event) {
      this.$emit("click", $event);
    },
    mouseDown($event) {
      this.$emit("mousedown", $event);
    }
  }
};
</script>

<style lang="scss">
 @import "base-button.scss";
</style>
