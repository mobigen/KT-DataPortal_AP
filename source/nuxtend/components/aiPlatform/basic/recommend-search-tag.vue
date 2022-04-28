<template lang="html">
  <div id="recommendSearchTag">
    <basic-label forProperty="">{{ tagLabel }}</basic-label>
    <search-tag
      :tagList="tagList"
      :hashTagUse="hashTagUse"
      :cancelButtonUse="cancelButtonUse"
      :cursorPointer="cursorPointer"
      @tagClick="tagClick"
    ></search-tag>
  </div>
</template>

<script type="text/javascript">
import BasicLabel from "@/components/aiPlatform/basic/basic-label.vue";
import SearchTag from "@/components/aiPlatform/basic/search-tag.vue";

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
