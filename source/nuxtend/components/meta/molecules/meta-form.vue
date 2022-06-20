<template lang="html">
  <div>
    <div
      class="input-box"
      v-for="(data, i) in labelList"
      :key="'input_box_' + i"
    >
      <basic-label forProperty="">{{
        getHeaderLocale(data["column_name"])
      }}</basic-label>

      <basic-input
        :formInputType="formInputType[data['column_name']]"
        :radioButtonList="metaTypeList"
        :labelName="data['column_name']"
        :inputData="changeDataObject[data['column_name']]"
        :placeholder="placeholder"
        @changeData="changeData"
      ></basic-input>
    </div>
  </div>
</template>

<script type="text/javascript">
import BasicLabel from "@component/aiPlatform/basic/basic-label.vue";
import BasicInput from "@component/aiPlatform/basic/basic-input.vue";

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
  components: { BasicLabel, BasicInput },
  watch: {},
  methods: {
    changeData({ label, input }) {
      // Object나 Array의 변동사항을 감지하기 위해 this.$set 사용
      this.$set(this.changeDataObject, label, input);

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
  > div:first-child {
    width: 20%;
  }
  > div:last-child {
    width: 40%;
  }
}
</style>
