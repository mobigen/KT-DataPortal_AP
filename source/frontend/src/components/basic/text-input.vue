<template lang="html">
  <div>
    <input
      type="text"
      class="text-input text-input--sm"
      :placeholder="placeholder"
      @input="typing"
      :value="input"
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
    }
  },
  methods: {
    typing(e) {
      this.input = e.target.value;
      this.$emit("input", this.labelName, this.input);
    }
  },
  created() {}
};
</script>

<style lang="scss">
// @import ""
</style>
