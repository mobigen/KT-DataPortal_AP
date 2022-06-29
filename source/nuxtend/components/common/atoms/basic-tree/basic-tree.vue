<template lang="html">
  <div :class="pDepth <= 0 ? 'search-filter__next' : ''">
    <!--
    TODO : 퍼블에 없는 DIV로 개발에 필요하여 추가
    -->
    <div
      :style="{
        display: pDepth === 0 ? 'none' : 'inherit'
      }"
    >
      <base-checkbox
        class="checkbox--aside"
        :name="treeData[treeKey[CONSTANTS.TRE E.TREE_KEY.NODE_ID]]"
        :checkbox-id="treeData[treeKey[CONSTANTS.TREE.TREE_KEY.NODE_ID]]"
        @changeData="checkboxClick"
        :checked="spanSelected"
      >
        <template v-slot:label>{{
          treeData[treeKey[CONSTANTS.TREE.TREE_KEY.NODE_NM]]
        }}</template>
      </base-checkbox>
    </div>
    <ul :class="pDepth === 0 ? 'search-filter__list' : ''">
      <item
        v-for="(treeChildren, i) in treeData.children"
        :key="'li_' + i"
        :component-key="componentKey"
        :tree-data="treeChildren"
        :tree-key="treeKey"
        :pDepth="depth"
        :parentsIds="pId"
        @selectionChange="selectionChange"
      >
      </item>
    </ul>
  </div>
</template>

<script type="text/javascript">
import BasicButton from "@component/aiPlatform/basic/basic-button.vue";
import { mapActions, mapGetters } from "vuex";
import BaseCheckbox from "@component/common/atoms/base-checkbox/base-checkbox";

export default {
  name: "item",
  extends: {},
  props: {
    componentKey: {
      type: String,
      require: true
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
    treeKey: {
      type: Object,
      require: true
    },
    // 내부 재귀 루틴에서만 쓰임.
    parentsIds: {
      type: Array,
      require: false,
      default: () => {
        return [];
      }
    },
    pDepth: {
      type: Number,
      require: false,
      default: 0
    }
  },
  data() {
    return {
      open: true,
      fNodeId: null,
      pId: [],
      depth: 0
    };
  },
  created() {
    this.depth = this.pDepth + 1;
    // 모든 component의 열기/닫기를 처리하기 위해서, eventBus를 지정한다.
    // 단 'useTreeViewAll'를 사용할때만, (true) 일 때만 eventBus를 정의하면 된다.
    this.setEventBus();

    this.setParentIds();
    this.getOpenTypeByNode();
  },
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"]),

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
          this.treeData[this.treeKey[this.CONSTANTS.TREE.TREE_KEY.NODE_ID]]
        );
      }
    }
  },
  components: { BasicButton, BaseCheckbox },
  watch: {},
  methods: {
    ...mapActions("module/tree", ["getCategoryObject"]),
    setEventBus() {
      // 전체 선택
      const me = this;
      this.$nuxt.$on("treeCompSelectionChange", (bool, parentId) => {
        if (parentId === undefined) {
          // parentId가 없으면 전체 노드를 '선택'/ '비선택'을 셋팅한다.
          me.selectionChange({
            bool: bool,
            nodeData: me.treeData
          });
        } else {
          // parentId가 있으면 해당되는 노드만 '선택' / '비선택'을 셋팅한다.
          if (
            me.treeData[me.treeKey[me.CONSTANTS.TREE.TREE_KEY.PRNTS_ID]] ===
              parentId ||
            me.parentsIds.includes(parentId)
          ) {
            me.selectionChange({
              bool: bool,
              nodeData: me.treeData
            });
          }
        }
      });
    },
    getOpenTypeByNode() {
      // open all
      this.open = true;
    },
    setParentIds() {
      const parentId =
        this.treeData[this.treeKey[this.CONSTANTS.TREE.TREE_KEY.PRNTS_ID]];
      if (parentId === undefined || this.parentsIds === undefined) {
        return;
      }
      this.pId = this.parentsIds.concat([parentId]);
    },
    toggle() {
      this.open = !this.open;
    },
    checkboxClick(bool, nodeId) {
      this.selectionChange({
        bool: bool,
        nodeData: this.getNode(nodeId)
      });
    },
    getNode(key) {
      return this.categoryObjectByKey[key];
    },
    selectionChange(param) {
      this.$emit("selectionChange", param);
    },
    isRootNode() {
      return (
        this.treeData[this.treeKey[this.CONSTANTS.TREE.TREE_KEY.NODE_ID]] ===
        this.treeData[this.treeKey[this.CONSTANTS.TREE.TREE_KEY.PRNTS_ID]]
      );
    }
  }
};
</script>

<style></style>
