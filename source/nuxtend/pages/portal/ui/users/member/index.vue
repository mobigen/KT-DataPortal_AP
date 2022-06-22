<template lang="html">
  <div>
    <h1>사용자 회원정보</h1>
    <p>아이디 : {{ user.userId }}</p>
    <p>이름 : {{ user.userNm }}</p>
    <p>이메일 : {{ user.email }}</p>
    <div>
      권한 :
      <ul>
        <li v-for="(item, i) in user.authorities">
          {{ item.authority }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapGetters, mapActions } from "vuex";
export default {
  name: "index",
  data() {
    return {
      user: {}
    };
  },
  async mounted() {
    await this.userInfo();
  },
  computed: {
    ...mapGetters("users/user", ["getUserInfo"])
  },
  methods: {
    async userInfo() {
      // const user = await this.$getUser();
      // this.user = user;
      this.user = this.getUserInfo;
      console.log("this.user : ", this.user);
    }
  }
};
</script>
