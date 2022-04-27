<template lang="html">
  <div>
    <div>
      <div>tree component mode : {{ treeMode }}</div>

      <basic-single-checkbox
        v-if="useSingleCheckbox && treeMode === CONSTANTS.TREE.TREE_MODE.VIEW"
        :checkbox-label="checkboxLabel"
        label-name="selectNodeAll"
        @changeData="checkboxChange"
      ></basic-single-checkbox>
    </div>

    <basic-tree
      :tree-select-type="treeSelectType"
      :tree-data="categoryObject"
      :tree-mode="treeMode"
      :checked="checked"
      :nodeTitle="treeKey.nodeName"
      :nodeIdText="treeKey.nodeIdText"
      :parentIdText="treeKey.parentIdText"
      @selectionChange="selectionChange"
      @setEditForm="editNode"
    ></basic-tree>

    <basic-tag
      v-if="treeMode === CONSTANTS.TREE.TREE_MODE.VIEW"
      :selectedNodeList="selectedNodeList"
      :nodeTitle="treeKey.nodeName"
      :nodeIdText="treeKey.nodeIdText"
    >
    </basic-tag>

    <div
      v-if="
        treeMode === CONSTANTS.TREE.TREE_MODE.EDITOR &&
        selectedNode[treeKey.nodeName] !== undefined
      "
    >
      <basic-label> {{ notyTitle }}</basic-label>
      <basic-form
        :header-list="headerList"
        :data-object="dataObject"
        @changeData="updateFormData"
      ></basic-form>
      <basic-button
        buttonCss="text-button"
        :underline="false"
        :hoverColor="false"
        @click="addBtnClick"
        >등록</basic-button
      >
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";

import BasicTree from "@/components/basic/basic-tree.vue";
import BasicTag from "@/components/basic/basic-tag.vue";
import BasicSingleCheckbox from "@/components/basic/basic-single-checkbox";
import BasicForm from "@/components/basic/basic-form";
import BasicLabel from "@/components/basic/basic-label";
import BasicButton from "@/components/basic/basic-button";

export default {
  name: "BasicTemplate",
  extends: {},
  props: {
    treeRestApi: {
      type: String,
      require: true
    },
    useSingleCheckbox: {
      type: Boolean,
      require: false,
      defaults: true
    },
    checkboxLabel: {
      type: String,
      require: false,
      defaults: ""
    },
    treeKey: {
      type: Object,
      require: true
    },
    treeSelectType: {
      type: String,
      require: true,
      defaults: "ALL"
    },
    treeMode: {
      type: String,
      require: false,
      defaults: "SELECT"
    }
  },
  data() {
    return {
      checked: false,
      clickMode: "EDIT", // or addChild
      headerList: [],
      dataObject: {},
      selectedNode: {},
      nodeName: null
    };
  },
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"]),
    ...mapGetters("module/tree", ["categoryObject", "selectedNodeList"]),
    notyTitle() {
      return (
        "[" +
        this.selectedNode[this.treeKey.nodeName] +
        "] " +
        (this.clickMode === this.CONSTANTS.TREE.CLICK_MODE.EDIT
          ? "노드 수정"
          : "하위 노드 추가")
      );
    }
  },
  components: {
    BasicSingleCheckbox,
    BasicTree,
    BasicTag,
    BasicForm,
    BasicLabel,
    BasicButton
  },
  watch: {},
  methods: {
    ...mapActions("module/tree", [
      "getCategoryObject",
      "setSelectedNodeList",
      "updateNodeInfo",
      "addNewChild"
    ]),
    checkboxChange(checked) {
      this.checked = checked;
    },
    selectionChange({ bool, nodeData }) {
      this.setSelectedNodeList({
        key: nodeData[this.treeKey.nodeIdText],
        node: nodeData,
        bool: bool
      });
    },
    setFormDefaultsData() {
      this.headerList.push({ column_name: this.treeKey.nodeName });
    },
    editNode({ clickMode, nodeData }) {
      this.clickMode = clickMode;
      this.selectedNode = nodeData;
    },
    async addBtnClick() {
      let params = {};

      if (this.clickMode === this.CONSTANTS.TREE.CLICK_MODE.EDIT) {
        // node edit
        params[this.treeKey.parentIdText] = this.selectedNode.parentIdText;
        params[this.treeKey.nodeIdText] = this.selectedNode.nodeIdText;
        params[this.treeKey.nodeName] = this.nodeName;

        await this.updateNodeInfo(params);
      } else {
        // add child
        params[this.treeKey.parentIdText] = this.selectedNode.nodeIdText;
        params[this.treeKey.nodeIdText] = this.selectedNode.nodeIdText;
        params[this.treeKey.nodeName] = this.nodeName;

        await this.addNewChild(params);
      }
    },
    updateFormData(formData) {
      // 만약 노드 수정/하위노드 추가 form에서 복수개의 parmeter를 전달받아야 한다면, Object 형태로 구현해야 함.
      this.nodeName = formData[this.treeKey.nodeName];
    }
  },
  created() {
    this.treeKey["api"] = this.treeRestApi;
    this.getCategoryObject(this.treeKey);

    this.setFormDefaultsData();
  }
};
</script>

<style lang="scss">
// @import ""
</style>
