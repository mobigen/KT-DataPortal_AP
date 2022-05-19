<template lang="html">
  <div>
    <h5>마이페이지</h5>
    <p>추후에 users쪽으로 메뉴 옮김.</p>
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
