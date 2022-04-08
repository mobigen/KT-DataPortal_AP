<template lang="html">
  <div id="radio-button-box">
    <div
      id="radio-button"
      v-for="(data, i) in radioButtonList"
      :key="'radio_button_' + i"
    >
      <input
        type="radio"
        :id="labelName + '_' + radioButtonList[i]['label']"
        :value="radioButtonList[i]['value']"
        v-model="radioValue"
      />
      <basic-label
        :forProperty="labelName + '_' + radioButtonList[i]['label']"
        >{{ radioButtonList[i]["label"] }}</basic-label
      >
    </div>
  </div>
</template>

<script type="text/javascript">
import BasicLabel from "@/components/basic/basic-label";
export default {
  name: "radio-button",
  extends: {},
  data() {
    return {
      radioValue: null
    };
  },
  props: {
    radioButtonList: {
      type: Array,
      require: true
    },
    inputData: {
      type: Number,
      require: true
    },
    labelName: {
      type: String,
      require: true
    }
  },
  computed: {},
  components: { BasicLabel },
  watch: {
    inputData(data) {
      this.radioValue = data;
    },
    radioValue(data) {
      this.$emit("input", this.labelName, data);
    }
  },
  methods: {},
  created() {
    this.radioValue = this.inputData;
  }
};
</script>

<style lang="scss">
#radio-button-box {
  display: flex;
  #radio-button {
    display: flex;
    input {
      z-index: 1;
      margin: 0px -10px 0px 0px;
      height: 100%;
    }
  }
}
</style>
