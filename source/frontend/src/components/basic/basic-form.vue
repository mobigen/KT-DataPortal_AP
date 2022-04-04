<template lang="html">
  <div>
    dataObject:{{ dataObject }} changeDataObject : {{ changeDataObject }}
    <div>
      <div
        class="input-box"
        v-for="(data, i) in headerList"
        :key="'input_box_' + i"
      >
        <basic-label>{{ data["column_name"] }}</basic-label>
        <text-input
          :placeholder="placeholder"
          :labelName="data['column_name']"
          :inputData="changeDataObject[data['column_name']]"
          @input="changeData"
        ></text-input>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import BasicLabel from "@/components/basic/basic-label.vue";
import TextInput from "@/components/basic/text-input.vue";

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
    mainKey: {
      type: String,
      require: true
    }
  },
  computed: {},
  components: { BasicLabel, TextInput },
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
