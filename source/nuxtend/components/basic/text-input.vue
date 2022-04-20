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
    return {};
  },
  props: {
    labelName: {
      type: String,
      require: true
    },
    inputData: {
      type: String,
      require: false
    },
    placeholder: {
      type: String,
      require: false
    }
  },
  computed: {
    input: {
      get() {
        return this.inputData;
      },
      set(newValue) {
        this.$emit("input", this.labelName, newValue);
      }
    }
  },
  components: {},
  watch: {},
  methods: {
    typing(e) {
      this.input = e.target.value;
    }
  },
  created() {}
};
</script>

<style lang="scss">
// @import ""
</style>
