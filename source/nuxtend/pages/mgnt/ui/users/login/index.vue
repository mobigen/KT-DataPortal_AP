<template lang="html">
  <div>
    <h1>관리자 로그인</h1>
    <Login @login="onLogin" />
    <p><button @click="userInfo()">관리자정보</button></p>
    <p>store 관리자 정보 : {{ getAdminUserInfo }}</p>
    <p><button @click="urlPattern()">URL pattern</button></p>
  </div>
</template>

<script type="text/javascript">
import Login from "@organisms/login/login.vue";
import RSA from "rsajs";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "index",
  data() {
    return {
      prevFullUrl: null,
    };
  },
  components: {
    Login
  },
  computed: {
    ...mapGetters("users/adminUser", ["getAdminUserInfo"])
  },
  mounted() {
    const prevFullUrl = this.$route.query.prevFullUrl;
    this.prevFullUrl = prevFullUrl;
  },
  methods: {
    ...mapActions("users/adminUser", ["getAuthenticatedAdminUser"]),
    async onLogin(param) {
      let publicKey = await this.getPublicKey();
      let password = param.password;

      if (publicKey && publicKey !== "") {
        password = this.encrypt(publicKey, param.password);
      }

      let adminAccessToken = await this.auth(param.username, password);
      console.log('adminAccessToken : ', adminAccessToken);
      if (adminAccessToken && adminAccessToken !== "") {
        // 관리자 access-token 쿠키 생성
        await this.$cookies.set(
          this.$config.ADMIN_ACCESS_TOKEN_NAME,
          adminAccessToken
        );
        // 사용자 정보 store 저장
        await this.getAuthenticatedAdminUser();
        // 로그인 성공 후 페이지 이동
        const prevFullUrl = this.getPrevFullUrl();
        await this.$router.push({ path: `${prevFullUrl}` });
      }
    },
    getPublicKey() {
      return this.$axios.get(`${this.$config.API_ADMIN_USERS_PREFIX}/auth/key`);
    },
    auth(username, password) {
      return this.$axios.post(`${this.$config.API_ADMIN_USERS_PREFIX}/auth/login`, {
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
      const user = await this.$getAdminUser();
    },
    getPrevFullUrl() {
      let sUrl = "";

      if (this.prevFullUrl && this.prevFullUrl !== "") {
        sUrl += decodeURIComponent(this.prevFullUrl);
      }

      if (!sUrl || sUrl === "") {
        sUrl = `${this.$config.USER_INDEX_PAGE}`;
      }

      return sUrl;
    },
    urlPattern () {
      //const pattern = new UrlPattern(/^\/api(.*)$/);
      //const pattern = new UrlPattern(/^\/api\/(.*)$/);
      //const pattern = new UrlPattern(/^\/admin\/api\/(.*)$/);
      const path = '/api/aaa'
      const chkUserUrl = this.$isUserUrl(path);
      const chkAdminUrl = this.$isAdminUrl(path);
      console.log('chkUserUrl : ', chkUserUrl)
      console.log('chkAdminUrl : ', chkAdminUrl)
    }
  }
};
</script>
