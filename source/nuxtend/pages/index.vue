<template lang="html">
  <div>
    <h1>{{ $t('index.hello-world') }}</h1>
    <Login @login="onLogin"/>
  </div>
</template>

<i18n src="./index.json"></i18n>

<script type="text/javascript">
import Login from "@organisms/login/login.vue"
import RSA from "rsajs";

export default {
  name: "Index",
  components: {
    Login
  },
  mounted() {
    sessionStorage.clear();
  },
  methods: {
    async onLogin(param) {
      let publicKey = await this.getPublicKey();
      let password = param.password;

      if (publicKey && publicKey !== "") {
        password = this.encrypt(publicKey, param.password);
      }

      let xAccessToken = await this.auth(param.username, password);
      console.info(publicKey, xAccessToken);

      if (xAccessToken && xAccessToken !== "") {
        this.$cookies.set("x-access-token", xAccessToken);
        this.$router.push({ path: '/sample/image' });
      }
    },
    getPublicKey() {
      return this.$axios.get("/api/authenticate/key");
    },
    auth(username, password) {
      return this.$axios.post("/api/authenticate", {
        username: username,
        password: password
      });
    },
    encrypt(key, source) {
      const encrypt = new RSA();
      encrypt.setKey(key);

      return encrypt.encrypt(source);
    },
  }
};
</script>
