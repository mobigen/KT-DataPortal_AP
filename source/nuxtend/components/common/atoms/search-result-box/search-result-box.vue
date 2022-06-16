<template lang="html">
  <div v-if="showSearchResultBox">
    <template v-if="searchResultSuccess">
      <slot name="resultSuccessTrueText"></slot>
    </template>
    <template v-else>
      <slot name="resultSuccessFalseText"></slot>
    </template>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "search-result-box",
  extends: {},
  data() {
    return {};
  },
  props: {
    showSearchResultBox: {
      type: Boolean,
      require: false
    },
    searchResultSuccess: {
      type: Boolean,
      require: true
    }
  },
  computed: {},
  components: {},
  watch: {},
  methods: {}
};
</script>

<style lang="scss"></style>
