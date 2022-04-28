<template lang="html">
  <div>
    <radio-button
      :radioButtonList="radioButtonList"
      :labelName="labelName"
      :defaultValue="defaultValue"
      @changeValue="changeValue"
    ></radio-button>
    <basic-search-bar @search="searchClick" searchKeyword="" />
  </div>
</template>

<script type="text/javascript">
import RadioButton from "@/components/basic/radio-button.vue";
import BasicSearchBar from "@/components/basic/basic-search-bar.vue";
export default {
  name: "radio-search-bar",
  extends: {},
  props: {
    radioButtonList: {
      type: Array,
      require: false
    },
    labelName: {
      type: String,
      require: true
    },
    defaultValue: {
      type: Number,
      require: false
    }
  },
  data() {
    return {
      radioValue: this.defaultValue
    };
  },
  computed: {},
  components: { RadioButton, BasicSearchBar },
  watch: {},
  methods: {
    changeValue(label, value) {
      this.radioValue = value;
    },
    searchClick(inputData) {
      this.$emit("searchClick", this.radioValue, inputData);
    }
  },
  created() {}
};
</script>

<style lang="scss">
// @import ""
</style>
