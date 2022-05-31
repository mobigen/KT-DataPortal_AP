<template lang="html">
  <div>
    <h1>사용자 회원정보</h1>
    <p>아이디 : {{ user.userId }}</p>
    <p>이름 : {{ user.name }}</p>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "index",
  data() {
    return {
      user: {}
    };
  },
  async mounted() {
    await this.userInfo();
  },
  methods: {
    async userInfo() {
      // const user = await this.$getAuthUser();
      const user = await this.$getUser();
      this.user = user;
    }
  }
};
</script>
