<template lang="html">
  <div>
    <h5>마이페이지</h5>
    <nuxt-child />
  </div>
</template>

<script type="text/javascript">
export default {
  name: "app-my",
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
