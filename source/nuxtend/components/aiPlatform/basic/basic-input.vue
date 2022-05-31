<template>
  <div>
    <text-input
      v-if="formInputType === 'text'"
      :placeholder="placeholder"
      :labelName="labelName"
      :inputData="inputData"
      @input="changeData"
      :disabled="false"
      :readonly="false"
    ></text-input>

    <number-input
      v-else-if="formInputType === 'number'"
      :placeholder="placeholder"
      :labelName="labelName"
      :inputData="inputData"
      @input="changeData"
      :disabled="false"
      :readonly="false"
    ></number-input>

    <radio-button
      v-else-if="formInputType === 'radio'"
      :radioButtonList="radioButtonList"
      :labelName="labelName"
      :defaultValue="inputData"
      @changeValue="changeData"
    ></radio-button>
  </div>
</template>

<script type="text/javascript">
import TextInput from "@/components/aiPlatform/basic/text-input.vue";
import NumberInput from "@/components/aiPlatform/basic/number-input.vue";
import RadioButton from "@/components/aiPlatform/basic/radio-button.vue";

export default {
  name: "basic-input",
  extends: {},
  props: {
    formInputType: {
      type: String,
      require: true
    },
    radioButtonList: {
      type: Array,
      require: false
    },
    labelName: {
      type: String,
      require: true
    },
    inputData: {
      type: [Number, String],
      require: false
    },
    placeholder: {
      type: String,
      require: false,
      default: "내용을 입력해주세요."
    }
  },
  computed: {},
  components: { TextInput, NumberInput, RadioButton },
  watch: {},
  methods: {
    changeData({ label, input }) {
      this.$emit("changeData", label, input);
    }
  },
  created() {}
};
</script>
