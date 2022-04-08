<template lang="html">
  <div>
    <input
      type="number"
      class="text-input text-input--sm"
      :placeholder="placeholder"
      v-model.number="input"
    />
  </div>
</template>

<script type="text/javascript">
export default {
  name: "number-input",
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
  created() {}
};
</script>

<style lang="scss">
// @import ""
</style>
