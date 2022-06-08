<template lang="html">
  <div class="search-filter">
    <div class="search-filter__head">
      <base-checkbox
        class="checkbox--aside"
        name="searchFilterAll"
        checkbox-id="searchFilterAll1"
        @changeData="selectTree"
      >
        <template v-slot:label>전체선택</template>
      </base-checkbox>
    </div>

    <!-- Tree Component -->
    <template>
      <div class="search-filter__body">
        <ul class="search-filter__list">
          <li class="search-filter__item">
            <div class="search-filter__item-group">
              <base-checkbox
                class="checkbox--aside"
                name="searchFilter"
                checkbox-id="category"
              >
                <template v-slot:label>카테고리</template>
              </base-checkbox>
            </div>

            <basic-tree
              class="search-filter__body"
              :component-key="componentKey"
              :tree-data="categoryObject"
              :tree-key="treeKey"
              @selectionChange="selectionChange"
            />
            {{ selectedNodeList }}
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script type="text/javascript">
import BaseCheckbox from "@component/project/katech/atoms/base-checkbox/base-checkbox";
import BasicTree from "@component/aiPlatform/katech/atoms/basic-tree.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "GroupSearchFilter",
  props: {
    componentKey: {
      type: String,
      require: true
    },
    treeKey: {
      type: Object,
      require: true
    },
    treeObj: {
      type: Object,
      require: true
    }
  },
  components: {
    BaseCheckbox,
    BasicTree
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
    }
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("module/tree", ["getCategoryObject", "setSelectedNodeList"]),
    selectTree(bool) {
      this.$nuxt.$emit("treeCompSelectionChange", bool);
    },

    selectionChange({ bool, nodeData }) {
      this.setSelectedNodeList({
        componentKey: this.componentKey,
        key: nodeData[this.treeKey[this.CONSTANTS.TREE.TREE_KEY.NODE_ID]],
        node: nodeData,
        bool: bool
      });
    }
  },
  created() {
    this.treeKey["api"] = this.treeObj.treeRestApi;
    this.treeKey["componentKey"] = this.componentKey;

    this.getCategoryObject(this.treeKey);
  }
};
</script>

<style lang="scss" scoped>
@import "group-search-filter";
</style>
