<template lang="html">
  <div>
    <input
      type="text"
      class="text-input text-input--sm"
      :placeholder="placeholder"
      v-model="input"
    />
  </div>
</template>

<script type="text/javascript">
export default {
  name: "text-input",
  extends: {},
  data() {
    return {
      input: null
    };
  },
  props: {
    labelName: {
      type: String
    },
    inputData: {
      type: null
    },
    placeholder: {
      type: String
    }
  },
  computed: {},
  components: {},
  watch: {
    inputData(data) {
      this.input = data;
    },
    input(data) {
      this.$emit("input", this.labelName, data);
    }
  },
  methods: {},
  created() {
    this.input = this.inputData;
  }
};
</script>

<style lang="scss">
// @import ""
</style>
