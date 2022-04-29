<template lang="html">
  <div id="searchBox">
    <text-input
      labelName=""
      :inputData="searchData"
      placeholder="검색어를 입력해주세요"
      @input="setInputData"
      @enterEvent="search"
    />

    <basic-button
      componentId=""
      buttonCss="icon-button"
      :underline="false"
      :hoverColor="false"
      @click="search"
      >검색</basic-button
    >
  </div>
</template>

<script type="text/javascript">
import TextInput from "@/components/aiPlatform/basic/text-input.vue";
import BasicButton from "@/components/aiPlatform/basic/basic-button.vue";
export default {
  name: "basic-search-bar",
  extends: {},
  data() {
    return {
      inputData: ""
    };
  },
  props: {
    searchKeyword: {
      type: String,
      require: false
    }
  },
  computed: {
    searchData: {
      get() {
        this.inputData = this.searchKeyword;
        return this.searchKeyword;
      }
    }
  },
  components: { TextInput, BasicButton },
  watch: {},
  methods: {
    search() {
      this.$emit("search", this.inputData);
    },
    setInputData(labelName, input) {
      this.inputData = input;
    }
  },
  created() {}
};
</script>

<style lang="scss">
#searchBox {
  display: grid;
  grid-template-columns: 1fr 50px;
  border: 1px solid lightslategray;
  width: 400px;
  height: 40px;
  input {
    font-size: 16px;
    padding: 10px;
    border: 0px;
    outline: none;
  }
  button {
    width: 100%;
    height: 100%;
    background: lightslategray;
    color: #ffffff;
    margin: 0px;
  }
}
</style>
