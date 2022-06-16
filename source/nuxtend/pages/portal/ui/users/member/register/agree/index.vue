<template lang="html">
  <div>
    <h1>회원가입 (약관동의)</h1>
    <p>
      <input
        type="checkbox"
        id="isTerms"
        ref="isTerms"
        v-model="isTerms"
        @change="onTerms()"
      />
      <label for="isTerms"><span>전체동의</span></label>
    </p>
    <p>
      <input
        type="checkbox"
        id="isPrivacyTerms"
        ref="isPrivacyTerms"
        v-model="isPrivacyTerms"
      />
      <label for="isPrivacyTerms"><span>개인정보수집동의여부</span></label>
    </p>
    <p>
      <input
        type="checkbox"
        id="isServiceTerms"
        ref="isServiceTerms"
        v-model="isServiceTerms"
      />
      <label for="isServiceTerms"><span>서비스이용약관동의여부</span></label>
    </p>
    <p>
      <input
        type="checkbox"
        id="isJoinEvent"
        ref="isJoinEvent"
        v-model="isJoinEvent"
      />
      <label for="isJoinEvent"><span>가입이벤트동의여부</span></label>
    </p>
    <p><button @click.prevent="onAgree()">다음단계</button></p>
  </div>
</template>
<script type="text/javascript">
import { errorAlert } from "@functional/alert/alert-default";
export default {
  name: "index",
  data() {
    return {
      userType: null,
      socialUser: null,
      isTerms: false,
      isPrivacyTerms: false,
      isServiceTerms: false,
      isJoinEvent: false,
      isAgree: false
    };
  },
  beforeMount() {
    this.userType = this.$route.query.userType;
    console.log("this.userType : ", this.userType);
    const socialUser = this.$cookies.get("social-user");
    this.socialUser = socialUser;
    this.$cookies.set("social-user", null);
  },
  destroyed() {},
  methods: {
    onTerms() {
      if (this.isTerms) {
        this.isPrivacyTerms = true;
        this.isServiceTerms = true;
        this.isJoinEvent = true;
      } else {
        this.isPrivacyTerms = false;
        this.isServiceTerms = false;
        this.isJoinEvent = false;
      }
    },
    async onAgree() {
      if (!this.isPrivacyTerms) {
        await errorAlert("개인정보수집동의여부에 동의하여 주시기 바랍니다.");
        this.$refs.isPrivacyTerms.focus();
        return false;
      }
      if (!this.isServiceTerms) {
        await errorAlert("서비스이용약관동의여부에 동의하여 주시기 바랍니다.");
        this.$refs.isServiceTerms.focus();
        return false;
      }
      if (!this.isJoinEvent) {
        await errorAlert("가입이벤트동의여부에 동의하여 주시기 바랍니다.");
        this.$refs.isJoinEvent.focus();
        return false;
      }

      this.isAgree = true;

      const agreeInfo = {
        isAgree: this.isAgree,
        isPrivacyTerms: this.isPrivacyTerms,
        isServiceTerms: this.isServiceTerms,
        isJoinEvent: this.isJoinEvent
      };
      this.$cookies.set("user-type", this.userType);
      this.$cookies.set("social-user", this.socialUser);
      this.$cookies.set("agree-info", agreeInfo);

      this.$router.push({
        path: `${this.$config.ROUTE_USERS_PREFIX}/member/register/form`
      });
    }
  }
};
</script>
