<template lang="html">
  <div>
    <h1>{{ $t("index.title") }}</h1>
    <Login
      @login="onLogin"
      @idSearch="onIdSearch"
      @pwdSearch="onPwdSearch"
      @join="onJoin"
      @socialLogin="onSocialLogin"
    />
    <p><button @click="userInfo()">사용자정보</button></p>
    <p>store 사용자 정보 : {{ getUserInfo }}</p>
  </div>
</template>

<i18n src="./index.json"></i18n>

<script type="text/javascript">
import Login from "@organisms/login/login.vue";
import RSA from "rsajs";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "index",
  data() {
    return {
      prevFullUrl: null
    };
  },
  components: {
    Login
  },
  beforeMount() {},
  mounted() {},
  computed: {
    ...mapGetters("users/user", ["getterPrevFullUrl"]),
    ...mapGetters("users/user", ["getUserInfo"])
  },
  methods: {
    ...mapActions("users/user", ["getAuthenticatedUser"]),
    ...mapActions("users/user", ["setPrevFullUrl"]),
    async onLogin(param) {
      let publicKey = await this.getPublicKey();
      if (!publicKey) return;

      let password = param.password;
      if (publicKey && publicKey !== "") {
        password = this.encrypt(publicKey, param.password);
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
        const prevFullUrl = this.getPrevFullUrl();
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
    async onSocialLogin(param) {
      const socialType = param.socialType;
      const prevFullUrl = this.getPrevFullUrl();

      await this.setPrevFullUrl(prevFullUrl);

      // location.href =
      //   `/oauth2/authorization/` +
      //   socialType +
      //   "?prevFullUrl=" +
      //   encodeURIComponent(prevFullUrl);
      location.href = `/oauth2/authorization/` + socialType;
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
    getPrevFullUrl() {
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
    getPrevUrl() {
      let sUrl = "";

      if (this.prevPath && this.prevPath !== "") {
        sUrl += this.prevPath;
      }

      let cnt = 0;
      if (this.prevQuery && this.prevQuery !== "") {
        const keys = Object.keys(this.prevQuery);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const val = this.prevQuery[key];

          if (val !== null && val !== "") {
            if (cnt === 0) sUrl += "?";
            else sUrl += "&";

            sUrl += key + "=";
            sUrl += val;

            cnt++;
          }
        }
      }

      if (!sUrl || sUrl === "") {
        sUrl = `${this.$config.USER_INDEX_PAGE}`;
      }

      return sUrl;
    }
  }
};
</script>
