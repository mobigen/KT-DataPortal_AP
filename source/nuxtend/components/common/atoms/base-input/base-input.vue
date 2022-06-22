<template lang="html">
  <input
    type="text"
    class="text-input"
    @input="$emit('input', { id: id, input: $event.target.value })"
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
      require: false
    },
    id: {
      type: String,
      require: false
    },
    inputData: {
      type: String,
      require: false
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
