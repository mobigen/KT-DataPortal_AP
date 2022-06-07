<template lang="html">
  <div :class="pDepth === 0 ? 'search-filter__next' : 'depth-3'">
    <ul class="search-filter__list">
      <li class="search-filter__item">
        <div
          class="checkbox checkbox--aside"
          :style="{
            display: isRootNode() && !showRootNode ? 'none' : 'inherit'
          }"
        >
          <input
            type="checkbox"
            :id="treeData[treeKey[CONSTANTS.TREE.TREE_KEY.NODE_ID]]"
            name="NextSearchFilter"
            class="checkbox__input"
          />
          <label
            :for="treeData[treeKey[CONSTANTS.TREE.TREE_KEY.NODE_ID]]"
            class="checkbox__label"
          >
            <span @click="toggle"
              >{{ treeData[treeKey[CONSTANTS.TREE.TREE_KEY.NODE_NM]] }}
            </span></label
          >
        </div>
        <ul v-if="isOpen" v-show="open">
          <item
            v-for="(data, index) in treeData.children"
            :treeData="data"
            :key="index"
            :tree-key="treeKey"
            :pDepth="depth"
          ></item>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
import BasicButton from "@/components/aiPlatform/basic/basic-button.vue";
import { mapActions, mapGetters } from "vuex";

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
    // treeSelectType: {
    //   type: String,
    //   require: false,
    //   default: "ALL" // ALL, LEAF
    // },
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
    showRootNode: {
      type: Boolean,
      require: false,
      default: false
    },
    nodeOpenType: {
      type: String,
      require: false,
      /**
       * first : open only first node
       * all : open all node
       * none : not open
       */
      default: "ALL"
    },
    firstNodeId: {
      type: String,
      require: false,
      default: null
    },
    useTreeViewAll: {
      type: Boolean,
      require: false,
      default: false
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
    this.setFirstNodeId();
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
  components: { BasicButton },
  watch: {},
  methods: {
    ...mapActions("module/tree", ["getCategoryObject"]),
    setEventBus() {
      if (this.useTreeViewAll && this.depth === 2) {
        /**
         * depth : root (1), root-child (2) ...         *
         * ROOT의 자식 노드만 모두열기/닫기의 기능이 동작된다.
         *
         */
        const me = this;
        this.$nuxt.$on("treeCompRecursionFn", (bool) => {
          me.open = bool;
        });
      }
    },
    setFirstNodeId() {
      /**
       * 노드 오픈 타입을 'first'로 지정했을때, 어떤 노드가 'first'인지 알기 위해서 동작하는 함수.       *
       * 가장 처음 ROOT 노드 일때 이 함수를 실행해서 'first'노드를 저장해둔다.
       *
       * 만약, 노드 오픈 탸입이 'first'가 아닌 경우 실행할 필요가 없다.
       * 또, basic-tree는 component를 재귀적으로 실행하는데
       * 재귀적으로 실행할때는 이 함수가 동작할 필요가 없다. (오직 ROOT 일때만 동작함)       *
       */

      // ROOT가 아닐 경우 실행할 필요가 없음.
      // 노드 오픈 타입이 first가 아닐경우 실행할 필요가 없음.
      if (
        !this.isRootNode() ||
        this.nodeOpenType !== this.CONSTANTS.TREE.OPEN_TYPE.FIRST
      ) {
        return;
      }

      if (
        this.treeData["children"] !== undefined &&
        this.treeData["children"].length > 0
      ) {
        this.fNodeId =
          this.treeData["children"][0][
            this.treeKey[this.CONSTANTS.TREE.TREE_KEY.NODE_ID]
          ];
      }
    },
    getOpenTypeByNode() {
      // 맨 처음 노드를 그릴때만 실행함.
      if (this.nodeOpenType === this.CONSTANTS.TREE.OPEN_TYPE.ALL) {
        this.open = true;
      } else if (this.nodeOpenType === this.CONSTANTS.TREE.OPEN_TYPE.FIRST) {
        // 첫번째 노드만 오픈할 경우

        // ROOT 노드는 오픈한다.
        // 일단 open 시켜두고, class 제어를 통해서 화면에서 표시/미표시 한다.
        if (this.isRootNode()) {
          this.open = true;
        } else {
          // ROOT가 아니면,
          this.open =
            this.firstNodeId ===
            this.treeData[this.treeKey[this.CONSTANTS.TREE.TREE_KEY.NODE_ID]];
        }
      }
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
        this.pId.push(
          treeNode[this.treeKey[this.CONSTANTS.TREE.TREE_KEY.NODE_ID]]
        );
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

<style scoped>
ul {
  padding-left: 0.5rem;
  display: inline-grid;
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
