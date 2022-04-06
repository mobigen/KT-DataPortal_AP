<template lang="html">
  <div>
    {{ inputType }}
    <input
      :type="inputType"
      class="text-input text-input--sm"
      :placeholder="placeholder"
      v-model="input"
      @keyup="dataChanged"
    />
  </div>
</template>

<script type="text/javascript">
export default {
  name: "basic-input",
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
    },
    inputType: {
      type: String,
      require: true,
      default: "text"
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
    dataChanged() {
      this.$emit("input", this.labelName, this.input);
    }
  },
  created() {}
};
</script>

<style lang="scss">
// @import ""
</style>
