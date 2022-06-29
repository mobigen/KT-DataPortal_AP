<template lang="html">
  <div>
    <div
      class="input-box"
      v-for="(data, i) in labelList"
      :key="'input_box_' + i"
    >
      <label for="">{{ getHeaderLocale(data["column_name"]) }}</label>

      <template v-if="formInputType[data['column_name']] !== 'radio'">
        <base-input
          :id="'inp-metaName-0' + (i + 1)"
          :labelName="data['column_name']"
          :inputData="changeDataObject[data['column_name']]"
          :type="formInputType[data['column_name']]"
          :placeholder="placeholder"
          @input="changeData"
        ></base-input>
      </template>

      <template v-else>
        <base-radio
          v-for="(rd, ri) in metaTypeList"
          :key="'radio_metaName_' + ri"
          :name="'radio-metaName-' + data['column_name']"
          :labelName="data['column_name']"
          :radioId="'radio-' + rd['label']"
          :checked="ri === 0"
          :value="rd['value']"
          @checkValue="changeData"
        >
          <template v-slot:label>
            {{ rd["label"] }}
          </template>
        </base-radio>
      </template>
    </div>
  </div>
</template>

<script type="text/javascript">
import BaseInput from "@common/atoms/base-input/base-input";
import BaseRadio from "@common/atoms/base-radio/base-radio";

export default {
  name: "meta-form",
  extends: {},
  data() {
    return {
      metaTypeList: [
        { value: 0, label: "text" },
        { value: 1, label: "int" },
        { value: 2, label: "binary" }
      ]
    };
  },
  props: {
    labelList: {
      type: Array,
      require: true
    },
    headerLocale: {
      type: Object,
      require: false,
      default: () => {
        return {};
      }
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
  computed: {
    changeDataObject: {
      get() {
        return JSON.parse(JSON.stringify(this.dataObject));
      }
    }
  },
  components: { BaseInput, BaseRadio },
  watch: {},
  methods: {
    changeData({ label, input }) {
      // Object나 Array의 변동사항을 감지하기 위해 this.$set 사용
      this.$set(this.changeDataObject, label, input);

      console.log(this.changeDataObject);
      this.$emit("changeData", this.changeDataObject);
    },
    getHeaderLocale(headerEngNm) {
      return Object.prototype.hasOwnProperty.call(
        this.headerLocale,
        headerEngNm
      )
        ? this.headerLocale[headerEngNm]
        : headerEngNm;
    }
  },
  created() {}
};
</script>

<style lang="scss">
.input-box {
  display: flex;
  margin: 10px 0;
  label {
    width: 20%;
  }
  input {
    width: 40%;
  }
  .radio {
    padding-right: 30px;
  }
}
</style>
