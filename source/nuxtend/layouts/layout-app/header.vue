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
          separator="|"
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
          url: "/app/search",
          children: [
            { menuName: "데이터통합검색", url: "/app/search/fullSearch" },
            { menuName: "데이터맵검색", url: "/app/search/mapSearch" },
            { menuName: "연관관계검색", url: "/app/search/relationSearch" }
          ]
        },
        {
          menuName: "데이터등록",
          url: "/app/register",
          children: [
            {
              menuName: "데이터(개별)등록",
              url: "/app/register/registerSingle"
            },
            { menuName: "데이터일괄등록요청", url: "/app/register/registerAll" }
          ]
        },
        {
          menuName: "마이페이지",
          url: "/app/my",
          children: [
            { menuName: "마이디스크", url: "/app/my/mydisk" },
            { menuName: "개인정보관리", url: "/app/my/info" }
          ]
        }
      ],
      /* 임시로 url, icon 설정 */
      userMenuList: [
        { menuName: "로그인", url: "/app/search" },
        { menuName: "회원가입", url: "/app/search/fullSearch" },
        { menuName: "마이디스크", url: "/app/search/mapSearch" }
      ],
      textPreviousIcon: [, , "icon"],
      textNextIcon: ["icon", ,]
    };
  },
  props: {},
  components: { BasicNav, BasicMenu },
  computed: {},
  watch: {},
  methods: {},
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

body {
  background-color: red;
}
</style>
