<template lang="html">
  <div class="tags">
    <base-tag
      v-for="(data, i) in tagList"
      @tagClick="tagClick(data)"
      :key="'base_tag_' + i"
      :class="tagClass"
    >
      <span :class="spanClass">{{ previousText }}{{ data["itemName"] }}</span>

      <template v-if="useCancelButton">
        <base-button title="삭제" @click="cancel(data['itemId'])">
          <svg-icon class="svg-icon" name="close" aria-hidden="true"></svg-icon>
        </base-button>
      </template>
    </base-tag>
  </div>
</template>

<script type="text/javascript">
import BaseButton from "@common/atoms/base-button/base-button";
import BaseTag from "@component/common/atoms/base-tag/base-tag";

export default {
  name: "basic-tag-list",
  extends: {},
  data() {
    return {};
  },
  props: {
    tagKey: {
      type: String,
      required: false
    },
    tagList: {
      type: Array,
      required: true
    },
    tagType: {
      type: String,
      required: false,
      default: "checkbox"
    },
    previousText: {
      type: String,
      required: false
    },
    useCancelButton: {
      type: Boolean,
      required: false,
      default: false
    },
    cursorPointer: {
      type: Boolean,
      required: false,
      default: true
    },
    tagClass: {
      type: String,
      require: false
    },
    spanClass: {
      type: String,
      require: false
    }
  },
  computed: {},
  components: { BaseButton, BaseTag },
  watch: {},
  methods: {
    cancel(itemId) {
      this.$emit("tagCancel", {
        key: this.tagKey,
        itemId: itemId,
        type: this.tagType
      });
    },
    tagClick(tagObj) {
      this.$emit("tagClick", tagObj);
    }
  }
};
</script>

<style lang="scss"></style>
