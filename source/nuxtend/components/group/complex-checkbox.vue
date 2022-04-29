<template lang="html">
  <div>
    <template v-for="(data, i) in complexCheckboxList">
      <basic-checkbox
        :componentId="data['label'] + '_' + i"
        :checkboxTitle="data['label']"
        :checkboxData="data[checkboxKey.listName]"
        :selectCheckboxList="data[checkboxKey.selectListName]"
        :checkboxColumnCount="columnCount(i)"
        @changeCheckboxList="changeCheckboxList"
      ></basic-checkbox>
    </template>
  </div>
</template>

<script type="text/javascript">
import BasicCheckbox from "@/components/basic/basic-checkbox.vue";
export default {
  name: "complex-checkbox",
  extends: {},
  props: {
    checkboxKey: {
      type: Object,
      require: true
    },
    checkboxColumnCount: { type: Array, require: false },
    complexCheckboxList: {
      type: Array,
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
    changeCheckboxList(componentId, checkboxList) {
      const index = componentId.split("_").pop();
      this.$emit("changeCheckboxList", index, checkboxList);
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
