<template lang="html">
  <div>
    <div>
      <div
        class="input-box"
        v-for="(data, i) in headerList"
        :key="'input_box_' + i"
      >
        <basic-label>{{ data["column_name"] }}</basic-label>
        <basic-input
          :placeholder="placeholder"
          :labelName="data['column_name']"
          :inputData="changeDataObject[data['column_name']]"
          @input="changeData"
        ></basic-input>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import BasicLabel from "@/components/basic/basic-label.vue";
import BasicInput from "@/components/basic/basic-input.vue";

export default {
  name: "basic-form",
  extends: {},
  data() {
    return {
      changeDataObject: {}
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
      default: "내용을 입력해주세요."
    },
    rowKey: {
      type: String,
      require: true
    }
  },
  computed: {},
  components: { BasicLabel, BasicInput },
  watch: {
    dataObject(data) {
      this.changeDataObject = data;
    }
  },
  methods: {
    changeData(label, input) {
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
  margin: 10px 0px;
  div:first-child {
    width: 20%;
  }
  div:last-child {
    width: 20%;
  }
}
</style>
