<template lang="html">
  <div class="search-filter">
    <div class="search-filter__head">
      <base-checkbox
        class="checkbox--aside"
        name="searchFilterAll"
        checkbox-id="searchFilterAll1"
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
              component-key="componentKey"
              :tree-data="categoryObject"
              :tree-key="treeObj.treeKey"
            />
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script type="text/javascript">
import BaseCheckbox from "@component/project/katech/atoms/base-checkbox/base-checkbox";
import BasicTree from "@component/aiPlatform/organisms/basic-tree.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "GroupSearchFilter",
  props: {
    treeKey: {
      type: String,
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
    }
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("module/tree", ["getCategoryObject"])
  },
  created() {
    this.treeKey["api"] = this.treeRestApi;
    this.treeKey["componentKey"] = this.componentKey;

    this.getCategoryObject(this.treeKey);
  }
};
</script>

<style lang="scss" scoped>
@import "./group-search-filter.scss";
</style>
