<template lang="html">
  <div>
    <h1>비밀번호 찾기</h1>
    <form class="form login-form" @submit.prevent="onPwdSearch">
      <svg-icon name="user-setting" class="svg-icon" />
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
      <label for="mobile">핸드폰번호</label><br />
      <input
        class="text-input"
        type="text"
        id="mobile"
        v-model="mobile"
        maxlength="20"
        required
      />
      <br />
      <button type="submit" class="button button--primary button--lg w-12_12">
        비밀번호찾기
      </button>
    </form>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "id-search",
  data() {
    return {
      userId: null,
      userNm: null,
      mobile: null
    };
  },
  methods: {
    async onPwdSearch() {
      const userId = this.userId;
      const userNm = this.userNm;
      const mobile = this.mobile;

      const parmas = {
        userId: userId,
        userNm: userNm,
        mobile: mobile
      };
      const data = await this.pwdSearch(parmas);
      if (!data || !data.userId) {
        console.log("error : ", data);
        return false;
      }

      this.$cookies.set("pwdSearch", data, 60);
      this.$router.push({
        path: `${this.$config.ROUTE_USERS_PREFIX}/member/search/pwd-modify`
      });
    },
    pwdSearch(params) {
      return this.$axios.post(
        `${this.$config.API_USERS_PREFIX}/auth/pwdSearch`,
        params
      );
    }
  }
};
</script>
