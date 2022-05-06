<template lang="html">
  <div>
    <div>
      <div>tree component mode : {{ treeMode }}</div>

      <basic-single-checkbox
        v-show="useSingleCheckbox && treeMode === CONSTANTS.TREE.TREE_MODE.VIEW"
        :checkbox-label="checkboxLabel"
        label-name="selectNodeAll"
        @changeData="checkboxChange"
      ></basic-single-checkbox>
    </div>

    <basic-tree
      :component-key="componentKey"
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

    <basic-tree-tag
      v-show="treeMode === CONSTANTS.TREE.TREE_MODE.VIEW"
      :selectedNodeList="selectedNodeList"
      :nodeTitle="treeKey.nodeName"
      :nodeIdText="treeKey.nodeIdText"
    >
    </basic-tree-tag>

    <div
      v-show="
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

import BasicTree from "@/components/aiPlatform/basic/basic-tree.vue";
import BasicTreeTag from "@/components/aiPlatform/basic/basic-tree-tag.vue";
import BasicSingleCheckbox from "@/components/aiPlatform/basic/basic-single-checkbox";
import BasicForm from "@/components/aiPlatform/basic/basic-form";
import BasicLabel from "@/components/aiPlatform/basic/basic-label";
import BasicButton from "@/components/aiPlatform/basic/basic-button";

export default {
  name: "BasicTemplate",
  extends: {},
  props: {
    componentKey: {
      type: String,
      require: true,
      default: "treeComponentKey"
    },
    treeRestApi: {
      type: String,
      require: true
    },
    useSingleCheckbox: {
      type: Boolean,
      require: false,
      default: true
    },
    checkboxLabel: {
      type: String,
      require: false,
      default: ""
    },
    treeKey: {
      type: Object,
      require: true
    },
    treeSelectType: {
      type: String,
      require: true,
      default: "ALL"
    },
    treeMode: {
      type: String,
      require: false,
      default: "SELECT"
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
    categoryObject() {
      return this.$store.getters["module/tree/categoryObject"][
        this.componentKey
      ];
    },
    selectedNodeList() {
      return this.$store.getters["module/tree/selectedNodeList"][
        this.componentKey
      ];
    },
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
    BasicTreeTag,
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
      "addChildCategory"
    ]),
    checkboxChange(checked) {
      this.checked = checked;
    },
    selectionChange({ bool, nodeData }) {
      this.setSelectedNodeList({
        componentKey: this.componentKey,
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
    addBtnClick() {
      let params = {};

      if (this.clickMode === this.CONSTANTS.TREE.CLICK_MODE.EDIT) {
        // node edit
        // params[this.treeKey.parentIdText] = this.selectedNode[this.treeKey.parentIdText];
        params[this.treeKey.nodeIdText] = this.selectedNode[this.treeKey.nodeIdText];
        params[this.treeKey.nodeName] = this.nodeName;

        this.updateNodeInfo(params);
      } else {
        // add child
        params[this.treeKey.parentIdText] = this.selectedNode[this.treeKey.nodeIdText];
        // params[this.treeKey.nodeIdText] = this.selectedNode.nodeIdText;
        params[this.treeKey.nodeName] = this.nodeName;

        this.addChildCategory(params);
      }
    },
    updateFormData(formData) {
      // 만약 노드 수정/하위노드 추가 form에서 복수개의 parmeter를 전달받아야 한다면, Object 형태로 구현해야 함.
      this.nodeName = formData[this.treeKey.nodeName];
    }
  },
  created() {
    this.treeKey["api"] = this.treeRestApi;
    this.treeKey["componentKey"] = this.componentKey;
    this.getCategoryObject(this.treeKey);

    this.setFormDefaultsData();
  }
};
</script>

<style lang="scss">
// @import ""
</style>
