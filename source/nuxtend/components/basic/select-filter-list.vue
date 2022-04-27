<template lang="html">
  <div id="selectFilterList">
    <div v-for="(data, i) in filterData">
      <basic-label forProperty="">{{ data["label"] }}</basic-label>
      <search-tag
        :tagList="data['selectList']"
        :hashTagUse="hashTagUse"
        :cancelButtonUse="cancelButtonUse"
        :cursorPointer="cursorPointer"
        @tagClick=""
      ></search-tag>
    </div>
  </div>
</template>

<script type="text/javascript">
import BasicLabel from "@/components/basic/basic-label.vue";
import SearchTag from "@/components/basic/search-tag.vue";
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
  components: { BasicLabel, SearchTag },
  watch: {},
  methods: {},
  created() {}
};
</script>

<style lang="scss">
#selectFilterList {
  width: 50%;
  border: solid lightgray 1px;
  > div {
    display: flex;
    padding: 5px;
    .tag-item {
      border-radius: 0px;
    }
  }
}
</style>
