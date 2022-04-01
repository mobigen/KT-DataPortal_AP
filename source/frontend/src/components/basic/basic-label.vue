<template lang="html">
  <div id="simple-label">
    <label><slot></slot></label>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "basic-label",
  extends: {},
  props: {},
  computed: {},
  components: {},
  watch: {},
  methods: {},
  created() {}
};
</script>

<style lang="scss">
#simple-label {
  padding: 0px 15px;
}
</style>
