<template lang="html">
  <div>
    <h1>로그인</h1>
    <form class="form login-form" @submit.prevent="onLogin">
      <svg-icon name="user-setting" class="svg-icon" />
      <label for="username">아이디</label><br />
      <input
        class="text-input"
        type="text"
        id="username"
        v-model="username"
        ref="username"
        maxlength="20"
      />
      <br />
      <p v-if="isUsernameChk">{{ usernameMsg }}</p>
      <fa :icon="['fas', 'key']" />
      <label for="password">비밀번호</label><br />
      <input
        class="text-input"
        type="password"
        id="password"
        v-model="password"
        ref="password"
        maxlength="15"
      />
      <br />
      <p v-if="isPasswordChk">{{ passwordMsg }}</p>
      <input type="checkbox" id="idSaveChk" v-model="idSaveChk" />
      <label for="idSaveChk"><span>아이디저장</span></label>
      <br />
      <button type="submit" class="button button--primary button--lg w-12_12">
        로그인
      </button>
      <br />
      <div>
        <span><a href="" @click.prevent="onIdSearch()">아이디찾기</a></span
        >&nbsp;
        <span><a href="" @click.prevent="onPwdSearch()">비밀번호찾기</a></span
        >&nbsp;
        <span><a href="" @click.prevent="onMemberJoin()">회원가입</a></span>
      </div>
      <br />
      <p v-if="isLoginChk">{{ loginMsg }}</p>
      <button
        type="button"
        @click="onSocialLogin('naver')"
        class="button button--negative button--lg w-12_12"
      >
        네이버
      </button>
      <br />
      <button
        type="button"
        @click="onSocialLogin('kakao')"
        class="button button--secondary button--lg w-12_12"
      >
        카카오
      </button>
      <br />
      <button
        type="button"
        @click="onSocialLogin('google')"
        class="button button--tertiary button--lg w-12_12"
      >
        구글
      </button>
      <br />
      <!-- <button
        type="button"
        @click="onSocialLogin('facebook')"
        class="button button--danger button--lg w-12_12"
      >
        페이스북
      </button> -->
    </form>
  </div>
</template>

<script type="text/javascript">
import { mapGetters, mapActions } from "vuex";

export default {
  name: "index",
  data() {
    return {
      username: "",
      password: "",
      isUsernameChk: false,
      usernameMsg: null,
      isPasswordChk: false,
      passwordMsg: null,
      idSaveChk: false,
      isLoginChk: false,
      loginMsg: null,
      prevFullUrl: null
    };
  },
  components: {},
  beforeMount() {},
  mounted() {
    const userSaveId = this.$cookies.get("userSaveId");
    if (userSaveId) {
      this.idSaveChk = true;
      this.username = userSaveId;
    } else {
      this.idSaveChk = false;
      this.username = "";
    }
  },
  computed: {
    ...mapGetters("users/user", ["getPrevFullUrl"]),
    ...mapGetters("users/user", ["getUserInfo"])
  },
  methods: {
    ...mapActions("users/user", ["getAuthenticatedUser"]),
    ...mapActions("users/user", ["setPrevFullUrl"]),
    async onLogin() {
      // 아이디, 비밀번호, 로그인 체크, 메세지 초기화
      this.isUsernameChk = false;
      this.usernameMsg = null;
      this.isPasswordChk = false;
      this.passwordMsg = null;
      this.isLoginChk = false;
      this.loginMsg = null;

      if (
        process.env.ENV_TYPE === "local" ||
        process.env.ENV_TYPE === "dev" ||
        process.env.ENV_TYPE === "dev.apache"
      ) {
        if (!this.chkUsernameLocal()) {
          this.$refs.username.focus();
          return false;
        }
        if (!this.chkPasswordLocal()) {
          this.$refs.password.focus();
          return false;
        }
      } else {
        if (!this.chkUsername()) {
          this.$refs.username.focus();
          return false;
        }
        if (!this.chkPassword()) {
          this.$refs.password.focus();
          return false;
        }
      }

      const param = {
        username: this.username,
        password: this.password,
        idSaveChk: this.idSaveChk
      };

      // 비밀번호 RSA 암호화
      let publicKey = await this.$getPublicKey();
      if (!publicKey) return;
      let password = param.password;
      if (publicKey && publicKey !== "") {
        password = this.$encrypt(publicKey, param.password);
      }
      let userAccessToken = await this.auth(param.username, password);

      if (userAccessToken && userAccessToken !== "") {
        // 사용자 access-token 쿠키 생성
        await this.$cookies.set(
          this.$config.USER_ACCESS_TOKEN_NAME,
          userAccessToken
        );

        // 아이디 저장
        const idSaveChk = param.idSaveChk;
        if (idSaveChk) {
          const expireTime = 60 * 1; // 60초
          await this.$cookies.set("userSaveId", param.username, expireTime);
        } else {
          await this.$cookies.set("userSaveId", "", -1);
          await this.$cookies.remove("userSaveId");
        }

        // 사용자 정보 store 저장
        await this.getAuthenticatedUser();
        // 로그인 성공 후 페이지 이동
        const prevFullUrl = this.getPrevFullPageUrl();
        await this.$router.push({ path: `${prevFullUrl}` });

        this.isLoginChk = false;
        this.loginMsg = null;
      } else {
        this.isLoginChk = true;
        this.loginMsg = "! 아이디 또는 비밀번호를 다시 확인해 주세요.";
        return false;
      }
    },
    onIdSearch() {
      this.$router.push({
        path: `${this.$config.ROUTE_USERS_PREFIX}/member/search/id`
      });
    },
    onPwdSearch() {
      this.$router.push({
        path: `${this.$config.ROUTE_USERS_PREFIX}/member/search/pwd`
      });
    },
    onMemberJoin() {
      this.$router.push({
        path: `${this.$config.ROUTE_USERS_PREFIX}/member/register`
      });
    },
    async onSocialLogin(socialType) {
      await this.setPrevPage();
      await this.$cookies.set("socialLoginType", "login");

      location.href =
        `${this.$config.API_USERS_PREFIX}/oauth2/authorization/` + socialType;
    },
    auth(username, password) {
      const params = {
        userId: username,
        password: password
      };

      return this.$axios.post(
        `${this.$config.ROUTE_API_USERS_PREFIX}/auth/login`,
        params
      );
    },
    async userInfo() {
      const user = await this.$getAuthUser();
    },
    getPrevFullPageUrl() {
      let sUrl = "";

      const prevFullUrl = this.$route.query.prevFullUrl;
      this.prevFullUrl = prevFullUrl;

      if (this.prevFullUrl && this.prevFullUrl !== "") {
        sUrl += decodeURIComponent(this.prevFullUrl);
      }

      if (!sUrl || sUrl === "") {
        sUrl = `${this.$config.USER_INDEX_PAGE}`;
      }

      return sUrl;
    },
    async setPrevPage() {
      await this.setPrevFullUrl(this.$route.fullPath);
    },
    chkUsername() {
      const username = this.username;
      if (!this.$chkEmail(username)) {
        this.isUsernameChk = true;
        this.usernameMsg = "! 메일주소 형식이 맞지 않읍니다.";
        return false;
      }
      return true;
    },
    chkUsernameLocal() {
      const username = this.username;
      if (!this.$chkEmail(username) && !this.$chkUserId(username)) {
        this.isUsernameChk = true;
        this.usernameMsg =
          "! 메일주소 또는 영문(소문자), 숫자 포함 4~20자까지 가능합니다.";
        return false;
      }
      return true;
    },
    chkPassword() {
      const pw = this.password;
      if (!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/.test(pw)) {
        this.isPasswordChk = true;
        this.passwordMsg =
          "영문, 특수문자, 숫자를 모두 포함하여 8~20자로 입력해주세요.(특수문자 : !@#$%^*+=- 만 허용됩니다. )";
        return false;
      } else if (/(\w)\1\1\1/.test(pw)) {
        this.isPasswordChk = true;
        this.passwordMsg = "같은 문자를 4번 이상 사용하실 수 없습니다.";
        return false;
      } else {
        this.isPasswordChk = false;
        // this.passwordMsg = "사용 가능한 비밀번호입니다.";
        this.passwordMsg = null;
        return true;
      }
    },
    chkPasswordLocal() {
      const pw = this.password;
      if (!/^(?=.*[a-zA-Z0-9]).{4,20}$/.test(pw)) {
        this.isPasswordChk = true;
        this.passwordMsg =
          "영문, 숫자를 포함하여 8~20자로 입력해주세요.(특수문자 : !@#$%^*+=- 만 허용됩니다. )";
        return false;
      } else if (/(\w)\1\1\1/.test(pw)) {
        this.isPasswordChk = true;
        this.passwordMsg = "같은 문자를 4번 이상 사용하실 수 없습니다.";
        return false;
      } else {
        this.isPasswordChk = false;
        // this.passwordMsg = "사용 가능한 비밀번호입니다.";
        this.passwordMsg = null;
        return true;
      }
    }
  }
};
</script>

<style lang="scss">
@import "login";
</style>
