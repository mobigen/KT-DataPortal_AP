<template>
  <!--  최소 단위인 Loader Element Component-->
  <div class="loader"
       :class="[sizeClass]"
       role="alert"
       aria-live="assertive"
  >
    <div class="loader__spinner"></div>
  </div>
</template>

<script>
export default {
  name: "BaseLoader",
  props: {
    /**
     * loader 사이즈 (sm, md, lg)
     */
    size: {
      type: String,
      default: 'loader--md'
    }
  },
  computed: {
    sizeClass() {
      // size 유무에 따라 클래스 분기
      return this.size ? `loader--${this.size}` : "";
    }
  },
  methods: {
  }
};
</script>

<style scoped>
</style>
