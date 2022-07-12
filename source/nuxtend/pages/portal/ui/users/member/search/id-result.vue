<template lang="html">
  <div>
    <h1>ID 찾기 결과[{{ userId }}]</h1>
    <br />
    <button
      type="button"
      @click.prevent="onLoginPage"
      class="button button--primary button--lg w-12_12"
    >
      로그인
    </button>
  </div>
</template>
<script type="text/javascript">
import { errorAlert } from "@functional/alert/alert-default";

export default {
  name: "id-search-result",
  data() {
    return {
      userId: null
    };
  },
  beforeMount() {},
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const data = this.$cookies.get("idSearch");
      // console.log("data : ", data);
      if (data && data.userId) {
        this.userId = data.userId;
        this.$cookies.remove("idSearch");
        this.$cookies.set("idSearch", null, -1);
      } else {
        await errorAlert("비정상적인 접근입니다.");
        this.$router.push({
          path: `${this.$config.ROUTE_USERS_PREFIX}/member/search/id`
        });
      }
    },
    onLoginPage() {
      this.$router.push({
        path: `${this.$config.ROUTE_USERS_PREFIX}/login`
      });
    }
  }
};
</script>
