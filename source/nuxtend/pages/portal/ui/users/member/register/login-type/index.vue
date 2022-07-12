<template lang="html">
  <div>
    <h1>회원가입(등록 구분)</h1>
    <p>
      <button @click.prevent="onMemberRegister()">회원가입</button>
    </p>
    <p>
      <button @click.prevent="onSocialLogin('naver')">네이버 회원가입</button>
    </p>
    <p>
      <button @click.prevent="onSocialLogin('kakao')">카카오 회원가입</button>
    </p>
    <p>
      <button @click.prevent="onSocialLogin('google')">구글 회원가입</button>
    </p>
  </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from "vuex";
import { successAlert, errorAlert } from "@functional/alert/alert-default";
export default {
  name: "index",
  beforeMount() {
    this.init();
  },
  computed: {},
  methods: {
    ...mapActions("users/user", ["setPrevFullUrl"]),
    ...mapActions("users/memberRegster", [
      "clearEmailAthn",
      "clearSocialUser",
      "clearMemberRegisterInfo"
    ]),
    async init() {
      // 이메일 인증 정보 CLEAR
      this.clearEmailAthn();
      // SOCIAL 사용자 정보 CLEAR
      this.clearSocialUser();
      // 회원가입 정보 CLEAR
      this.clearMemberRegisterInfo();
    },
    onMemberRegister() {
      this.$router.push({
        path: `${this.$config.ROUTE_USERS_PREFIX}/member/register/email-athn`
      });
    },
    async onSocialLogin(socialType) {
      await this.setPrevPage();
      await this.$cookies.set("socialLoginType", "register");

      location.href =
        `${this.$config.API_USERS_PREFIX}/oauth2/authorization/` + socialType;
    },
    async setPrevPage() {
      await this.setPrevFullUrl(this.$route.fullPath);
    }
  }
};
</script>
