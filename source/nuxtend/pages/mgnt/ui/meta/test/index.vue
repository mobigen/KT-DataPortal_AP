<template lang="html">
  <div>
    <basic-button
      buttonCss="text-button"
      :underline="false"
      :hoverColor="false"
      @click="reload"
      >viewReload</basic-button
    >
    <basic-pagination
      paging-key="fullSearchPagination"
      :paging-object="pagingObj"
    >
    </basic-pagination>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";
import BasicButton from "@component/aiPlatform/basic/basic-button.vue";
import BasicPagination from "@component/aiPlatform/basic/basic-pagination";

export default {
  name: "BasicTemplate",
  extends: {},
  props: {},
  data() {
    return {
      pagingObj: {
        visiblePages: 5
      }
    };
  },
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"])
  },
  components: { BasicButton, BasicPagination },
  watch: {},
  methods: {
    ...mapActions("meta/bizMeta", ["viewReload"]),
    ...mapActions("module/pagination", ["setTotalCount"]),
    reload() {
      this.viewReload();
    }
  },
  created() {}
};
</script>

<style lang="scss">
// @import ""
</style>
