<template lang="html">
  <div>
    <h5>ex) search bar와 search 버튼이 함께 되어있는 component</h5>
    <input type="text" />

    <!-- text button or icon , or button component -->
    <button value="search"></button>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "searchbar-input-btn",
  extends: {},
  props: {
    bar: {},
    foo: {},
    fooBar: {}
  },
  data() {
    return {};
  },
  computed: {},
  components: {},
  watch: {},
  methods: {},
  created() {}
};
</script>

<style lang="scss">
// @import ""
</style>
