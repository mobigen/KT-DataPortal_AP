<template lang="html">
  <div>
    <h1>Social 로그인</h1>
    <Dialog
      @close="close"
      @confirm="confirm"
      dialog-name="socialLoginGuide"
      :title="`간편 로그인 안내`"
      :cancelButtonText="'취소'"
      :confirmButtonText="'추가정보 입력하기'"
      :width="'500px'"
      :height="'300px'"
    >
      <div slot="body">
        <p style="color: #ff0a00">간편로그인 회원정보가 존재하지 않습니다.</p>
        간편 로그인은 네이버/구글계정으로 간편하게 로그인할 수 있는 서비스
        입니다.
        <br />
        간편 로그인에 가입되어 있지 않은 경우,
        <br />
        추가 정보 입력을 통해 SNS 계정으로 서비스를 이용할 수 있습니다.
      </div>
    </Dialog>
  </div>
</template>
<script type="text/javascript">
import { successAlert, errorAlert } from "@functional/alert/alert-default";
import Dialog from "@functional/dialog/dialog.vue";
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
      let socialUser;
      let accessToken;
      const data = await this.socialLogin();
      if (data) {
        socialUser = data.socialUser;
        accessToken = data.accessToken;
      }
      if (data === false) {
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
        this.$modal.show("socialLoginGuide");
        // 사용자 access-token 쿠키 생성
        // await this.$cookies.set("social-user", socialUser);
        // 회원가입 페이지로 이동
        // this.$router.push({
        //   path: `${this.$config.ROUTE_USERS_PREFIX}/member/register/agree`
        // });
      }
    },
    async socialLogin() {
      const data = await this.$axios.post(
        `${this.$config.API_USERS_PREFIX}/auth/social/login`,
        {
          oAuthAccessToken: this.oAuthAccessToken
        }
      );

      return data;
    },
    close(dialogName) {
      // 회원가입 페이지로 이동
      this.$router.push({
        path: `${this.$config.ROUTE_USERS_PREFIX}/member/register/agree`
      });
    },
    async confirm(dialogName) {
      this.$modal.hide("socialLoginGuide");

      // 사용자 access-token 쿠키 생성
      await this.$cookies.set("social-user", socialUser);
      // 회원가입 페이지로 이동
      this.$router.push({
        path: `${this.$config.ROUTE_USERS_PREFIX}/member/register/agree`
      });
    }
  }
};
</script>
