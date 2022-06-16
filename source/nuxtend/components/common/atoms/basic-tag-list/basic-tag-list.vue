<template lang="html">
  <div class="tags">
    <base-tag
      v-for="(data, i) in tagList"
      @tagClick="tagClick(data)"
      :key="'base_tag_' + i"
    >
      {{ previousText }}{{ data["itemName"] }}
      <template v-if="useCancelButton">
        <base-button title="삭제" @click="cancel(data['itemId'])">
          <svg-icon class="svg-icon" name="close" aria-hidden="true"></svg-icon>
        </base-button>
      </template>
    </base-tag>
  </div>
</template>

<script type="text/javascript">
import BaseButton from "@component/UITeam/project/katech/atoms/base-button/base-button";
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
      require: false
    },
    tagList: {
      type: Array,
      require: true
    },
    tagType: {
      type: String,
      require: false,
      default: "checkbox"
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
