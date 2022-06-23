<template lang="html">
  <input
    :type="type"
    class="text-input"
    @input="$emit('input', { label: labelName, input: $event.target.value })"
    @keydown="$emit('keydown', $event)"
    @keyup.enter="$emit('enterEvent')"
    :value="inputData"
    :placeholder="placeholder"
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
    labelName: {
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
