<template lang="html">
  <input
    :type="type"
    class="text-input"
    @input="input = $event.target.value"
    @keydown="$emit('keydown', $event)"
    @keyup.enter="$emit('enterEvent')"
    :value="input"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
  />
  <!-- $emit('input', { id: id, input: $event.target.value }) -->
</template>

<script type="text/javascript">
export default {
  name: "BaseInput",
  extends: {},
  props: {
    placeholder: {
      type: String,
      required: false
    },
    id: {
      type: String,
      required: false
    },
    inputData: {
      type: [Number, String],
      required: false,
      default: ""
    },
    type: {
      type: String,
      required: false,
      default: "text"
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    readonly: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    input: {
      get() {
        if (this.inputData) {
          this.$emit("input", { id: this.id, input: this.inputData });
        }
        return this.inputData;
      },
      set(newValue) {
        this.$emit("input", { id: this.id, input: newValue });
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
  beforeCreate() {},
  mounted() {}
};
</script>

<style lang="scss">
@import "base-input";
</style>
