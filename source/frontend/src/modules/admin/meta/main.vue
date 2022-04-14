<template lang="html">
  <div id="adminMain">
    <!-- superAdmin header 이므로 다음에 변경해야함 -->
    <sa-header></sa-header>
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
import SaHeader from "@/modules/superAdmin/meta/layout/header.vue";
export default {
  name: "admin-main",
  extends: {},
  props: {},
  computed: {},
  components: { SaHeader },
  watch: {},
  methods: {}
};
</script>
<style lang="scss">
#adminMain {
  > div {
    width: 70%;
    margin: auto;
    margin-top: 40px;
  }
}
</style>
