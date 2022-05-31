<template lang="html">
  <div id="BasicTextarea">
    <textarea
      v-model="input"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
    >
    </textarea>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "basic-textarea",
  extends: {},
  props: {
    inputData: {
      type: String,
      require: false
    },
    labelName: {
      type: String,
      require: false
    },
    placeholder: {
      type: String,
      require: false,
      default: "내용을 입력해주세요."
    },
    disabled: {
      type: Boolean,
      require: false,
      default: false
    },
    readonly: {
      type: Boolean,
      require: false,
      default: false
    },
    maxlength: {
      type: String,
      require: false
    }
  },
  data() {
    return {};
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
  methods: {},
  created() {}
};
</script>

<style lang="scss">
textarea {
  resize: none;
  width: 100%;
  height: 150px;
  padding: 20px;
}
</style>
