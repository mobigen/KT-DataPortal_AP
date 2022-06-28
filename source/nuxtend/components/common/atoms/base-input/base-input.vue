<template lang="html">
  <input
    :type="type"
    class="text-input"
    @input="$emit('input', { id: id, input: $event.target.value })"
    @keydown="$emit('keydown', $event)"
    @keyup.enter="$emit('enterEvent')"
    :value="inputData"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
  />
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
      required: false
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
    return {
      data: null
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {},
  beforeCreate() {},
  mounted() {}
};
</script>

<style lang="scss">
@import "base-input";
</style>
