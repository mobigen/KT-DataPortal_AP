<template lang="html">
  <div>
    <h1>ID 찾기</h1>
    <form class="form login-form" @submit.self.prevent="">
      <svg-icon name="user-setting" class="svg-icon" />
      <label for="userNm">이름</label><br />
      <input
        class="text-input"
        type="text"
        id="userNm"
        v-model="userNm"
        maxlength="20"
      />
      <br />
      <label for="moblphon">전화번호</label><br />
      <input
        class="text-input"
        type="text"
        id="moblphon"
        v-model="moblphon"
        maxlength="20"
      />
      <br />
      <br />
      <button
        type="button"
        class="button button--primary button--lg w-12_12"
        @click.prevent="onIdSearch()"
      >
        확인
      </button>
      <br />
      <p v-if="isIdSuccess">
        회원님의 아이디는
        <a href="#" @click.prevent="onPwdSearch()">{{ userId }}</a> 입니다.
      </p>
      <p v-if="isIdFail">
        회원님의 가입정보가 없습니다.
        <a href="#" @click.prevent="onMemberJoin()">[회원 가입하러 가기]</a>
      </p>
      <button
        type="button"
        @click="onSocialIdSearch('naver')"
        class="button button--negative button--lg w-12_12"
      >
        네이버
      </button>
      <br />
      <button
        type="button"
        @click="onSocialIdSearch('kakao')"
        class="button button--secondary button--lg w-12_12"
      >
        카카오
      </button>
      <br />
      <button
        type="button"
        @click="onSocialIdSearch('google')"
        class="button button--tertiary button--lg w-12_12"
      >
        구글
      </button>
    </form>
  </div>
</template>

<script type="text/javascript">
import { errorAlert } from "@functional/alert/alert-default";
export default {
  name: "id-search",
  data() {
    return {
      userNm: null,
      moblphon: null,
      userId: null,
      isIdSuccess: false,
      isIdFail: false
    };
  },
  methods: {
    initIdSearch() {
      this.userId = null;
      this.isIdSuccess = false;
      this.isIdFail = false;
    },
    async onIdSearch() {
      this.initIdSearch();
      if (!(await this.idSearchValidate())) return false;

      const userNm = this.userNm;
      const moblphon = this.moblphon;

      const parmas = {
        userNm: encodeURIComponent(userNm),
        moblphon: moblphon
      };
      const data = await this.idSearch(parmas);
      if (data && data.userId) {
        this.userId = data.userId;
        this.isIdSuccess = true;
        this.isIdFail = false;
      } else {
        this.userId = null;
        this.isIdSuccess = false;
        this.isIdFail = true;
      }

      // this.$cookies.set("idSearch", data, 60);
      // this.$router.push({
      //   path: `${this.$config.ROUTE_USERS_PREFIX}/member/search/id-result`
      // });
    },
    idSearch(params) {
      const config = {
        params: params
      };
      return this.$axios.get(
        `${this.$config.ROUTE_API_USERS_PREFIX}/auth/idSearch`,
        config
      );
    },
    async idSearchValidate() {
      const userNm = this.userNm;
      const moblphon = this.moblphon;

      if (userNm === null || userNm === "") {
        await errorAlert("이름을 입력해 주세요.");
        return false;
      }
      if (moblphon === null || moblphon === "") {
        await errorAlert("전화번호를 입력해주세요.");
        return false;
      }

      return true;
    },
    onPwdSearch() {
      this.$router.push({
        path: `${this.$config.ROUTE_USERS_PREFIX}/member/search/pwd`,
        query: { userId: this.userId }
      });
    },
    onMemberJoin() {
      this.$router.push({
        path: `${this.$config.ROUTE_USERS_PREFIX}/member/register`
      });
    },
    onSocialIdSearch(socialType) {
      let sUrl = "";
      if (socialType === "naver") {
        sUrl = "https://nid.naver.com/user2/help/idInquiry?menu=idinquiry";
      } else if (socialType === "kakao") {
        sUrl =
          "https://accounts.kakao.com/weblogin/find_account_guide?continue=https%3A%2F%2Faccounts.kakao.com%2Fweblogin%2Faccount";
      } else if (socialType === "google") {
        sUrl =
          "https://accounts.google.com/signin/v2/usernamerecovery?flowName=GlifWebSignIn&flowEntry=ServiceLogin";
      }

      // location.href = sUrl;
      window.open(sUrl, "_blank");
    }
  }
};
</script>
