<template lang="html">
  <div>
    <h1>ID 찾기</h1>
    <form class="form login-form" @submit.prevent="onIdSearch">
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
      <label for="mobile">핸드폰번호</label><br />
      <input
        class="text-input"
        type="text"
        id="moblphon"
        v-model="moblphon"
        maxlength="20"
        required
      />
      <br />
      <button type="submit" class="button button--primary button--lg w-12_12">
        아이디찾기
      </button>
    </form>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "id-search",
  data() {
    return {
      userNm: null,
      moblphon: null
    };
  },
  methods: {
    async onIdSearch() {
      const userNm = this.userNm;
      const moblphon = this.moblphon;

      const parmas = {
        userNm: encodeURIComponent(userNm),
        moblphon: moblphon
      };
      const data = await this.idSearch(parmas);
      if (!data || !data.userId) {
        console.log("error : ", data);
        return false;
      }

      this.$cookies.set("idSearch", data, 60);
      this.$router.push({
        path: `${this.$config.ROUTE_USERS_PREFIX}/member/search/id-result`
      });
    },
    idSearch(params) {
      const config = {
        params: params
      };
      return this.$axios.get(
        `${this.$config.API_USERS_PREFIX}/auth/idSearch`,
        config
      );
    }
  }
};
</script>
