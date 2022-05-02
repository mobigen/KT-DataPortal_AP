<template lang="html">
  <div class="tree_cont">
    <div>
      <span v-show="isOpen" @click="toggle">[{{ open ? "-" : "+" }}]</span>

      <template v-if="treeMode === CONSTANTS.TREE.TREE_MODE.EDITOR">
        <span
          :class="[spanSelected ? 'span-selected' : '']"
          @click="spanEdit(treeData)"
          >{{ treeData[nodeTitle] }}</span
        >
        <basic-button
          style="display: inline"
          buttonCss="text-button"
          :underline="false"
          :hoverColor="false"
          @click="addChildren(treeData)"
          >+</basic-button
        >
      </template>
      <template v-else>
        <span
          :class="[spanSelected ? 'span-selected' : '']"
          @click="spanClick(treeData, $event)"
          >{{ treeData[nodeTitle] }}</span
        >
      </template>
    </div>
    <ul v-if="isOpen" v-show="open">
      <item
        v-for="(data, index) in treeData.children"
        :component-key="componentKey"
        :tree-select-type="treeSelectType"
        :checked="checked"
        :treeData="data"
        :key="index"
        :nodeTitle="nodeTitle"
        :nodeIdText="nodeIdText"
        :parentIdText="parentIdText"
        :tree-mode="treeMode"
        @selectionChange="selectionChange"
        :parentsIds="pId"
        @setEditForm="setEditForm"
      ></item>
    </ul>
  </div>
</template>

<script type="text/javascript">
import BasicButton from "@/components/aiPlatform/basic/basic-button.vue";
import { mapGetters } from "vuex";

export default {
  name: "item",
  extends: {},
  props: {
    componentKey: {
      type: String,
      require: true
    },
    /**
     * Tree Type.
     * ALL : You can select Every Node.
     * LEAF : You can select ONLY Leaf NODE. AND available  checkbox that name is "auto select parent Node.".
     * @values ALL, LEAF
     */
    treeSelectType: {
      type: String,
      require: false,
      default: "ALL" // ALL, LEAF
    },
    checked: {
      type: Boolean,
      require: false,
      default: false
    },
    treeData: {
      type: Object,
      require: true,
      default: () => {
        return {};
      }
    },
    nodeTitle: {
      type: String,
      require: true,
      default: ""
    },
    nodeIdText: {
      type: String,
      require: true,
      default: ""
    },
    parentIdText: {
      type: String,
      require: true,
      default: ""
    },
    treeMode: {
      type: String,
      require: true,
      default: "VIEW"
    },
    // 내부 재귀 루틴에서만 쓰임.
    parentsIds: {
      type: Array,
      require: false,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      open: false,
      // spanSelected: false,
      pId: []
    };
  },
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"]),
    // ...mapGetters("module/tree", ["categoryObjectByKey"]),
    categoryObjectByKey() {
      return this.$store.getters["module/tree/categoryObjectByKey"][
        this.componentKey
      ];
    },
    isOpen() {
      return this.treeData.children && this.treeData.children.length;
    },
    spanSelected() {
      let selectedNodeList =
        this.$store.getters["module/tree/selectedNodeList"];

      if (
        !Object.prototype.hasOwnProperty.call(
          selectedNodeList,
          this.componentKey
        )
      ) {
        // component key가 아예 없다면 false를 리턴한다.
        return false;
      } else {
        return Object.prototype.hasOwnProperty.call(
          selectedNodeList[this.componentKey],
          this.treeData[this.nodeIdText]
        );
      }
    }
  },
  components: { BasicButton },
  watch: {},
  created() {
    this.setParentIds();
  },
  methods: {
    setParentIds() {
      const parentId = this.treeData[this.parentIdText];
      if (parentId === undefined || this.parentsIds === undefined) {
        return;
      }
      this.pId = this.parentsIds.concat([parentId]);
    },
    toggle() {
      this.open = !this.open;
    },
    spanClick(treeNode) {
      if (this.treeSelectType === this.CONSTANTS.TREE.TREE_TYPE.LEAF) {
        // LEAF 일 경우, 가장 마지막 노드만 선택 가능함.

        if (Object.prototype.hasOwnProperty.call(treeNode, "children")) {
          // children을 가지고 있으면 하위노드가 아님. return한다.
          return;
        }
        if (treeNode.children >= 1) {
          // children을 가지고 있어도 그 갯수가 1개 이상이면 하위노드가 아님. return 한다.
          return;
        }
      }

      const nodeSelected = !this.spanSelected;

      // ALL인 경우, 모든 노드 선택 가능함.
      // 상위자동선택에 체크되어있는 경우, 자기보다 위의 노드를 모드 선택한다.
      if (this.checked) {
        const me = this;
        // 자기 자신 노드를 포함한다.
        this.pId.push(treeNode[this.nodeIdText]);
        this.pId.forEach((parentId) => {
          this.selectionChange({
            bool: nodeSelected,
            nodeData: me.getNode(parentId)
          });
        });
      } else {
        // 상위 자동선택 미체크. 자신것만 체크한다.
        this.selectionChange({
          bool: nodeSelected,
          nodeData: treeNode
        });
      }
    },
    getNode(key) {
      return this.categoryObjectByKey[key];
    },
    selectionChange(param) {
      this.$emit("selectionChange", param);
    },
    spanEdit(treeData) {
      this.setEditForm({
        clickMode: this.CONSTANTS.TREE.CLICK_MODE.EDIT,
        nodeData: treeData
      });
    },
    addChildren(treeData) {
      this.setEditForm({
        clickMode: this.CONSTANTS.TREE.CLICK_MODE.ADD_CHILD,
        nodeData: treeData
      });
    },
    setEditForm(param) {
      this.$emit("setEditForm", param);
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
span.span-selected {
  background-color: red;
}
</style>
