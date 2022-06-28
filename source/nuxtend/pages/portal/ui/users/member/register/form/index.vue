<template lang="html">
  <div>
    <h1>회원가입 (등록폼)</h1>
    <div v-if="!getSocialUser">
      <form class="form login-form" @submit.self.prevent="">
        <label for="userId">아이디 필수 *</label> :
        <input
          class="text-input"
          type="text"
          id="userId"
          v-model="user.userId"
          ref="userId"
          style="width: 200px"
          maxlength="20"
          required
        />
        <button type="button" @click.self.prevent="onDuplicatedUserIdChk()">
          중복체크
        </button>
        <br />
        <label for="userPassword">비밀번호 *</label> :
        <input
          class="text-input"
          type="text"
          id="userPassword"
          v-model="user.userPassword"
          ref="userPassword"
          style="width: 200px"
          required
        />
        <br />
        <label for="email1">비밀번호 확인*</label> :
        <input
          class="text-input"
          type="text"
          id="confirmPassword"
          v-model="user.confirmPassword"
          ref="confirmPassword"
          style="width: 200px"
          required
        />
        <br />
        <label for="userNm">이름*</label> :
        <input
          class="text-input"
          type="text"
          id="userNm"
          v-model="user.userNm"
          ref="userNm"
          style="width: 200px"
          required
        />
        <br />
        <label for="email1">이메일 필수 *</label> :
        <input
          class="text-input"
          type="text"
          id="email1"
          v-model="user.email1"
          ref="email1"
          style="width: 200px"
          :disabled="true"
        />
        <span>@</span>
        <input
          class="text-input"
          type="text"
          id="email2"
          v-model="user.email2"
          ref="email2"
          style="width: 200px"
          :disabled="true"
        />
        <br />
        <label for="moblphon1">연락처 필수 *</label> :
        <input
          class="text-input"
          type="text"
          id="moblphon1"
          v-model="user.moblphon1"
          ref="moblphon1"
          style="width: 150px"
          maxlength="4"
          required
        />
        <span>-</span>
        <input
          class="text-input"
          type="text"
          id="moblphon2"
          v-model="user.moblphon2"
          ref="moblphon2"
          style="width: 150px"
          maxlength="4"
          required
        />
        <span>-</span>
        <input
          class="text-input"
          type="text"
          id="moblphon3"
          v-model="user.moblphon3"
          ref="moblphon3"
          style="width: 150px"
          maxlength="4"
          required
        />
        <br />
        <label for="blngOrgNm">소속기관 필수 *</label> :
        <input
          type="hidden"
          id="blngOrgCd"
          v-model="user.blngOrgCd"
          ref="blngOrgCd"
        />
        <input
          class="text-input"
          type="text"
          id="blngOrgNm"
          v-model="user.blngOrgNm"
          ref="blngOrgNm"
          style="width: 150px"
          :disabled="isInputBlngOrg"
          required
        />
        <button type="button" @click.prevent="onSearchBlngOrg()">
          소속기관 검색
        </button>
        <button type="button" @click.prevent="onInputBlngOrg()">
          직접입력
        </button>
      </form>
    </div>
    <div v-else>
      <form class="form login-form" @submit.prevent="">
        <label for="userNm">이름*</label> :
        <input
          class="text-input"
          type="text"
          id="userNm"
          v-model="user.userNm"
          ref="userNm"
          style="width: 200px"
          :disabled="true"
        />
        <br />
        <label for="email1">이메일 필수 *</label> :
        <input
          class="text-input"
          type="text"
          id="email1"
          v-model="user.email1"
          ref="email1"
          style="width: 200px"
          :disabled="true"
        />
        <span>@</span>
        <input
          class="text-input"
          type="text"
          id="email2"
          v-model="user.email2"
          ref="email2"
          style="width: 200px"
          :disabled="true"
        />
        <br />
        <label for="moblphon1">연락처 필수 *</label> :
        <input
          class="text-input"
          type="text"
          id="moblphon1"
          v-model="user.moblphon1"
          ref="moblphon1"
          style="width: 150px"
          maxlength="4"
          required
        />
        <span>-</span>
        <input
          class="text-input"
          type="text"
          id="moblphon2"
          v-model="user.moblphon2"
          ref="moblphon2"
          style="width: 150px"
          maxlength="4"
          required
        />
        <span>-</span>
        <input
          class="text-input"
          type="text"
          id="moblphon3"
          v-model="user.moblphon3"
          ref="moblphon3"
          style="width: 150px"
          maxlength="4"
          required
        />
        <br />
        <label for="blngOrgNm">소속기관 필수 *</label> :
        <input
          type="hidden"
          id="blngOrgCd"
          v-model="user.blngOrgCd"
          ref="blngOrgCd"
        />
        <input
          class="text-input"
          type="text"
          id="blngOrgNm"
          v-model="user.blngOrgNm"
          ref="blngOrgNm"
          style="width: 150px"
          :disabled="isInputBlngOrg"
          required
        />
        <button type="button" @click.prevent="onSearchBlngOrg()">
          소속기관 검색
        </button>
        <button type="button" @click.prevent="onInputBlngOrg()">
          직접입력
        </button>
      </form>
    </div>
    <div>
      <button type="button" @click="onRegComplete()">가입완료</button>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from "vuex";
import { errorAlert } from "@functional/alert/alert-default";
export default {
  name: "index",
  data() {
    return {
      user: {
        userId: null,
        userPassword: null,
        confirmPassword: null,
        userNm: null,
        email: null,
        email1: null,
        email2: null,
        moblphon: null,
        moblphon1: null,
        moblphon2: null,
        moblphon3: null,
        blngOrgCd: null,
        blngOrgNm: null,
        userType: null,
        loginType: null,
        socialId: null,
        privacyTermsYn: "N",
        serviceTermsYn: "N",
        publicDataYn: "N"
      },
      isUserIdChk: false,
      userIdMsg: false,
      isEmailChk: false,
      isUserPasswordChk: false,
      userPasswordMsg: null,
      confirmPasswordMsg: null,
      isInputBlngOrg: true
    };
  },
  async beforeMount() {
    this.init();
  },
  destroyed() {
    this.clearEmailAthn();
    this.clearSocialUser();
    this.clearMemberRegisterInfo();
  },
  computed: {
    ...mapGetters("users/user", ["getPrevFullUrl"]),
    ...mapGetters("users/memberRegster", [
      "getEmailAthn",
      "getSocialUser",
      "getMemberRegisterInfo"
    ])
  },
  watch: {
    "user.userId"(newVal) {
      if (newVal) this.user.userId = this.chkEngNumInput(newVal);
    },
    "user.moblphon1"(newVal) {
      if (newVal) this.user.moblphon1 = this.chkNumInput(newVal);
    },
    "user.moblphon2"(newVal) {
      if (newVal) this.user.moblphon2 = this.chkNumInput(newVal);
    },
    "user.moblphon3"(newVal) {
      if (newVal) this.user.moblphon3 = this.chkNumInput(newVal);
    },
    "user.email"(newVal) {
      if (newVal) this.user.email = this.chkNotHangulInput(newVal);
    },
    "user.email1"(newVal) {
      if (newVal) this.user.email1 = this.chkNotHangulInput(newVal);
    },
    "user.email2"(newVal) {
      if (newVal) this.user.email2 = this.chkNotHangulInput(newVal);
    }
  },
  methods: {
    ...mapActions("users/memberRegster", ["clearEmailAthn", "clearSocialUser", "clearMemberRegisterInfo"]),
    async init() {
      if (this.getEmailAthn) {
        this.user.email = this.getEmailAthn.email;
        this.user.email1 = this.getEmailAddress(this.user.email, "name");
        this.user.email2 = this.getEmailAddress(this.user.email, "domain");
      }
      if (this.getSocialUser) {
        this.user.email = this.getSocialUser.email;
        this.user.email1 = this.getEmailAddress(this.user.email, "name");
        this.user.email2 = this.getEmailAddress(this.user.email, "domain");
        this.user.userNm = this.getSocialUser.name;
        this.user.loginType = this.getSocialUser.socialType;
        this.user.socialId = this.getSocialUser.id;
      }
      if (this.getMemberRegisterInfo) {
        this.user.userType = this.getMemberRegisterInfo.userType;
        if (this.getMemberRegisterInfo.isPrivacyTerms)
          this.user.privacyTermsYn = "Y";
        if (this.getMemberRegisterInfo.isServiceTerms)
          this.user.serviceTermsYn = "Y";
        if (this.getMemberRegisterInfo.isPublicData)
          this.user.publicDataYn = "Y";
      }

      if (
        !this.user.userType ||
        !this.getMemberRegisterInfo ||
        !this.getMemberRegisterInfo.isAgree
      ) {
        await errorAlert("비정상적인 접근 입니다.");

        if (this.getPrevFullUrl) {
          this.$router.push({
            path: `${this.getPrevFullUrl}`
          });
        } else {
          this.$router.push({
            path: `${this.$config.ROUTE_USERS_PREFIX}/member/register`
          });
        }

        return false;
      }
    },
    async onDuplicatedUserIdChk() {
      if (this.user.userId === null || this.user.userId === "") {
        await errorAlert("아이디을 입력해주세요.");
        this.$refs.userId.focus();
        return false;
      }
      if (!this.chkUserId(this.user.userId)) {
        await errorAlert("아이디 형식이 잘못되었습니다.");
        this.$refs.userId.focus();
        return false;
      }

      var params = {
        userId: this.user.userId
      };
      const data = await this.isDupliacatedChk(params);
      if (data === "Y") {
        await errorAlert("이미 가입된 아이디 입니다.");
        this.$refs.userId.focus();
        this.isUserIdChk = false;
      } else if (data === "N") {
        await errorAlert("사용 가능한 아이디 입니다.");
        this.isUserIdChk = true;
      } else {
        await errorAlert("아이디 중복체크 오류입니다.");
        this.isUserIdChk = false;
      }
    },
    async onDuplicatedEmailChk() {
      let email = this.user.email1 + "@" + this.user.email2;
      if (this.user.email1 == "" || this.user.email2 == "") {
        await errorAlert("이메일을 입력해주세요.");
        this.$refs.email1.focus();
        return;
      }
      if (!this.chkEmail(email)) {
        await errorAlert("이메일 형식이 잘못되었습니다.");
        this.$refs.email1.focus();
        return false;
      }

      var params = {
        userId: email
      };
      const data = await this.isDupliacatedChk(params);
      if (data === "Y") {
        await errorAlert("이미 가입된 Email 입니다.");
        this.$refs.email1.focus();
        this.isEmailChk = false;
      } else if (data === "N") {
        await errorAlert("사용 가능한 Email 입니다.");
        this.isEmailChk = true;
      } else {
        await errorAlert("이메일 중복체크 오류입니다.");
        this.isEmailChk = false;
      }
    },
    isDupliacatedChk(params) {
      const config = {
        params: params
      };
      return this.$axios.get(
        `${this.$config.ROUTE_API_USERS_PREFIX}/auth/isDupliacatedChk`,
        config
      );
    },
    onSearchBlngOrg() {
      alert("소속기관 검색 팝업");
    },
    onInputBlngOrg() {
      if (this.isInputBlngOrg) {
        this.isInputBlngOrg = false;
      } else {
        this.isInputBlngOrg = true;
      }
      this.user.blngOrgCd = null;
      this.user.blngOrgNm = null;
    },
    async onRegComplete() {
      if (!this.getSocialUser) {
        if (this.user.userId === null || this.user.userId === "") {
          await errorAlert("아이디을 입력해주세요.");
          this.$refs.userId.focus();
          return false;
        }
        if (!this.chkUserId(this.user.userId)) {
          await errorAlert("아이디 형식이 잘못되었습니다.");
          this.$refs.userId.focus();
          return false;
        }
        if (!this.isUserIdChk) {
          await errorAlert("아이디 중복 체크를 해주세요.");
          this.$refs.userId.focus();
          return false;
        }
        if (this.user.userPassword == "") {
          await errorAlert("비밀번호를 입력해주세요.");
          this.$refs.userPassword.focus();
          return;
        }
        if (!this.chkPassword()) {
          await errorAlert(this.userPasswordMsg);
          this.$refs.userPassword.focus();
          return;
        }
        if (
          this.user.confirmPassword === null ||
          this.user.confirmPassword === ""
        ) {
          await errorAlert("비밀번호 확인을 입력해주세요.");
          this.$refs.confirmPassword.focus();
          return;
        }
        if (this.user.userPassword !== this.user.confirmPassword) {
          await errorAlert("비밀번호가 일치하지 않습니다.");
          this.$refs.confirmPassword.focus();
          return;
        }
        if (this.user.userNm === null || this.user.userNm === "") {
          await errorAlert("성명를 입력해주세요.");
          this.$refs.userNm.focus();
          return;
        }
        this.user.email = this.user.email1 + "@" + this.user.email2;
        if (this.user.email1 === null || this.user.email1 === "") {
          await errorAlert("이메일을 입력해주세요.");
          this.$refs.email1.focus();
          return false;
        }
        if (this.user.email2 === null || this.user.email2 === "") {
          await errorAlert("이메일을 입력해주세요.");
          this.$refs.email2.focus();
          return false;
        }
        if (!this.chkEmail(this.user.email)) {
          await errorAlert("이메일 형식이 잘못되었습니다.");
          this.$refs.email1.focus();
          return false;
        }
        // if (!this.isEmailChk) {
        //   await errorAlert("이메일 중북체크를 해주세요");
        //   this.$refs.email1.focus();
        //   return false;
        // }
      }

      this.user.moblphon =
        this.user.moblphon1 +
        "-" +
        this.user.moblphon2 +
        "-" +
        this.user.moblphon3;
      if (this.user.moblphon1 === null || this.user.moblphon1 === "") {
        await errorAlert("연락처을 입력해주세요.");
        this.$refs.moblphon1.focus();
        return false;
      }
      if (this.user.moblphon2 === null || this.user.moblphon2 === "") {
        await errorAlert("연락처을 입력해주세요.");
        this.$refs.moblphon2.focus();
        return false;
      }
      if (this.user.moblphon3 === null || this.user.moblphon3 === "") {
        await errorAlert("연락처을 입력해주세요.");
        this.$refs.moblphon3.focus();
        return false;
      }
      if (!this.chkTelNo(this.user.moblphon)) {
        await errorAlert("연락처 형식이 잘못되었습니다.");
        this.$refs.moblphon1.focus();
        return false;
      }
      if (this.user.blngOrgNm === null || this.user.blngOrgNm === "") {
        await errorAlert("소속기관을 입력해주세요.");
        this.$refs.blngOrgNm.focus();
        return false;
      }

      let data;
      if (!this.getSocialUser) {
        data = await this.createUser();
      } else {
        data = await this.createSocialUser();
      }

      console.log("createUser_data : ", data);
      if (data && data.userUuid) {
        this.$router.push({
          path: `${this.$config.ROUTE_USERS_PREFIX}/member/register/complete`,
          query: { userUuid: data.userUuid }
        });
      } else {
        await errorAlert(
          "회원가입 중 오류입니다.시스템 사용자에게 문의하여 주시기 바랍니다."
        );
      }
    },
    async createUser() {
      let param = this.user;
      const data = await this.$axios.post(
        `${this.$config.ROUTE_API_USERS_PREFIX}/user/createUser`,
        param
      );

      return data;
    },
    async createSocialUser() {
      let param = this.user;
      const data = await this.$axios.post(
        `${this.$config.ROUTE_API_USERS_PREFIX}/user/createSocialUser`,
        param
      );

      return data;
    },
    chkUserId(userId) {
      const reg_userId = /^[a-z0-9]{4,20}$/;
      if (!reg_userId.test(userId)) {
        this.isUserIdChk = false;
        //   "영문소문자, 숫자를 모두 포함하여 4~20자로 입력해주세요.";
        this.userIdMsg =
          "영문소문자, 숫자를 모두 포함하여 4~20자로 입력해주세요.";
        return false;
      }
      return true;
    },
    chkEmail(email) {
      const reg_email =
        /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
      if (!reg_email.test(email)) {
        return false;
      } else {
        return true;
      }
    },
    chkPassword() {
      const pw = this.user.userPassword;
      this.chkConfrimPassword();
      if (!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/.test(pw)) {
        this.isUserPasswordChk = false;
        //   "영문, 특수문자, 숫자를 모두 포함하여 8~20자로 입력해주세요.";
        this.userPasswordMsg =
          "영문, 특수문자, 숫자를 모두 포함하여 8~20자로 입력해주세요.(특수문자 : !@#$%^*+=- 만 허용됩니다. )";
        return false;
      } else if (/(\w)\1\1\1/.test(pw)) {
        this.isUserPasswordChk = false;
        this.userPasswordMsg = "같은 문자를 4번 이상 사용하실 수 없습니다.";
        return false;
      } else {
        this.isUserPasswordChk = true;
        this.userPasswordMsg = "사용 가능한 비밀번호입니다.";
        return true;
      }
    },
    chkConfrimPassword() {
      const pw = this.user.confirmPassword;

      if (this.user.userPassword == this.user.confirmPassword) {
        this.confirmPasswordChk = true;
        this.confirmPasswordMsg = "";
      } else {
        this.confirmPasswordChk = false;
        this.confirmPasswordMsg = "비밀번호가 일치하지 않습니다.";
      }
    },
    chkTelNo(moblphon) {
      const regExp = /^[0-9]{2,4}-[0-9]{4}-[0-9]{4}$/;
      let result = false;
      result = regExp.test(moblphon);
      return result;
    },
    chkEngNumInput(val) {
      return val.replace(/[^a-z0-9]/gi, "");
    },
    chkNumInput(val) {
      return val.replace(/[^0-9]/gi, "");
    },
    chkNotHangulInput(val) {
      const reg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
      console.log("val_2 : ", val);
      console.log("reg.exec(val)_2 : ", reg.exec(val));
      if (reg.exec(val) !== null) {
        return val.slice(0, -1);
      } else {
        return val;
      }
    },
    getEmailAddress(email, emailType) {
      if (!email) return "";

      const emailParts = email.split("@");
      let emailName = "";
      let emailDomain = "";
      if (emailParts.length >= 2) {
        emailName = emailParts[0];
        emailDomain = emailParts[1];
      }

      if (emailType === "name") return emailName;
      else if (emailType === "domain") return emailDomain;
      else return "";
    }
  }
};
</script>
