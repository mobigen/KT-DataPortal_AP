<template lang="html">
  <div id="simple-label">
    <label :for="forProperty"><slot></slot></label>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "basic-label",
  extends: {},
  props: {
    forProperty: {
      type: String,
      require: false
    }
  },
  computed: {},
  components: {},
  watch: {},
  methods: {},
  created() {}
};
</script>

<style lang="scss">
#simple-label {
  padding: 0 15px;
}
</style>
