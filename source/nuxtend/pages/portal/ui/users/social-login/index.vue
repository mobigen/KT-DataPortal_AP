<template lang="html">
  <div>
    <h1>Social 로그인</h1>
  </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from "vuex";
export default {
  name: "index",
  data() {
    return {
      oAuthAccessToken: null
    };
  },
  beforeMount() {
    let urlParams = new URLSearchParams(window.location.search);
    this.oAuthAccessToken = urlParams.get("oAuthAccessToken");
    if (this.oAuthAccessToken) {
      this.checkSocialMember();
    }
  },
  computed: {
    ...mapGetters("users/user", ["getterPrevFullUrl"])
  },
  methods: {
    ...mapActions("users/user", ["getAuthenticatedUser"]),
    ...mapActions("users/user", ["setPrevFullUrl"]),
    async checkSocialMember() {
      const accessToken = await this.socialLogin();
      if (accessToken === false) {
        // 이전 페이지로 이동하게 처리 해야함.
        await this.$router.push({
          path: `${this.$config.USER_LOGIN_PAGE}`
        });
        return false;
      }
      if (accessToken) {
        // 사용자 access-token 쿠키 생성
        await this.$cookies.set(
          this.$config.USER_ACCESS_TOKEN_NAME,
          accessToken
        );

        // 사용자 정보 store 저장
        await this.getAuthenticatedUser();
        // 로그인 성공 후 페이지 이동
        if (this.getterPrevFullUrl) {
          await this.$router.push({ path: `${this.getterPrevFullUrl}` });
        } else {
          await this.$router.push({ path: `${this.$config.USER_INDEX_PAGE}` });
        }
        // 이전 페이지 정보 store 삭제
        this.setPrevFullUrl(null);
      } else {
        // 회원가입 페이지로 이동
        this.$router.push({
          path: `${this.$config.ROUTE_USERS_PREFIX}/member/register/agree`
        });
      }
    },
    async socialLogin() {
      const accessToken = await this.$axios.post(
        `${this.$config.API_USERS_PREFIX}/auth/social/login`,
        {
          oAuthAccessToken: this.oAuthAccessToken
        }
      );

      return accessToken;
    }
  }
};
</script>
