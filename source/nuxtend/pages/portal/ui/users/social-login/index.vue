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
import { mapGetters, mapActions } from "vuex";
import { successAlert, errorAlert } from "@functional/alert/alert-default";
import Dialog from "@functional/dialog/dialog.vue";
export default {
  name: "index",
  data() {
    return {
      oAuthAccessToken: null,
      socialUser: null
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
    ...mapGetters("users/user", ["getPrevFullUrl"])
  },
  methods: {
    ...mapActions("users/user", ["getAuthenticatedUser", "setPrevFullUrl"]),
    // ...mapActions("users/user", ["setPrevFullUrl"]),
    ...mapActions("users/memberRegster", ["setSocialUser", "clearSocialUser"]),
    async checkSocialMember() {
      let accessToken;
      let socialType = "";
      if (this.getPrevFullUrl.indexOf(`${this.$config.USER_LOGIN_PAGE}`) > -1) {
        socialType = "login";
      } else {
        socialType = "register";
      }
      const data = await this.socialLogin(socialType);
      if (data) {
        this.socialUser = data.socialUser;
        accessToken = data.accessToken;
      }
      if (data === false) {
        if (this.getPrevFullUrl) {
          await this.$router.push({ path: `${this.getPrevFullUrl}` });
        } else {
          await this.$router.push({
            path: `${this.$config.USER_LOGIN_PAGE}`
          });
        }
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
        if (
          this.getPrevFullUrl &&
          this.getPrevFullUrl.indexOf(`${this.$config.USER_LOGIN_PAGE}`) < 0
        ) {
          await this.$router.push({ path: `${this.getPrevFullUrl}` });
        } else {
          await this.$router.push({ path: `${this.$config.USER_INDEX_PAGE}` });
        }
        // 이전 페이지 정보 store 삭제
        this.setPrevFullUrl(null);
      } else {
        this.$modal.show("socialLoginGuide");
      }
    },
    async socialLogin(socialType) {
      const config = {
        params: {
          oAuthAccessToken: this.oAuthAccessToken,
          socialType: socialType
        }
      };

      const data = await this.$axios.get(
        `${this.$config.ROUTE_API_USERS_PREFIX}/auth/socialLogin`,
        config
      );

      return data;
    },
    async close(dialogName) {
      // SOCIAL 사용자 정보 CLEAR
      await this.clearSocialUser();

      if (this.getPrevFullUrl) {
        await this.$router.push({ path: `${this.getPrevFullUrl}` });
      } else {
        // 회원가입 페이지로 이동
        this.$router.push({
          path: `${this.$config.ROUTE_USERS_PREFIX}/member/register`
        });
      }
    },
    async confirm(dialogName) {
      this.$modal.hide("socialLoginGuide");

      // 쇼셜 사용자 정보
      await this.setSocialUser(this.socialUser);

      // 회원가입 동의 페이지로 이동
      const userType = "GENL";
      this.$router.push({
        path: `${this.$config.ROUTE_USERS_PREFIX}/member/register/agree`,
        query: { userType: userType }
      });
    }
  }
};
</script>
