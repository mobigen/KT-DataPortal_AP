<template lang="html">
  <div>
    <div>admin meta list</div>
    <basic-tree
      :treeData="categoryObject"
      :nodeTitle="treeKey.nodeName"
      :nodeId="treeKey.nodeId"
      :useEditor="true"
      :useSelection="true"
      :selectedNodeList="selectedNodeList"
      @selectionChange="selectionChange"
      :selectionBtnText="['선택됨', '선택안됨']"
    ></basic-tree>

    <basic-tag
      :selectedNodeList="selectedNodeList"
      :nodeTitle="treeKey.nodeName"
      :nodeId="treeKey.nodeId"
    >
    </basic-tag>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";
import BasicTree from "@/components/basic/basic-tree.vue";
import BasicTag from "@/components/basic/basic-tag.vue";

export default {
  name: "admin-tree",
  extends: {},
  data() {
    return {
      treeKey: {
        nodeName: "node_name", // node title
        nodeId: "node_id", // node key
        parentId: "parent_id", // parent key
        depth: "depth" // node depth
      }
    };
  },
  props: {},
  computed: {
    ...mapGetters("bizMeta", ["categoryObject", "selectedNodeList"]),
    ...mapGetters("constants", ["CONSTANTS"])
  },
  components: { BasicTree, BasicTag },
  watch: {},
  methods: {
    ...mapActions("bizMeta", ["getCategoryObject", "setSelectedNodeList"]),
    selectionChange(nodeData, bool) {
      this.setSelectedNodeList({
        key: nodeData[this.treeKey.nodeId],
        node: nodeData,
        bool: bool
      });
    }
  },
  created() {
    this.getCategoryObject(this.treeKey);
  }
};
</script>

<style lang="scss">
// @import ""
</style>
