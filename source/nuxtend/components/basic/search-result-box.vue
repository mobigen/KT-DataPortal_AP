<template lang="html">
  <div id="searchResultBox">
    <template v-if="searchResultSuccess">
      <p>
        <slot name="resultSuccessTrueText"></slot>
      </p>
    </template>
    <template v-else>
      <p>
        <slot name="resultSuccessFalseText"></slot>
      </p>
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

<style lang="scss">
#searchResultBox {
  span {
    color: red;
  }
}
</style>
