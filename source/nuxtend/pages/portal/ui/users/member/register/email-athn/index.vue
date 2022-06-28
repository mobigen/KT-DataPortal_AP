<template lang="html">
  <div>
    <h1>이메일 인증</h1>
    <form class="form login-form" @submit.self.prevent="">
      <label for="email1">이메일</label> :
      <input
        class="text-input"
        type="text"
        id="email1"
        v-model="email1"
        ref="email1"
        style="width: 200px"
        required
      />
      <span>@</span>
      <input
        class="text-input"
        type="text"
        id="email2"
        v-model="email2"
        ref="email2"
        style="width: 200px"
        required
      />
      <select
        id="selEmail"
        v-model="selEmail"
        ref="selEmail"
        @change="onChangeEmail"
      >
        <option value="">직접입력</option>
        <option value="gmail.com">gmail.com</option>
        <option value="naver.com">naver.com</option>
        <option value="daum.com">daum.com</option>
        <option value="nate.com">nate.com</option>
        <option value="yahoo.co.kr">yahoo.co.kr</option>
        <option value="hotmail.com">hotmail.com</option>
      </select>
      <span>
        <button type="button" @click="onEmailAthnReq()">인증번호 요청</button>
      </span>
      <br />
      <label for="athnNo">인증번호</label> :
      <input
        class="text-input"
        type="text"
        id="athnNo"
        v-model="athnNo"
        ref="athnNo"
        style="width: 200px"
        required
      />
    </form>
    <div>
      <button type="button" @click="onMemberJoin()">회원가입</button>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from "vuex";
import { successAlert, errorAlert } from "@functional/alert/alert-default";
export default {
  name: "index",
  data() {
    return {
      email: null,
      email1: null,
      email2: null,
      selEmail: "",
      athnNo: null,
      athnType: null
    };
  },
  beforeMount() {},
  mounted() {
    this.init();
  },
  computed: {
    ...mapGetters("users/memberRegster", ["getEmailAthn"])
  },
  methods: {
    ...mapActions("users/memberRegster", ["setEmailAthn"]),
    ...mapActions("users/memberRegster", [
      "clearEmailAthn",
      "clearSocialUser",
      "clearMemberRegisterInfo"
    ]),
    init() {
      // 이메일 인증 정보 CLEAR
      this.clearEmailAthn();
      // SOCIAL 사용자 정보 CLEAR
      this.clearSocialUser();
      // 회원가입 정보 CLEAR
      this.clearMemberRegisterInfo();
    },
    onChangeEmail() {
      this.email2 = this.selEmail;
    },
    async onEmailAthnReq() {
      this.email = this.email1 + "@" + this.email2;
      if (!this.email1) {
        await errorAlert("이메일을 입력해주세요.");
        this.$refs.email1.focus();
        return false;
      }
      if (!this.email2) {
        await errorAlert("이메일을 입력해주세요.");
        this.$refs.email2.focus();
        return false;
      }
      if (!this.chkEmail(this.email)) {
        await errorAlert("이메일 형식이 잘못되었습니다.");
        this.$refs.email1.focus();
        return false;
      }

      var params = {
        email: this.email
      };
      const data = await this.emailAthnSend(params);

      if (data && data.athnNo) {
        await successAlert(
          "인증번호 이메일을 발송했읍니다.발송된 이메일을 확인해 주세요."
        );

        // 회원가입 이메일 인증정보
        const emailAthn = {
          email: data.email,
          athnNo: data.athnNo,
          isEmailAthn: false
        };
        await this.setEmailAthn(emailAthn);
      }
    },
    emailAthnSend(params) {
      return this.$axios.post(
        `${this.$config.ROUTE_API_USERS_PREFIX}/user/emailAthnSend`,
        params
      );
    },
    async onMemberJoin() {
      if (!this.athnNo) {
        await errorAlert("인증번호을 입력해주세요.");
        this.$refs.athnNo.focus();
        return false;
      }

      let email = null;
      if (this.getEmailAthn) {
        email = this.getEmailAthn.email;
      }
      var params = {
        email: email,
        athnNo: this.athnNo
      };
      const data = await this.emailAthnCnfm(params);

      if (!data) {
        return false;
      }

      // 회원가입 이메일 인증정보
      const emailAthn = {
        email: data.email,
        athnNo: data.athnNo,
        isEmailAthn: true
      };
      await this.setEmailAthn(emailAthn);

      this.$router.push({
        path: `${this.$config.ROUTE_USERS_PREFIX}/member/register/user-type`
      });
    },
    emailAthnCnfm(params) {
      return this.$axios.post(
        `${this.$config.ROUTE_API_USERS_PREFIX}/user/emailAthnCnfm`,
        params
      );
    },
    chkEmail(email) {
      const reg_email =
        /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
      if (!reg_email.test(email)) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>
