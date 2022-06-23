<template lang="html">
  <div>
    <h1>Social 로그인 Fail</h1>
  </div>
</template>
<script type="text/javascript">
import { mapActions } from "vuex";
export default {
  name: "index",
  beforeMount() {
    this.init();
  },
  methods: {
    ...mapActions("users/memberRegster", ["clearSocialUser"]),
    init() {
      this.clearSocialUser();
    }
  }
};
</script>
