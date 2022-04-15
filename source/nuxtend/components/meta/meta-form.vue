<template lang="html">
  <div>
    <div
      class="input-box"
      v-for="(data, i) in headerList"
      :key="'input_box_' + i"
    >
      <basic-label forProperty="">{{ data["column_name"] }}</basic-label>

      <text-input
        v-if="formInputType[data['column_name']] === 'text'"
        :placeholder="placeholder"
        :labelName="data['column_name']"
        :inputData="changeDataObject[data['column_name']]"
        @input="changeData"
      ></text-input>

      <number-input
        v-else-if="formInputType[data['column_name']] === 'number'"
        :placeholder="placeholder"
        :labelName="data['column_name']"
        :inputData="changeDataObject[data['column_name']]"
        @input="changeData"
      ></number-input>

      <radio-button
        v-else-if="formInputType[data['column_name']] === 'radio'"
        :radioButtonList="metaTypeList"
        :labelName="data['column_name']"
        :inputData="changeDataObject[data['column_name']]"
        @input="changeData"
      ></radio-button>
    </div>
  </div>
</template>

<script type="text/javascript">
import BasicLabel from "@/components/basic/basic-label.vue";
import TextInput from "@/components/basic/text-input.vue";
import NumberInput from "@/components/basic/number-input.vue";
import RadioButton from "@/components/basic/radio-button.vue";

export default {
  name: "meta-form",
  extends: {},
  data() {
    return {
      changeDataObject: {},
      metaTypeList: [
        { value: 0, label: "text" },
        { value: 1, label: "int" },
        { value: 2, label: "binary" }
      ]
    };
  },
  props: {
    headerList: {
      type: Array,
      require: true
    },
    dataObject: {
      type: Object,
      require: true
    },
    placeholder: {
      type: String,
      require: false,
      default: "내용을 입력해주세요."
    },
    rowKey: {
      type: String,
      require: true
    },
    formInputType: {
      type: Object,
      require: true
    }
  },
  computed: {},
  components: { BasicLabel, TextInput, NumberInput, RadioButton },
  watch: {
    dataObject(data) {
      this.changeDataObject = data;
    }
  },
  methods: {
    changeData(label, input) {
      // Object나 Array의 변동사항을 감지하기 위해 this.$set 사용
      this.$set(this.changeDataObject, label, input);

      this.$emit("changeData", this.changeDataObject);
    }
  },
  created() {}
};
</script>

<style lang="scss">
.input-box {
  display: flex;
  margin: 10px 0;
  > div:first-child {
    width: 20%;
  }
  > div:last-child {
    width: 40%;
  }
}
</style>
