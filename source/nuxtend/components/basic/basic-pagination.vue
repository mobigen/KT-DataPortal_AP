<template lang="html">
  <div>
    <h5>pagination</h5>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";

export default {
  name: "basic-pagination",
  extends: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters("module/pagination", ["paging"])
  },
  components: {},
  watch: {},
  methods: {
    ...mapActions("module/pagination", ["setPaging"])
  },
  created() {}
};
</script>

<style lang="scss">
// @import ""
</style>
