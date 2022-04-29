<template>
  <div>
    <input
      :id="labelName"
      type="checkbox"
      :name="labelName"
      v-model="checkedData"
    /><label :for="labelName">{{ checkboxLabel }}</label>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "basic-single-checkbox",
  extends: {},
  props: {
    checkboxLabel: {
      type: String,
      require: false
    },
    labelName: {
      type: String,
      require: true
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    checkedData: {
      get() {
        return this.checked;
      },
      set(newValue) {
        this.$emit("changeData", newValue, this.labelName);
      }
    }
  },
  components: {},
  watch: {},
  methods: {},
  created() {}
};
</script>
