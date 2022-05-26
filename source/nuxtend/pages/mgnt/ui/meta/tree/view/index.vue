<template lang="html">
  <div>
    <div>admin meta list</div>

    <complex-tree
      :component-key="componentKey"
      :tree-rest-api="treeRestApi"
      :use-single-checkbox="true"
      :checkbox-label="checkboxLabel"
      :tree-key="treeKey"
      :tree-mode="CONSTANTS.TREE.TREE_MODE.VIEW"
      :tree-select-type="CONSTANTS.TREE.TREE_TYPE.ALL"
    >
    </complex-tree>
  </div>
</template>

<script type="text/javascript">
import complexTree from "@component/aiPlatform/group/complex-tree";
import { mapGetters } from "vuex";

export default {
  name: "admin-tree-view",
  extends: {},
  data() {
    return {
      componentKey: "metaViewKey",
      treeRestApi: "/getCategoryList",
      checkboxLabel: "상위자동선택",
      treeKey: {
        nodeName: "NODE_NM", // node title
        nodeIdText: "NODE_ID", // node key
        parentIdText: "PRNTS_ID" // parent key
      }
    };
  },
  props: {},
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"])
  },
  components: { complexTree },
  watch: {},
  methods: {}
};
</script>

<style lang="scss">
// @import ""
</style>
