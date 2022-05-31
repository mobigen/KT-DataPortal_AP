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
      <input type="checkbox" id="idSaveChk" v-model="idSaveChk" />
      <label for="idSaveChk"><span>아이디저장</span></label>
      <br />
      <button type="submit" class="button button--primary button--lg w-12_12">
        {{ $t("login.submit-button") }}
      </button>
      <br />
      <div>
        <span><a href="" @click.prevent="onIdSearch()">아이디찾기</a></span>
        <span><a href="" @click.prevent="onPwdSearch()">비밀번호찾기</a></span>
        <span><a href="" @click.prevent="onJoin()">회원가입</a></span>
      </div>
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
      password: "",
      idSaveChk: false
    };
  },
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
  methods: {
    async onLogin() {
      /**
       * 로그인에 필요한 사용자 계정 정보를 반환
       *
       * @event login
       * @property {string} username - 사용자계정
       * @property {string} password - 비밀번호
       */
      this.$emit("login", {
        username: this.username,
        password: this.password,
        idSaveChk: this.idSaveChk
      });
    },
    onLocale(param) {
      this.$i18n.setLocale(param);
    },
    onIdSearch() {
      this.$emit("idSearch");
    },
    onPwdSearch() {
      this.$emit("pwdSearch");
    },
    onJoin() {
      this.$emit("join");
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
