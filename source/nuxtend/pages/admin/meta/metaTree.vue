<template lang="html">
  <div>
    <div>admin meta list</div>

    <complex-tree
      :tree-rest-api="treeRestApi"
      :use-single-checkbox="true"
      :checkbox-label="checkboxLabel"
      :tree-key="treeKey"
      tree-type="ALL"
      tree-mode="EDITOR"
    >
    </complex-tree>
  </div>
</template>

<script type="text/javascript">
import complexTree from "@/components/group/complex-tree";

export default {
  name: "admin-tree",
  extends: {},
  data() {
    return {
      treeRestApi: "/api/meta/getCategoryList",
      checkboxLabel: "상위자동선택",
      treeKey: {
        nodeName: "node_name", // node title
        nodeIdText: "node_id", // node key
        parentIdText: "parent_id", // parent key
        depth: "depth" // node depth
      }
    };
  },
  props: {},
  computed: {},
  components: { complexTree },
  watch: {},
  methods: {}
};
</script>

<style lang="scss">
// @import ""
</style>
