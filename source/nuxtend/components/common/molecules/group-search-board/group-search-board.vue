<template lang="html">
  <div class="text-input-group">
    <label for="inp-search" class="hidden">게시물검색</label>
    <base-input @keydown="isComboBoxShow = true" id="inp-search" placeholder="검색어를 입력하세요"></base-input>
    <base-button class="button--icon text-input-group__clear-button" title="초기화">
      <svg-icon class="svg-icon" name="close" aria-hidden="true"></svg-icon>
    </base-button>
    <base-button
      title="조회"
      class="text-input-group__search-button"
      @click="$emit('search', inputData)"
      ><span class="button__text">조회</span>
      </base-button
    >
    </div>
  </div>
</template>

<script type="text/javascript">
import BaseButton from "@common/atoms/base-button/base-button.vue";
import BaseInput from "@common/atoms/base-input/base-input";
import BaseTag from "@common/atoms/base-tag/base-tag";

export default {
  name: "GroupSearchBoard",
  props: {
    searchKeyword: {
      type: String,
      require: false
    },
    useRecentSearch: {
      type: Boolean,
      require: false,
      default: false
    }
  },
  components: {
    BaseTag,
    BaseInput,
    BaseButton
  },
  data() {
    return {
      inputData: ""
    };
  },
  methods: {
    search({ input }) {
      this.inputData = input;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./group-search-board";
</style>
