<template lang="html">
  <div class="search-input-field">
    <div class="search-input-field__inner">
      <form action="">
        <fieldset>
          <legend class="hidden">검색 정보입력</legend>
          <div class="search-input-field__search">
            <group-search-board
              :searchKeyword="searchKeyword"
              :useRecentSearch="useRecentSearch"
              @search="search"
            ></group-search-board>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script type="text/javascript">
import GroupSearchBoard from "@common/molecules/group-search-board/group-search-board";
import BaseButton from "@common/atoms/base-button/base-button";
import BaseCheckbox from "@common/atoms/base-checkbox/base-checkbox";
export default {
  name: "SearchInputBoard",
  extends: {},
  props: {
    searchKeyword: {
      type: String,
      require: false
    },
    useInnerSearch: {
      type: Boolean,
      require: false,
      default: false
    },
    useRecentSearch: {
      type: Boolean,
      require: false,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {},
  components: {
    BaseCheckbox,
    BaseButton,
    GroupSearchBoard
    },
  watch: {},
  methods: {
    search(inputData) {
      this.$emit("search", inputData);
    },
    filterCheck(bool, name) {
      this.$emit("filterCheck", { bool, name });
    }
  },
  beforeCreate() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "search-input-board";
</style>
