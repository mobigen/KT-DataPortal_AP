<template lang="html">
  <div id="admin">
    <h1>ADMIN.vue</h1>
    <axios-interceptor />
    <!-- axios interceptor은 nuxt-child보다 위에 있어야 함-->
    <nuxt-child />
    <json-viwer />
  </div>
</template>

<script type="text/javascript">
export default {
  name: "admin",
  extends: {},
  props: {},
  computed: {},
  components: {},
  watch: {},
  methods: {}
};
</script>
<style>
#admin {
  background-color: #f7f9fc;
  width: 70%;
  margin: auto;
}
</style>
