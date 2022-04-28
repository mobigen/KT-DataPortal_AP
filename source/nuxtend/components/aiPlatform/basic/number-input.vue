<template lang="html">
  <div>
    <input
      type="number"
      class="text-input text-input--sm"
      :placeholder="placeholder"
      v-model="input"
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

        this.$emit("input", this.labelName, Number(newValue));
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
