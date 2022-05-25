<template lang="html">
  <div>
    <div>admin meta list</div>

    <complex-tree
      :component-key="componentKey"
      :tree-rest-api="treeRestApi"
      :use-single-checkbox="true"
      :checkbox-label="checkboxLabel"
      :use-tree-view-all="true"
      :tree-key="{
        [CONSTANTS.TREE.TREE_KEY.NODE_NAME]: 'node_name',
        [CONSTANTS.TREE.TREE_KEY.NODE_ID]: 'node_id',
        [CONSTANTS.TREE.TREE_KEY.PARENT_ID]: 'parent_id'
      }"
      :tree-mode="CONSTANTS.TREE.TREE_MODE.VIEW"
      :tree-select-type="CONSTANTS.TREE.TREE_TYPE.LEAF"
      :use-tree-tag="true"
    >
    </complex-tree>
  </div>
</template>

<script type="text/javascript">
import complexTree from "@component/aiPlatform/group/complex-tree";
import { mapGetters } from "vuex";

export default {
  name: "admin-tree",
  extends: {},
  data() {
    return {
      componentKey: "metaTreeKey",
      treeRestApi: "/getCategoryList",
      checkboxLabel: "상위자동선택"
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
