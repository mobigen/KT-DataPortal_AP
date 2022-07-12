<template lang="html">
  <div>
    <h1>비밀번호 찾기</h1>
    <form class="form login-form" @submit.self.prevent="">
      <svg-icon name="user-setting" class="svg-icon" />
      <label for="userNm">이름</label><br />
      <input
        class="text-input"
        type="text"
        id="userNm"
        v-model="userNm"
        maxlength="20"
        required
      />
      <br />
      <label for="userId">아이디</label><br />
      <input
        class="text-input"
        type="text"
        id="userId"
        v-model="userId"
        maxlength="20"
        required
      />
      <br />
      <label for="moblphon">핸드폰번호</label><br />
      <input
        class="text-input"
        type="text"
        id="moblphon"
        v-model="moblphon"
        maxlength="20"
        required
      />
      <br />
      <br />
      <button
        type="submit"
        class="button button--primary button--lg w-12_12"
        @click.prevent="onPwdSearch()"
      >
        확인
      </button>
      <p v-if="isPwdSuccess">
        <label for="email1">이메일</label> :
        <input
          class="text-input"
          type="text"
          id="email1"
          v-model="email1"
          ref="email1"
          style="width: 200px"
        />
        <span>@</span>
        <input
          class="text-input"
          type="text"
          id="email2"
          v-model="email2"
          ref="email2"
          style="width: 200px"
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
        />
      </p>
      <p v-if="isPwdFail">
        회원님의 가입정보가 없습니다.
        <a href="#" @click.prevent="onMemberJoin()">[회원 가입하러 가기]</a>
      </p>
    </form>
  </div>
</template>

<script type="text/javascript">
import { errorAlert } from "@functional/alert/alert-default";
export default {
  name: "pwd-search",
  data() {
    return {
      userId: null,
      userNm: null,
      moblphon: null,
      isPwdSuccess: false,
      isPwdFail: false,

      isEmailAuth: false
    };
  },
  beforeMount() {
    this.userId = this.$route.query.userId;
  },
  methods: {
    initPwdSearch() {
      this.isPwdSuccess = false;
      this.isPwdFail = false;
    },
    async onPwdSearch() {
      this.initPwdSearch();
      if (!(await this.pwdSearchValidate())) return false;

      const userId = this.userId;
      const userNm = this.userNm;
      const moblphon = this.moblphon;

      const parmas = {
        userId: userId,
        userNm: encodeURIComponent(userNm),
        moblphon: moblphon
      };
      const data = await this.pwdSearch(parmas);
      if (data && data.userId) {
        this.isPwdSuccess = true;
        this.isPwdFail = false;
      } else {
        this.isPwdSuccess = false;
        this.isPwdFail = true;
      }

      // this.$cookies.set("pwdSearch", data, 60);
      // this.$router.push({
      //   path: `${this.$config.ROUTE_USERS_PREFIX}/member/search/pwd-modify`
      // });
    },
    pwdSearch(params) {
      const config = {
        params: params
      };

      return this.$axios.get(
        `${this.$config.ROUTE_API_USERS_PREFIX}/auth/pwdSearch`,
        config
      );
    },
    async pwdSearchValidate() {
      const userId = this.userId;
      const userNm = this.userNm;
      const moblphon = this.moblphon;

      if (userNm === null || userNm === "") {
        await errorAlert("이름을 입력해 주세요.");
        return false;
      }
      if (userId === null || userId === "") {
        await errorAlert("아이디을 입력해 주세요.");
        return false;
      }
      if (moblphon === null || moblphon === "") {
        await errorAlert("전화번호를 입력해주세요.");
        return false;
      }

      return true;
    },
    onMemberJoin() {
      this.$router.push({
        path: `${this.$config.ROUTE_USERS_PREFIX}/member/register`
      });
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
        const params = {
          title: "성공",
          content:
            "인증번호 이메일을 발송했읍니다.발송된 이메일을 확인해 주세요."
        };
        await successAlert(params);

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
  }
};
</script>
