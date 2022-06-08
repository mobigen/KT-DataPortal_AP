<template lang="html">
  <div class="search-filter">
    <div class="search-filter__head">
      <base-checkbox
        class="checkbox--aside"
        name="searchFilterAll"
        checkbox-id="searchFilterAll1"
        @changeData="allSelectClick"
      >
        <template v-slot:label>전체선택</template>
      </base-checkbox>
    </div>

    <!--
     Tree 영역
     Tree Component가 재귀적으로 실행되도록 되어있어서, 코드를 분리함.
     author : skysora@mobigen.com
    -->
    <template>
      <div class="search-filter__body">
        <ul class="search-filter__list">
          <li class="search-filter__item" v-for="(obj, i) in categoryObject" :key="'tree_li_' + i">
            <div class="search-filter__item-group">
              <base-checkbox
                class="checkbox--aside"
                :name="obj[treeKey[CONSTANTS.TREE.TREE_KEY.NODE_ID]]"
                :checkbox-id="obj[treeKey[CONSTANTS.TREE.TREE_KEY.NODE_ID]]"
                @changeData="rootNodeClick"
              >
                <template v-slot:label>{{
                  obj[treeKey[CONSTANTS.TREE.TREE_KEY.NODE_NM]]
                }}</template>
              </base-checkbox>
            </div>

            <basic-tree
              :component-key="componentKey"
              :tree-data="obj"
              :tree-key="treeKey"
              @selectionChange="selectionChange"
            />
          </li>
        </ul>
      </div>

      <base-button class="search-filter__button-reset" @click="treeClear"
        >검색조건 초기화</base-button
      >
    </template>
  </div>
</template>

<script type="text/javascript">
import BaseCheckbox from "@component/aiPlatform/katech/atoms/base-checkbox/base-checkbox";
import BasicTree from "@component/aiPlatform/katech/atoms/basic-tree.vue";
import { mapActions, mapGetters } from "vuex";
import BaseButton from "@component/project/katech/atoms/base-button/base-button";

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
    BasicTree,
    BaseButton
  },
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"]),
    categoryObject() {
      const _r =
        this.$store.getters["module/tree/categoryObject"][this.componentKey];
      return _r === undefined ? _r : _r.children;
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
    ...mapActions("module/tree", [
      "getCategoryObject",
      "setSelectedNodeList",
      "resetSelectedNodeList"
    ]),
    ...mapActions("meta/search/search", ["resetSearchFilterList"]),
    allSelectClick(bool) {
      this.$nuxt.$emit("treeCompSelectionChange", bool);
    },
    rootNodeClick(bool, nodeId) {
      this.$nuxt.$emit("treeCompSelectionChange", bool, nodeId);
    },

    selectionChange({ bool, nodeData }) {
      this.setSelectedNodeList({
        componentKey: this.componentKey,
        key: nodeData[this.treeKey[this.CONSTANTS.TREE.TREE_KEY.NODE_ID]],
        node: nodeData,
        bool: bool
      });
    },
    treeClear() {
      console.log('treeClear')
      // checkbox reset
      this.resetSearchFilterList();
      // tree reset
      this.resetSelectedNodeList(this.componentKey);
    }
  },
  created() {
    this.treeKey["api"] = this.treeObj.treeRestApi;
    this.treeKey["componentKey"] = this.componentKey;

    this.getCategoryObject(this.treeKey);
  }
};
</script>

<style lang="scss">
@import "./group-search-filter.scss";
</style>
