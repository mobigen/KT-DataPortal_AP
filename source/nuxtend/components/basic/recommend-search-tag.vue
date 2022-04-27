<template lang="html">
  <div id="recommendSearchTag">
    <basic-label forProperty="">{{ tagLabel }}</basic-label>
    <search-tag
      :tagList="tagList"
      :previousText="previousText"
      :cancelButtonUse="cancelButtonUse"
      :cursorPointer="cursorPointer"
      @tagClick="tagClick"
    ></search-tag>
  </div>
</template>

<script type="text/javascript">
import BasicLabel from "@/components/basic/basic-label.vue";
import SearchTag from "@/components/basic/search-tag.vue";

export default {
  name: "recommend-search-tag",
  extends: {},
  data() {
    return {};
  },
  props: {
    tagLabel: {
      type: String,
      require: false
    },
    tagList: {
      type: Array,
      require: true
    },
    previousText: {
      type: String,
      require: false
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
  computed: {},
  components: { BasicLabel, SearchTag },
  watch: {},
  methods: {
    tagClick(tagName) {
      this.$emit("tagClick", tagName);
    }
  }
};
</script>

<style lang="scss">
#recommendSearchTag {
  display: flex;
}
</style>
