<template lang="html">
  <div id="basicIcon">
    <span><slot /></span>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "basic-icon",
  extends: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  components: {},
  watch: {},
  methods: {},
  created() {}
};
</script>

<style lang="scss">
#basicIcon {
  margin: 5px;
  span {
    background-color: rgb(8, 73, 124);
    padding: 3px 10px;
    border-radius: 15px;
    font-weight: bold;
    color: white;
  }
}
</style>
