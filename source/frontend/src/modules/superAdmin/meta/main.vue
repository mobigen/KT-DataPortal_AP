<template lang="html">
  <div>
    SUPER ADMIN
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex";

export default {
  name: "superAdmin-main",
  extends: {},
  props: {},
  components: {},
  computed: {
    ...mapGetters("constants", ["CONSTANTS"])
  },
  watch: {},
  methods: {},
  created() {
    console.log(this.CONSTANTS);
  }
};
</script>
<style></style>
