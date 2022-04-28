<template lang="html">
  <div id="selectFilterList">
    <div v-for="(data, i) in filterData">
      <basic-label forProperty="">{{ data["label"] }}</basic-label>
      <search-tag
        :tagList="data['selectFilterList']"
        :hashTagUse="hashTagUse"
        :cancelButtonUse="cancelButtonUse"
        :cursorPointer="cursorPointer"
        @tagClick="filterClick"
      ></search-tag>
    </div>
    <template>
      <basic-button
        class="filter-reset-button"
        componentId=""
        buttonCss="text-button"
        :underline="false"
        :hoverColor="false"
        @click="selectFilterReset"
        >선택 필터 초기화</basic-button
      >
    </template>
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
      type: Array,
      require: true
    },
    hashTagUse: {
      type: Boolean,
      require: false,
      default: false
    },
    cancelButtonUse: {
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
    filterClick(filterName) {
      this.$emit("filterClick", filterName);
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
    display: flex;
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
