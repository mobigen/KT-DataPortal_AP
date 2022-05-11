<template lang="html">
  <div id="recommendSearchTag">
    <basic-label forProperty="">{{ tagLabel }}</basic-label>
    <basic-tag-list
      :tagList="tagList"
      :previousText="previousText"
      :useCancelButton="useCancelButton"
      :cursorPointer="cursorPointer"
      @tagClick="tagClick"
    ></basic-tag-list>
  </div>
</template>

<script type="text/javascript">
import BasicLabel from "@/components/aiPlatform/basic/basic-label.vue";
import BasicTagList from "@/components/aiPlatform/basic/basic-tag-list.vue";

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
  computed: {},
  components: { BasicLabel, BasicTagList },
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
