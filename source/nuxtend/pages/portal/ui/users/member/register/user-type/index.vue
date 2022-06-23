<template lang="html">
  <div>
    <h1>회원가입(등록 구분)</h1>
    <p>
      <button @click.prevent="onJoinType('GENL')">회원가입(일반사용자)</button>
    </p>
    <p>
      <button @click.prevent="onJoinType('INSTN')">
        회원가입(기관데이터관리자)
      </button>
    </p>
  </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from "vuex";
import { successAlert, errorAlert } from "@functional/alert/alert-default";
export default {
  name: "index",
  beforeMount() {
    this.init();
  },
  computed: {
    ...mapGetters("users/memberRegster", ["getEmailAthn"])
  },
  methods: {
    ...mapActions("users/user", ["setPrevFullUrl"]),
    ...mapActions("users/memberRegster", [
      "clearEmailAthn",
      "clearSocialUser",
      "clearMemberRegisterInfo"
    ]),
    async init() {
      // 이메일 인증정보 CLEAR
      // this.clearEmailAthn();
      // 회원가입정보 CLEAR
      this.clearMemberRegisterInfo();
      // SOCIAL USER CLEAR
      this.clearSocialUser();
    },
    onJoinType(userType) {
      this.$router.push({
        path: `${this.$config.ROUTE_USERS_PREFIX}/member/register/agree`,
        query: { userType: userType }
      });
    },
    async setPrevPage() {
      await this.setPrevFullUrl(this.$route.fullPath);
    }
  }
};
</script>
