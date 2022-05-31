<template lang="html">
  <div>
    <input
      type="number"
      class="text-input text-input--sm"
      v-model="input"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
    />
  </div>
</template>

<script type="text/javascript">
export default {
  name: "number-input",
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
      type: Number,
      require: true
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
        if (newValue === "") {
          newValue = null;
        }

        this.$emit("input", { label: this.labelName, input: Number(newValue) });
      }
    }
  },
  components: {},
  watch: {},
  methods: {},
  created() {}
};
</script>

<style lang="scss">
// @import ""
</style>
