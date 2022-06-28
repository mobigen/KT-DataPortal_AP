<template lang="html">
  <div>
    <h1>회원가입완료</h1>
    <p>이름 : {{ user.userNm }}</p>
    <p>이메일 : {{ user.email }}</p>
    <p><button @click.prevent="onHome()">홈으로</button></p>
  </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from "vuex";
import { errorAlert } from "@functional/alert/alert-default";
export default {
  name: "index",
  data() {
    return {
      user: {
        userUuid: null,
        email: null,
        userNm: null
      }
    };
  },
  async beforeMount() {
    const userUuid = this.$route.query.userUuid;
    if (!userUuid) {
      await errorAlert({ content: "비정상적인 접근입니다." });
      this.onHome();
      return false;
    }
    await this.userInfo(userUuid);
  },
  destroyed() {
    this.clearEmailAthn();
    this.clearSocialUser();
    this.clearMemberRegisterInfo();
  },
  methods: {
    ...mapActions("users/memberRegster", [
      "clearEmailAthn",
      "clearSocialUser",
      "clearMemberRegisterInfo"
    ]),
    onHome() {
      this.$router.push({
        path: `${this.$config.USER_INDEX_PAGE}`
      });
    },
    async userInfo(userUuid) {
      const param = {
        userUuid: userUuid
      };
      const user = await this.$getUserInfo(param);
      this.user = user;
    }
  }
};
</script>
