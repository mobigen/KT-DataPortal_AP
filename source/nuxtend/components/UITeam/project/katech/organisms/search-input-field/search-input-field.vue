<template lang="html">
  <div class="search-input-field">
    <div class="search-input-field__inner">
      <form action="">
        <fieldset>
          <legend class="hidden">검색 정보입력</legend>
          <div class="search-input-field__search">
            <group-search></group-search>
          </div>
          <div class="search-input-field__filter">
            <base-checkbox name="filter-check" checkbox-id="check-1">
              <template v-slot:label>
                결과 내 재검색
              </template>
            </base-checkbox>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script type="text/javascript">
import GroupSearch from "@project/katech/molecules/group-search/group-search";
import BaseButton from "@project/katech/atoms/base-button/base-button";
import BaseCheckbox from "@project/katech/atoms/base-checkbox/base-checkbox";
export default {
  name: "SearchInputField",
  extends: {},
  props: {
  },
  data() {
    return {
    };
  },
  computed: {},
  components: { BaseCheckbox, BaseButton, GroupSearch },
  watch: {},
  methods: {},
  beforeCreate() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "./search-input-field.scss";
</style>
