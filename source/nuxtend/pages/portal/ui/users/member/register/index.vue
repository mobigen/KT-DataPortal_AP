<template lang="html">
  <div>
    <h1>회원 등록 Main</h1>
    <nuxt />
  </div>
</template>
<script type="text/javascript">
export default {
  name: "index",
  beforeCreate() {
    this.$router.push({
      path: `${this.$config.ROUTE_USERS_PREFIX}/member/register/type`
    });
  }
};
</script>
