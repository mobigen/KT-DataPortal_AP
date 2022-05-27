<template lang="html">
  <div>
    <form class="form login-form" @submit.prevent="onLogin">
      <svg-icon name="user-setting" class="svg-icon" />
      <label for="username">{{ $t("login.username") }}</label
      ><br />
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
      <label for="password">{{ $t("login.password") }}</label
      ><br />
      <input
        class="text-input"
        type="password"
        id="password"
        v-model="password"
        maxlength="15"
        required
      /><br />
      <Locale @changeLocale="onLocale" />
      <br />
      <button type="submit" class="button button--primary button--lg w-12_12">
        {{ $t("login.submit-button") }}
      </button>
    </form>
  </div>
</template>

<i18n src="./login.json"></i18n>

<script type="text/javascript">
import Locale from "@molecules/locale/locale.vue";
export default {
  name: "ModuleLogin",
  components: {
    Locale
  },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async onLogin() {
      /**
       * 로그인에 필요한 사용자 계정 정보를 반환
       *
       * @event login
       * @property {string} username - 사용자계정
       * @property {string} password - 비밀번호
       */
      this.$emit("login", { username: this.username, password: this.password });
    },
    onLocale(param) {
      this.$i18n.setLocale(param);
    },
    onSocialLogin(socialType) {
      /**
       * 소셜 로그인에 필요한 타입를 반환
       *
       * @event social login
       * @property {string} socialType - 소셜 로그인 타입
       */
      this.$emit("socialLogin", { socialType: socialType });
    }
  }
};
</script>

<style lang="scss">
@import "login";
</style>
