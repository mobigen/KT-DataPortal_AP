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
        id="isPublicData"
        ref="isPublicData"
        v-model="isPublicData"
      />
      <label for="isPublicData"><span>가입이벤트동의여부</span></label>
    </p>
    <p><button @click.prevent="onAgree()">다음단계</button></p>
  </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from "vuex";
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
      isPublicData: false,
      isAgree: false
    };
  },
  beforeMount() {
    this.init();
  },
  destroyed() {},
  computed: {
    ...mapGetters("users/memberRegster", ["getEmailAthn"])
  },
  methods: {
    ...mapActions("users/memberRegster", ["setMemberRegisterInfo"]),
    init() {
      this.userType = this.$route.query.userType;
    },
    onTerms() {
      if (this.isTerms) {
        this.isPrivacyTerms = true;
        this.isServiceTerms = true;
        this.isPublicData = true;
      } else {
        this.isPrivacyTerms = false;
        this.isServiceTerms = false;
        this.isPublicData = false;
      }
    },
    async onAgree() {
      if (!this.isServiceTerms) {
        await errorAlert({
          content: "서비스이용약관동의여부에 동의하여 주시기 바랍니다."
        });
        this.$refs.isServiceTerms.focus();
        return false;
      }
      if (!this.isPrivacyTerms) {
        await errorAlert({
          content: "개인정보수집동의여부에 동의하여 주시기 바랍니다."
        });
        this.$refs.isPrivacyTerms.focus();
        return false;
      }

      this.isAgree = true;
      const memberRegisterInfo = {
        userType: this.userType,
        isAgree: this.isAgree,
        isPrivacyTerms: this.isPrivacyTerms,
        isServiceTerms: this.isServiceTerms,
        isPublicData: this.isPublicData
      };
      this.setMemberRegisterInfo(memberRegisterInfo);

      this.$router.push({
        path: `${this.$config.ROUTE_USERS_PREFIX}/member/register/form`
      });
    }
  }
};
</script>
