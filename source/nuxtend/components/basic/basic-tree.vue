<template lang="html">
  <div class="tree_cont" :key="treeData[nodeId]">
    <div>
      <span v-if="isOpen" @click="toggle">[{{ open ? "-" : "+" }}]</span>
      {{ treeData[nodeTitle] }}

      <div class="tree-buttons">
        <basic-button
          v-if="useSelection"
          componentId="nodeSelect"
          buttonCss="text-button"
          :underline="false"
          :hoverColor="false"
          @click="selectionChange(treeData)"
        >
          {{
            selectionBtnText[
              Object.prototype.hasOwnProperty.call(
                selectedNodeList,
                treeData[nodeId]
              )
                ? 0
                : 1
            ]
          }}
        </basic-button>
        <basic-button
          componentId="childAdd"
          buttonCss="text-button"
          :underline="false"
          :hoverColor="false"
          @click="addRow"
          >+</basic-button
        >
        <basic-button
          componentId="childRemove"
          buttonCss="text-button"
          :underline="false"
          :hoverColor="false"
          @click="deleteRow"
          >-</basic-button
        >
      </div>
    </div>
    <ul v-if="isOpen" v-show="open">
      <item
        v-for="(data, index) in treeData.children"
        :treeData="data"
        :key="index"
        :nodeTitle="nodeTitle"
        :nodeId="nodeId"
        :useSelection="true"
        :selectedNodeList="selectedNodeList"
        @selectionChange="selectionChange"
        :selectionBtnText="selectionBtnText"
      ></item>
    </ul>
  </div>
</template>

<script type="text/javascript">
import BasicButton from "@/components/basic/basic-button.vue";

export default {
  name: "item",
  extends: {},
  props: {
    treeData: {
      type: Object,
      require: true
    },
    nodeTitle: {
      type: String,
      require: true
    },
    nodeId: {
      type: String,
      require: true
    },
    useEditor: {
      // 데이터의 추가/수정/삭제 가능여부
      type: Boolean,
      require: false,
      defaults: false
    },
    useSelection: {
      type: Boolean,
      require: false,
      defaults: false
    },
    selectedNodeList: {
      type: Object,
      require: true
    },
    selectionBtnText: {
      type: Array,
      require: false,
      defaults: ["선택함", "선택안함"]
    }
  },
  data() {
    return {
      open: false
    };
  },
  computed: {
    isOpen() {
      return this.treeData.children && this.treeData.children.length;
    }
  },
  components: { BasicButton },
  watch: {},
  created() {},
  methods: {
    toggle() {
      this.open = !this.open;
    },
    selectionChange(nodeData) {
      const oldValue = Object.prototype.hasOwnProperty.call(
        this.selectedNodeList,
        nodeData[this.nodeId]
      );
      this.$emit("selectionChange", nodeData, !oldValue);
    },
    addRow() {
      console.log("addRow");
    },
    deleteRow() {
      console.log("deleteRow");
    }
  }
};
</script>

<style scoped>
ul {
  padding-left: 0.5rem;
}

.tree_cont {
  margin: 0.15rem 0.25rem;
  background: white;
  padding: 0.1rem 0.25rem;
}

.tree-buttons {
  display: inline-flex;
}
</style>
