<template lang="html">
  <div>
    <template v-for="(obj, key) in filterObj">
      <!-- 1. 필터 타입에 따라서 컴포넌트를 추가한다.
      현재 개발된 필터-컴포넌트는 checkbox, tree 두가지이다.-->
      <template v-if="obj.componentType === 'checkbox'">
        <div class="component">
          <basic-checkbox
            :checkboxKey="key"
            :checkboxTitle="obj.label"
            :checkboxData="searchFilterList[key]"
            :selectCheckboxList="selectSearchFilterList[key]"
            :checkboxColumnCount="obj.columnCnt"
            @changeCheckboxList="changeCheckboxList"
            :useViewButton="obj.useViewButton"
          ></basic-checkbox>
        </div>
      </template>
      <template v-if="obj.componentType === 'tree'">
        <div class="component">
          <complex-tree
            :component-key="treeObj.componentKey"
            :tree-rest-api="treeObj.treeRestApi"
            :use-single-checkbox="true"
            :checkbox-label="treeObj.checkboxLabel"
            :tree-key="treeObj.treeKey"
            :tree-mode="CONSTANTS.TREE.TREE_MODE.VIEW"
            :tree-select-type="CONSTANTS.TREE.TREE_TYPE.LEAF"
          />
        </div>
      </template>
    </template>
  </div>
</template>

<script type="text/javascript">
import BasicCheckbox from "@/components/aiPlatform/basic/basic-checkbox.vue";
import ComplexTree from "@/components/aiPlatform/group/complex-tree";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "filter-checkbox",
  extends: {},
  props: {
    filterObj: {
      type: Object,
      require: true
    },
    treeObj: {
      type: Object,
      require: true
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("defaults/constants", ["CONSTANTS"]),
    ...mapGetters("app/search/search", [
      "searchFilterList",
      "selectSearchFilterList"
    ])
  },
  components: { BasicCheckbox, ComplexTree },
  watch: {},
  methods: {
    ...mapActions("app/search/search", ["changeSearchFilterList"]),
    changeCheckboxList(checkboxKey, checkboxList) {
      this.changeSearchFilterList({
        key: checkboxKey,
        changeList: checkboxList
      });
    }
  },
  created() {}
};
</script>

<style lang="scss">
// @import ""
</style>
