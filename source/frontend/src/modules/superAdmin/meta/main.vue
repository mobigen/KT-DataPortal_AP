<template lang="html">
  <div id="superAdminMain">
    <sa-header></sa-header>
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex";
import SaHeader from "@/modules/superAdmin/meta/layout/header.vue";

export default {
  name: "superAdmin-main",
  extends: {},
  props: {},
  components: { SaHeader },
  computed: {
    ...mapGetters("constants", ["CONSTANTS"])
  },
  watch: {},
  methods: {},
  created() {
    // console.log(this.CONSTANTS);
  }
};
</script>
<style lang="scss">
#superAdminMain {
  > div {
    width: 70%;
    margin: auto;
    margin-top: 40px;
  }
}
</style>
