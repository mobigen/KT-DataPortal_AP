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
    <p>
      <button @click.prevent="onSocialLogin('naver')">네이버 회원가입</button>
    </p>
    <p>
      <button @click.prevent="onSocialLogin('kakao')">카카오 회원가입</button>
    </p>
    <p>
      <button @click.prevent="onSocialLogin('google')">구글 회원가입</button>
    </p>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "index",
  mounted() {},
  methods: {
    onJoinType(userType) {
      this.$router.push({
        path: `${this.$config.ROUTE_USERS_PREFIX}/member/register/agree`,
        query: { userType: userType }
      });
    },
    onSocialLogin(socialType) {
      location.href = `/oauth2/authorization/` + socialType;
    }
  }
};
</script>
