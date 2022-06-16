<template lang="html">
  <div>
    <h1>회원가입완료</h1>
    <p>이름 : {{ user.userNm }}</p>
    <p>이메일 : {{ user.email }}</p>
    <p><button @click.prevent="onHome()">홈으로</button></p>
  </div>
</template>
<script type="text/javascript">
import { errorAlert } from "@functional/alert/alert-default";
export default {
  name: "index",
  data() {
    return {
      user: {
        userSeq: null,
        email: null,
        userNm: null
      }
    };
  },
  async beforeMount() {
    console.log("beforeMount : ", this.$route);
    const userSeq = this.$route.query.userSeq;
    if (!userSeq) {
      await errorAlert("비정상적인 접근입니다.");
      this.onHome();
      return false;
    }
    await this.userInfo(userSeq);
  },
  mounted() {},
  methods: {
    onHome() {
      this.$router.push({
        path: `${this.$config.USER_INDEX_PAGE}`
      });
    },
    async userInfo(userSeq) {
      const param = {
        userSeq: userSeq
      };
      const user = await this.$getUserInfo(param);
      this.user = user;
    }
  }
};
</script>
