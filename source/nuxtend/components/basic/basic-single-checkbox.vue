<template>
  <div>
    <input
      id="single-checkbox"
      type="checkbox"
      :name="labelName"
      :value="labelName"
      @change="changeData($event)"
    /><label for="single-checkbox">{{ checkboxLabel }}</label>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "basic-input",
  extends: {},
  props: {
    checkboxLabel: {
      type: String,
      require: false
    },
    labelName: {
      type: String,
      require: true
    }
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    changeData(event) {
      this.$emit("changeData", event.target.checked);
    }
  },
  created() {}
};
</script>
