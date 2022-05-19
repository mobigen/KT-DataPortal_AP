<template lang="html">
  <div>
    <h1>{{ $t("index.hello-world") }}</h1>
    <Login @login="onLogin" />
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
      prevFullUrl: null,
      prevPath: null,
      prevQuery: null
    };
  },
  components: {
    Login
  },
  computed: {
    ...mapGetters("users/user", ["getUserInfo"])
  },
  mounted() {
    console.log('$isUserRouteUrl', this.$isUserRouteUrl('/user/users'))

    const url = this.$route.path;
    const includeUrls = ["/user/users/login"]
    const idx = _.findIndex(includeUrls, function (item) {
      return item === url
    })
    // console.log('idx : ', idx)

    const prevFullUrl = this.$route.query.prevFullUrl;
    this.prevFullUrl = prevFullUrl;

    const prevPath = this.$route.query.prevPath;
    const prevQueryStr = this.$route.query.prevQuery;
    // console.log("prevPath : ", prevPath);
    // console.log("prevQueryStr : ", prevQueryStr);
    let prevQuery = null;
    if (prevQueryStr && prevQueryStr !== "") {
      prevQuery = JSON.parse(prevQueryStr);
    }
    this.prevPath = prevPath;
    this.prevQuery = prevQuery;

    // console.log("prevQuery : ", prevQuery);

    const prevUrl = this.getPrevUrl();
    // console.log("prevUrl : ", prevUrl);
  },
  methods: {
    ...mapActions("users/user", ["getAuthenticatedUser"]),
    async onLogin(param) {
      let publicKey = await this.getPublicKey();
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
        // 사용자 정보 store 저장
        await this.getAuthenticatedUser();
        // 로그인 성공 후 페이지 이동
        const prevFullUrl = this.getPrevFullUrl();
        await this.$router.push({ path: `${prevFullUrl}` });
      }
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
      const user = await this.$getUser();
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
