<template lang="html">
  <div id="basicLabel">
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
#basicLabel {
  padding: 0 15px;
}
</style>
