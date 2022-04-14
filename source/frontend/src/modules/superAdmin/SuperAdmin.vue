<template lang="html">
  <div id="superAdmin">
    <router-view></router-view>
    <axios-interceptor />
    <json-viwer />
  </div>
</template>

<script type="text/javascript">
export default {
  name: "SuperAdmin",
  extends: {},
  props: {},
  computed: {},
  components: {},
  watch: {},
  methods: {}
};
</script>
<style>
#superAdmin {
  background-color: #f7f9fc;
}
</style>
