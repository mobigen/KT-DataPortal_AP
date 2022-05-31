<template lang="html">
  <div>
    <input
      type="text"
      class="text-input text-input--sm"
      @input="typing"
      :value="input"
      @keyup.enter="enterEvent"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
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
      require: false
    },
    inputData: {
      type: String,
      require: false
    },
    placeholder: {
      type: String,
      require: false
    },
    disabled: {
      type: Boolean,
      require: false
    },
    readonly: {
      type: Boolean,
      require: false
    }
  },
  computed: {
    input: {
      get() {
        return this.inputData;
      },
      set(newValue) {
        this.$emit("input", { label: this.labelName, input: newValue });
      }
    }
  },
  components: {},
  watch: {},
  methods: {
    typing(e) {
      this.input = e.target.value;
    },
    enterEvent() {
      this.$emit("enterEvent");
    }
  },
  created() {}
};
</script>

<style lang="scss">
// @import ""
</style>
