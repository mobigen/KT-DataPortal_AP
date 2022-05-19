<template lang="html">
  <div>
    <h1>관리자 회원정보</h1>
    <p>아이디 : {{ user.userId }}</p>
    <p>이름 : {{ user.name }}</p>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "index",
  data() {
    return {
      user : {}
    }
  },
  async mounted() {
    await this.adminUserInfo();
  },
  methods: {
    async adminUserInfo() {
      const user = await this.$getAdminUser();
      this.user = user;

    },
  }
}
</script>