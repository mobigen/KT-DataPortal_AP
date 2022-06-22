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
        maxlength="10"
        required
      />
      <br />
      <fa :icon="['fas', 'key']" />
      <label for="password">비밀번호</label><br />
      <input
        class="text-input"
        type="password"
        id="password"
        v-model="password"
        maxlength="15"
        required
      /><br />

      <br />
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
        <span><a href="" @click.prevent="onJoin()">회원가입</a></span>
      </div>
      <br />
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
      <button
        type="button"
        @click="onSocialLogin('facebook')"
        class="button button--danger button--lg w-12_12"
      >
        페이스북
      </button>
    </form>
  </div>
</template>

<script type="text/javascript">
import RSA from "rsajs";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "index",
  data() {
    return {
      username: "",
      password: "",
      idSaveChk: false,
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
      const param = {
        username: this.username,
        password: this.password,
        idSaveChk: this.idSaveChk
      };

      let publicKey = await this.getPublicKey();
      if (!publicKey) return;

      let password = param.password;
      if (publicKey && publicKey !== "") {
        password = this.encrypt(publicKey, param.password);
      }
      let userAccessToken = await this.auth(param.username, password);
      console.log("userAccessToken : ", userAccessToken);

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
    onJoin() {
      this.$router.push({
        path: `${this.$config.ROUTE_USERS_PREFIX}/member/register`
      });
    },
    async onSocialLogin(socialType) {
      await this.setPrevPage();

      location.href =
        `${this.$config.API_USERS_PREFIX}/oauth2/authorization/` + socialType;
    },
    getPublicKey() {
      return this.$axios.get(`${this.$config.API_USERS_PREFIX}/auth/key`);
    },
    auth(username, password) {
      return this.$axios.post(`${this.$config.API_USERS_PREFIX}/auth/login`, {
        userId: username,
        password: password
      });
    },
    encrypt(key, source) {
      const encrypt = new RSA();
      encrypt.setKey(key);

      return encrypt.encrypt(source);
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
    }
  }
};
</script>

<style lang="scss">
@import "login";
</style>
