<template lang="html">
  <div>
    <form class="login_form" @submit.prevent="submit">
      <label for="username">사용자명:</label><br />
      <input
        class="login_form-label"
        type="text"
        id="username"
        v-model="username"
        maxlength="10"
        required
      /><br />
      <label for="password">비밀번호:</label><br />
      <input
        class="login_form-password"
        type="password"
        id="password"
        v-model="password"
        maxlength="15"
        required
      /><br />
      <select id="locale" class="login_form-locale">
        <option value="korean">한국어</option>
        <option value="English">English</option> </select
      ><br />
      <input type="submit" class="login_form-submit" value="로그인" />
    </form>
  </div>
</template>

<script type="text/javascript">
import RSA from "rsajs";
export default {
  name: "Login",
  extends: {},
  props: {},
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    async submit() {
      let publicKey = await this.getPublicKey();
      let password = this.password;

      if (publicKey && publicKey != "") {
        password = this.encrypt(publicKey, this.password);
      }

      let xAccessToken = await this.auth(this.username, password);
      console.log(publicKey, xAccessToken);

      if (xAccessToken && xAccessToken != "") {
        this.$cookie.set("x-access-token", xAccessToken);
        window.location.href = "app";
      }
    },
    async getPublicKey() {
      let data = null;
      try {
        data = await this.$api.get("/sample/authenticate/key");
      } catch (e) {
        console.error(e);
      }
      return data;
    },
    async auth(username, password) {
      let data = null;
      try {
        data = await this.$api.post("/sample/authenticate", {
          username: username,
          password: password
        });
      } catch (e) {
        console.error(e);
      }
      return data;
    },
    encrypt(key, source) {
      const encrypt = new RSA();
      encrypt.setKey(key);

      return encrypt.encrypt(source);
    }
  },
  beforeCreate() {},
  mounted() {}
};
</script>

<style lang="scss">
// @import ""
</style>
