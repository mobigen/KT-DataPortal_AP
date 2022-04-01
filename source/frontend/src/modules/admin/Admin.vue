<template lang="html">
  <div id="admin">
    <router-view></router-view>
    <axios-interceptor />
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
