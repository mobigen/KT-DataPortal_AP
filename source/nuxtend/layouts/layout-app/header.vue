<template>
  <div>
    <json-viwer />
    <header>
      <div>
        <h1>Header - 모든 페이지의 제목은 구현 완료시 삭제.</h1>
        <span
          >** 위치잡는 css 구현할 필요 없음. 각각의 component별로 구현되면 되고,
          기능우선.</span
        >
      </div>

      <div>LOGO, title Component</div>

      <div>
        <span
          >로그인,회원가입, 마이디스크 Component (화면설계기준 좌측 상단)</span
        >
        <span
          >버튼 클릭시, alert 형태로 event 처리까지만 구현 (detail한 동작구현
          x)</span
        >
        <basic-menu
          :menuList="userMenuList"
          :useSeparator="false"
          separator=""
          :textPreviousIcon="textPreviousIcon"
          :textNextIcon="textNextIcon"
        >
        </basic-menu>
      </div>

      <!-- menuComponent-->
      <basic-nav :menuList="menuList" />
    </header>
  </div>
</template>

<script>
import BasicNav from "@/components/aiPlatform/basic/basic-nav.vue";
import BasicMenu from "@/components/aiPlatform/basic/basic-menu.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "layout-header",
  extends: {},
  data() {
    return {
      menuList: [
        /**
         * 메뉴는 샘플로 만든 페이지만 참고하라고 모두 추가함.
         * 화면에 다 표시하지 않아도 괜찮음.
         * nav가 현재는 각 메뉴별 상위메뉴만 표시되게 되어있는데, 추후에 drop down 으로 표시될수도 있기 때문에
         * Component 구현할때 고민해봐야함.  (추후에 추가될 경우, Component를 분리할것인지, option값을 줘서 분기를 탈것인지 등등)
         */

        {
          menuName: "데이터검색",
          url: "/portal/ui/meta/search",
          children: [
            {
              menuName: "데이터통합검색",
              url: "/portal/ui/meta/search/fullSearch"
            },
            {
              menuName: "데이터맵검색",
              url: "/portal/ui/meta/search/mapSearch"
            },
            {
              menuName: "연관관계검색",
              url: "/portal/ui/meta/search/relationSearch"
            }
          ]
        },
        {
          menuName: "데이터등록",
          url: "/portal/ui/meta/register",
          children: [
            {
              menuName: "데이터(개별)등록",
              url: "/portal/ui/meta/register/registerSingle"
            },
            {
              menuName: "데이터일괄등록요청",
              url: "/portal/ui/meta/register/registerAll"
            }
          ]
        },
        {
          menuName: "마이페이지",
          url: "/portal/ui/meta/my",
          children: [
            { menuName: "마이디스크", url: "/portal/ui/meta/my/mydisk" },
            { menuName: "개인정보관리", url: "/portal/ui/meta/my/info" }
          ]
        },
        {
          menuName: "커뮤니티",
          url: "/portal/ui/board/community",
          children: [
            { menuName: "경진대회", url: "/portal/ui/board/community/contest" },
            {
              menuName: "데이터 교육",
              url: "/portal/ui/board/community/data-education"
            },
            {
              menuName: "기업지원",
              url: "/portal/ui/board/community/corporate-support"
            }
          ]
        },
        {
          menuName: "이용안내",
          url: "/portal/ui/board/information",
          children: [
            {
              menuName: "공지사항",
              url: "/portal/ui/board/information/notification"
            },
            { menuName: "FAQ", url: "/portal/ui/board/information/faq" },
            { menuName: "문의하기", url: "/portal/ui/board/information/qna" },
            {
              menuName: "ckeditor",
              url: "/portal/ui/board/information/ckeditor"
            },
            {
              menuName: "데이터맵검색",
              url: "/portal/ui/board/information/map-search"
            }
          ]
        }
      ],
      /* 임시로 url, icon 설정 */
      userMenuList: [
        { menuName: "로그인", url: `${this.$config.ROUTE_USERS_PREFIX}/login` },
        {
          menuName: "회원가입",
          url: `${this.$config.ROUTE_USERS_PREFIX}/member/register`
        },
        { menuName: "마이디스크", url: "/app/search/mapSearch" }
      ],
      textPreviousIcon: [null, null, "book-bookmark"],
      textNextIcon: ["key", null, null]
    };
  },
  props: {},
  components: { BasicNav, BasicMenu },
  computed: {
    ...mapGetters("users/user", ["getUserInfo"])
  },
  watch: {},
  methods: {},
  beforeCreate() {},
  created() {},
  async fetch() {},
  beforeMount() {
    console.log("this.getUserInfo : ", this.getUserInfo);
    if (this.getUserInfo && this.getUserInfo.authenticated) {
      // 로그인 후
      this.userMenuList = [
        {
          menuName: "로그아웃",
          url: ``
        },
        { menuName: "마이디스크", url: "/app/search/mapSearch" }
      ];
    } else {
      // 로그인 전
      this.userMenuList = [
        { menuName: "로그인", url: `${this.$config.ROUTE_USERS_PREFIX}/login` },
        {
          menuName: "회원가입",
          url: `${this.$config.ROUTE_USERS_PREFIX}/member/register`
        },
        { menuName: "마이디스크", url: "/app/search/mapSearch" }
      ];
    }
  }
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

body {
  background-color: red;
}
</style>
