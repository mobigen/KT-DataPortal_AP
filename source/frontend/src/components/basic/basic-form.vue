<template lang="html">
  <div>
    <!-- 
    <div
      v-for="(data, i) in columnList"
      :key="'input_box_' + i"
      class="input-box"
    >
      <simple-label>{{ columnList[i] }}</simple-label>
      <text-input
        placeholder="내용을 입력해주세요"
        :inputData="formData[columnList[i]]"
      ></text-input>
    </div>
    -->
    <div>
      <div class="input-box">
        <basic-label>컬럼리스트</basic-label>
        <text-input :placeholder="placeholder"></text-input>
      </div>

      <basic-button @click="add" buttonCss="text-button">저장</basic-button>
    </div>
  </div>
</template>

<script type="text/javascript">
import BasicButton from "@/components/basic/basic-button.vue";
import BasicLabel from "@/components/basic/basic-label.vue";
import TextInput from "@/components/basic/text-input.vue";
export default {
  name: "basic-form",
  extends: {},
  props: {
    placeholder: {
      type: String,
      default: "내용을 입력해주세요."
    }
  },
  computed: {},
  components: { BasicButton, BasicLabel, TextInput },
  watch: {},
  methods: {
    add() {
      alert("add");
      //this.addMetaName(data);
    }
  },
  created() {}
};
</script>

<style lang="scss">
.input-box {
  display: flex;
  margin: 10px 0px;
}
</style>
