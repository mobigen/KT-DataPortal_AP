<template lang="html">
  <div>
    <template v-for="(value, key, index) in complexCheckboxList">
      <basic-checkbox
        :checkboxKey="key"
        :checkboxTitle="value['label']"
        :checkboxData="value['dataList']"
        :selectCheckboxList="selectCheckboxList[key]['dataList']"
        :checkboxColumnCount="columnCount(index)"
        @changeCheckboxList="changeCheckboxList"
      ></basic-checkbox>
    </template>
  </div>
</template>

<script type="text/javascript">
import BasicCheckbox from "@/components/aiPlatform/basic/basic-checkbox.vue";
export default {
  name: "complex-checkbox",
  extends: {},
  props: {
    checkboxColumnCount: { type: Array, require: false },
    complexCheckboxList: {
      type: Object,
      require: true
    },
    selectCheckboxList: {
      type: Object,
      require: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  components: { BasicCheckbox },
  watch: {},
  methods: {
    changeCheckboxList(checkboxKey, checkboxList) {
      this.$emit("changeCheckboxList", checkboxKey, checkboxList);
    },
    columnCount(index) {
      return this.checkboxColumnCount ? this.checkboxColumnCount[index] : 1;
    }
  },
  created() {}
};
</script>

<style lang="scss">
// @import ""
</style>
