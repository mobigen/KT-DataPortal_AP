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
    submit: function() {
      this.$api({
        url: "/sample/authenticate",
        data: {
          username: this.username,
          password: this.password
        },
        method: "POST"
      }).then(data => {
        this.$cookie.set("x-access-token", data);
        window.location.href = "/app";
      });
    }
  },
  beforeCreate() {},
  mounted() {}
};
</script>

<style lang="scss">
// @import ""
</style>
