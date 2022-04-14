<template lang="html">
  <div id="superAdmin">
    <axios-interceptor />
    <nuxt-child />
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
  width: 70%;
  margin: auto;
}
</style>
