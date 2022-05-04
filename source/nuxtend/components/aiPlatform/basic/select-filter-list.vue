<template lang="html">
  <div id="selectFilterList">
    <div v-for="(value, key, index) in filterData">
      <basic-label forProperty="">{{ value["label"] }}</basic-label>
      <search-tag
        :tagKey="key"
        :tagList="value['dataList']"
        :previousText="previousText"
        :useCancelButton="useCancelButton"
        :cursorPointer="cursorPointer"
        @tagCancel="filterTagCancel"
        @tagClick="filterClick"
      ></search-tag>
    </div>
    <basic-button
      class="filter-reset-button"
      componentId=""
      buttonCss="text-button"
      :underline="false"
      :hoverColor="false"
      @click="selectFilterReset"
      >선택 필터 초기화</basic-button
    >
  </div>
</template>

<script type="text/javascript">
import BasicLabel from "@/components/aiPlatform/basic/basic-label.vue";
import SearchTag from "@/components/aiPlatform/basic/search-tag.vue";
import BasicButton from "@/components/aiPlatform/basic/basic-button.vue";
export default {
  name: "select-filter-list",
  extends: {},
  props: {
    filterData: {
      type: Object,
      require: true
    },
    previousText: {
      type: String,
      require: false
    },
    useCancelButton: {
      type: Boolean,
      require: false,
      default: false
    },
    cursorPointer: {
      type: Boolean,
      require: false,
      default: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  components: { BasicLabel, SearchTag, BasicButton },
  watch: {},
  methods: {
    filterTagCancel(tagList, tagKey) {
      this.$emit("filterTagCancel", tagKey, tagList);
    },
    filterClick(tagObj) {
      this.$emit("filterClick", tagObj);
    },
    selectFilterReset() {
      this.$emit("selectFilterReset");
    }
  },
  created() {}
};
</script>

<style lang="scss">
#selectFilterList {
  width: 50%;
  border: solid lightgray 1px;
  padding: 10px;
  position: relative;
  > div {
    display: grid;
    grid-template-columns: 100px 1fr;
    padding: 5px;
    .tag-item {
      border-radius: 0px;
    }
  }
  .filter-reset-button {
    position: absolute;
    top: 10px;
    right: 10px;
    button {
      border: solid 1px gray;
      padding: 5px;
    }
  }
}
</style>
