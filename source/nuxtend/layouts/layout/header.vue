<template>
  <div>
    <json-viwer />
    <header>
      <h1>Header</h1>
      <basic-nav :menuList="menuList" />
      <ul>
        <li>
          <router-link
            :to="{ path: '/portal/ui/users/login' }"
            v-if="!getUserInfo.authenticated"
            >로그인</router-link
          >
          <a @click="logout" v-else>로그아웃</a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <router-link :to="{ path: '/portal/ui/users/member' }"
            >회원정보1</router-link
          >&nbsp;&nbsp;&nbsp;&nbsp;
          <router-link
            :to="{ path: '/portal/ui/users/member?id=test&id2=test2' }"
            >회원정보2</router-link
          >
        </li>
      </ul>
      <ul>
        <li>
          <router-link
            :to="{ path: '/mgnt/ui/users/login' }"
            v-if="!getAdminUserInfo.authenticated"
            >관리자 로그인</router-link
          >
          <a @click="adminLogout" v-else>관리자 로그아웃</a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <router-link :to="{ path: '/mgnt/ui/users/member' }"
            >관리자 회원정보1</router-link
          >&nbsp;&nbsp;&nbsp;&nbsp;
          <router-link
            :to="{ path: '/mgnt/ui/users/member?id=admin&id2=admin2' }"
            >관리자 회원정보2</router-link
          >
        </li>
      </ul>
    </header>
  </div>
</template>

<script>
import BasicNav from "@/components/aiPlatform/basic/basic-nav.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "layout-header",
  extends: {},
  data() {
    return {
      menuList: [
        { menuName: "메인", url: "/" },
        {
          menuName: "SuperAdmin-MetaName",
          url: "/superAdmin/meta/metaName/list"
        },
        { menuName: "SuperAdmin-MetaMap", url: "/superAdmin/meta/map/list" },
        { menuName: "Admin-MetaName", url: "/mgnt/ui/meta/List" },
        { menuName: "Admin-MetaTree", url: "/mgnt/ui/meta/tree" }
      ]
    };
  },
  props: {},
  components: { BasicNav },
  computed: {
    ...mapGetters("users/user", ["getUserInfo"]),
    ...mapGetters("users/adminUser", ["getAdminUserInfo"])
  },
  mounted() {
    // console.log('header mounted getUserInfo.authenticated : ', this.getUserInfo.authenticated)
    // console.log('header mounted path _1 : ', this.$route.fullPath)
    // console.log('header mounted path _2 : ', window.location)
  },
  watch: {},
  methods: {
    ...mapActions("users/user", ["clearUserInfo"]),
    ...mapActions("users/adminUser", ["clearAdminUserInfo"]),
    async logout() {
      const userAccessToken = await this.$axios.post(
        `${this.$config.API_USERS_PREFIX}/auth/logout`
      );
      // console.log('userAccessToken : ', userAccessToken)
      await this.$cookies.remove(this.$config.USER_ACCESS_TOKEN_NAME);
      await this.clearUserInfo();

      await this.$router.push({
        path: `${this.$config.USER_LOGIN_PAGE}`,
        query: {
          prevFullUrl: `${encodeURIComponent(this.$route.fullPath)}`
        }
      });
    },
    async adminLogout() {
      const adminAccessToken = await this.$axios.post(
        `${this.$config.API_ADMIN_USERS_PREFIX}/auth/logout`
      );
      await this.$cookies.remove(this.$config.ADMIN_ACCESS_TOKEN_NAME);
      await this.clearAdminUserInfo();

      await this.$router.push({
        path: `${this.$config.ADMIN_LOGIN_PAGE}`,
        query: {
          prevFullUrl: `${encodeURIComponent(this.$route.fullPath)}`
        }
      });
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
header {
  background-color: lightslategray;
  > nav {
    width: 70%;
    margin: auto;
  }
}
</style>
