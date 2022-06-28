<template lang="html">
  <div>
    <h1>비밀번호 변경[{{ user.userSeq }}]</h1>
    <form class="form login-form" @submit.prevent="onIdSearch">
      <svg-icon name="user-setting" class="svg-icon" />
      <label for="userNm">비밀번호</label><br />
      <input
        class="text-input"
        type="text"
        id="userPassword"
        ref="userPassword"
        v-model="user.userPassword"
        maxlength="20"
        @keyup="chkPassword"
        required
      />
      <br />
      <label for="mobile">비밀번호 확인</label><br />
      <input
        class="text-input"
        type="text"
        id="confirmPassword"
        ref="confirmPassword"
        v-model="user.confirmPassword"
        maxlength="20"
        required
      />
      <br />
      <button
        type="button"
        @click.prevent="onPwdChange()"
        class="button button--primary button--lg w-12_12"
      >
        비밀번호 변경
      </button>
    </form>
  </div>
</template>
<script type="text/javascript">
import { errorAlert } from "@functional/alert/alert-default";

export default {
  name: "pwd-search-modify",
  data() {
    return {
      user: {
        userSeq: null,
        userPassword: null,
        confirmPassword: null
      },
      userPasswordChk: true,
      userPasswordMsg: "",
      confirmPasswordChk: true,
      confirmPasswordMsg: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const data = this.$cookies.get("pwdSearch");
      console.log("data : ", data);
      if (data && data.userSeq) {
        this.user.userSeq = data.userSeq;
        this.$cookies.remove("pwdSearch");
        this.$cookies.set("pwdSearch", null, -1);
      } else {
        await errorAlert({ content: "비정상적인 접근입니다." });
        this.$router.push({
          path: `${this.$config.ROUTE_USERS_PREFIX}/member/search/pwd`
        });
      }
    },
    updatePwd() {},
    onPwdChange() {
      if (this.user.userPassword == "") {
        alert("비밀번호를 입력해주세요.");
        this.$refs.userPassword.focus();
        return;
      }
      if (!this.chkPassword()) {
        alert(this.userPasswordMsg);
        this.$refs.userPassword.focus();
        return;
      }
      if (this.user.confirmPassword == "") {
        alert("비밀번호 확인을 입력해주세요.");
        this.$refs.confirmPassword.focus();
        return;
      }
      if (this.user.userPassword != this.user.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        this.$refs.confirmPassword.focus();
        return;
      }
      this.updatePwd();
    },
    chkPassword() {
      var pw = this.user.userPassword;
      this.chkConfrimPassword();
      if (!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/.test(pw)) {
        this.userPasswordChk = false;
        this.userPasswordMsg =
          "영문, 특수문자, 숫자를 모두 포함하여 8~16자로 입력해주세요";
        return false;
      } else if (/(\w)\1\1\1/.test(pw)) {
        this.userPasswordChk = false;
        this.userPasswordMsg = "같은 문자를 4번 이상 사용하실 수 없습니다.";
        return false;
      } else {
        this.userPasswordChk = true;
        this.userPasswordMsg = "사용 가능한 비밀번호입니다.";
        return true;
      }
    },
    chkConfrimPassword() {
      var pw = this.user.confirmPassword;

      if (this.user.userPassword == this.user.confirmPassword) {
        this.confirmPasswordMsg = "";
        this.confirmPasswordChk = true;
      } else {
        this.confirmPasswordChk = false;
        this.confirmPasswordMsg = "비밀번호가 일치하지 않습니다.";
      }
    },
    onPwdView(e) {
      var btn = $(e.currentTarget);
      btn.prev().toggleClass("active");
      if (btn.prev().hasClass("active")) {
        btn.removeClass("pw-visible");
        btn.find("i").removeClass("eye-on");
        btn.addClass("pw-invisible");
        btn.find("i").addClass("eye-off");
        btn.prev().attr("type", "text");
      } else {
        btn.removeClass("pw-invisible");
        btn.find("i").removeClass("eye-off");
        btn.addClass("pw-visible");
        btn.find("i").addClass("eye-on");
        btn.prev().attr("type", "password");
      }
    }
  }
};
</script>
