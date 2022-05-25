<template lang="html">
  <div>
    <h3>api-router form</h3>
    <div>FORM</div>

    <basic-button
      componentId=""
      buttonCss="text-button"
      :underline="false"
      :hoverColor="false"
      @click="addObject"
      >저장</basic-button
    >
  </div>
</template>

<script type="text/javascript">
import BasicButton from "@component/aiPlatform/basic/basic-button.vue";

export default {
  name: "apiRouter-form",
  extends: {},
  props: {},
  data() {
    return {
      apiName: null
    };
  },
  computed: {},
  components: { BasicButton },
  watch: {},
  methods: {
    async addObject() {
      if (this.apiName) {
        // 수정
        this.editApi();
      } else {
        this.addApi();
      }
    },
    addApi() {
      console.log("addApi");
    },
    editApi() {
      console.log("editApi");
    }
  },
  created() {
    this.apiName = this.$route.query.apiName;
    console.log(this.apiName);
  }
};
</script>

<style lang="scss">
// @import ""
</style>
