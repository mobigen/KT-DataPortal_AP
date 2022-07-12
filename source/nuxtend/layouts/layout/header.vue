<template>
  <div>
    <json-viwer />
    <header>
      <h1>Header</h1>

      <router-link :to="{ path: '/superAdmin/apiRouter/list' }">
        API ROUTER
      </router-link>
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
    </header>
  </div>
</template>

<script>
import BasicNav from "@common/atoms/basic-nav.vue";
import { mapActions, mapGetters } from "vuex";

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
        { menuName: "Admin-MetaName", url: "/superAdmin/admin/meta/List" },
        { menuName: "Admin-MetaTree", url: "/superAdmin/admin/meta/tree" }
      ]
    };
  },
  props: {},
  components: { BasicNav },
  computed: {
    ...mapGetters("users/user", ["getUserInfo"])
  },
  mounted() {
    // console.log('header mounted getUserInfo.authenticated : ', this.getUserInfo.authenticated)
    // console.log('header mounted path _1 : ', this.$route.fullPath)
    // console.log('header mounted path _2 : ', window.location)
  },
  watch: {},
  methods: {
    ...mapActions("users/user", ["clearUserInfo"]),
    async logout() {
      const userAccessToken = await this.$axios.get(
        `${this.$config.ROUTE_API_USERS_PREFIX}/auth/logout`
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
