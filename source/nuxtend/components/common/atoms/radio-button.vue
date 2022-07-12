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
        :name="'group_' + labelName"
      />
      <basic-label
        :forProperty="labelName + '_' + radioButtonList[i]['label']"
        >{{ radioButtonList[i]["label"] }}</basic-label
      >
    </div>
  </div>
</template>

<script type="text/javascript">
import BasicLabel from "@common/atoms/basic-label";
export default {
  name: "radio-button",
  extends: {},
  data() {
    return {};
  },
  props: {
    radioButtonList: {
      type: Array,
      require: true
    },
    defaultValue: {
      type: [Number, String],
      require: true
    },
    labelName: {
      type: String,
      require: true
    }
  },
  computed: {
    radioValue: {
      get() {
        return this.defaultValue;
      },
      set(newValue) {
        this.$emit("changeValue", { label: this.labelName, input: newValue });
      }
    }
  },
  components: { BasicLabel },
  watch: {},
  methods: {},
  created() {}
};
</script>

<style lang="scss">
#radio-button-box {
  display: flex;
  #radio-button {
    display: flex;
    width: 300px;
    input {
      z-index: 1;
      margin: 0px -10px 0px 0px;
      height: 100%;
    }
  }
}
</style>
