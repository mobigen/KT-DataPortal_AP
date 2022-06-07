<template>
  <header :class="isLnbOpen ? 'open-header' : ''">
    <div class="header" :class="width < 1024 ? 'header-mobile' : ''">
      <div class="header__inner">
        <h1 class="logo">
          <a href="#">한국자동차연구원 데이터포털</a>
        </h1>
        <div class="gnb-area">
          <div class="top-bar">
            <ul class="top-menu">
              <li class="top-menu__item">
                <NuxtLink to="/" class="top-menu__link" href="#">홈</NuxtLink>
              </li>
              <li v-if="user === null" class="top-menu__item">
                <NuxtLink to="/sample/login" class="top-menu__link" href="#"
                  >로그인</NuxtLink
                >
              </li>
              <li v-if="user === null" class="top-menu__item">
                <a class="top-menu__link" href="#">회원가입</a>
              </li>
              <li v-if="user !== null" class="top-menu__item user-name">
                <a class="top-menu__link" href="#">{{ user.name }}</a>
              </li>
              <li v-if="user !== null" class="top-menu__item">
                <a class="top-menu__link" href="/logout">로그아웃</a>
              </li>
              <li class="top-menu__item">
                <a class="top-menu__link" href="/logout">마이디스크</a>
              </li>
              <li class="top-menu__search">
                <label for="top-menu__input" class="hidden">Label</label>
                <base-input
                  class="top-menu__input"
                  @keydown="isComboBoxShow = true"
                  id="top-menu__input"
                  placeholder="검색어를 입력하세요"
                ></base-input>
                <base-button
                  class="top-menu-input__clear-button"
                  title="초기화"
                >
                  <svg-icon
                    class="svg-icon__clear-button"
                    name="close"
                    aria-hidden="true"
                  ></svg-icon>
                </base-button>
                <base-button title="검색" class="top-menu-input__search-button">
                  <svg-icon
                    class="svg-icon__search-button"
                    name="search"
                    aria-hidden="true"
                  ></svg-icon>
                </base-button>
              </li>
            </ul>
          </div>

          <div
            class="header-mobile__menu-button"
            @click="isMobileGnbOpen = true"
          >
            <base-button class="button--icon button--link">
              <svg-icon name="menu_katech" class="svg-icon" />
              <span class="hidden">메뉴열기</span></base-button
            >
          </div>

          <nav
            class="nav"
            :class="isMobileGnbOpen ? 'nav--open' : ''"
            @mouseleave="isLnbOpen = false"
          >
            <div class="mobile-top-bar">
              <div class="mobile-top-bar__home-button">
                <base-button class="button--link button--icon">
                  <svg-icon name="home_katech" class="svg-icon" />
                  <span class="hidden">처음으로가기</span>
                </base-button>
              </div>
              <ul class="top-menu">
                <li v-if="user === null" class="top-menu__item">
                  <NuxtLink to="/sample/login" class="top-menu__link" href="#"
                    >로그인</NuxtLink
                  >
                </li>
                <li v-if="user === null" class="top-menu__item">
                  <a class="top-menu__link" href="#">회원가입</a>
                </li>
                <li v-if="user !== null" class="top-menu__item user-name">
                  <a class="top-menu__link" href="#">{{ user.name }}</a>
                </li>
                <li v-if="user !== null" class="top-menu__item">
                  <a class="top-menu__link" href="/logout">로그아웃</a>
                </li>
                <li class="top-menu__item">
                  <a class="top-menu__link" href="/logout">마이디스크</a>
                </li>
                <!--<li class="top-menu__search">
                  <label for="top-menu__input" class="hidden">Label</label>
                  <base-input class="top-menu__input" @keydown="isComboBoxShow = true" id="top-menu__input" placeholder="검색어를 입력하세요" ></base-input>
                  <base-button class="top-menu-input__clear-button" title="초기화">
                    <svg-icon class="svg-icon" name="close" aria-hidden="true"></svg-icon>
                  </base-button>
                  <base-button title="검색" class="top-menu-input__search-button">
                    <svg-icon class="svg-icon button__icon" name="search" aria-hidden="true"></svg-icon>
                  </base-button>
                </li>
                -->
              </ul>
            </div>
            <div
              class="header-mobile__close-button"
              @click="isMobileGnbOpen = false"
            >
              <base-button class="button--icon button--link button--lg">
                <svg-icon name="close" class="svg-icon" />
                <span class="hidden">메뉴닫기</span>
              </base-button>
            </div>
            <ul class="gnb">
              <li class="gnb__item" @mouseover="isLnbOpen = true">
                <NuxtLink to="/katech/search" class="gnb__link"
                  ><span>데이터 검색</span></NuxtLink
                >
                <ul class="lnb">
                  <li class="lnb__item">
                    <NuxtLink to="/katech/search-map" class="lnb__link"
                      >데이터 통합검색</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/katech/search-map" class="lnb__link"
                      >데이터맵 검색</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/katech/search-keyword" class="lnb__link"
                      >연관관계 검색</NuxtLink
                    >
                  </li>
                </ul>
              </li>
              <li class="gnb__item" @mouseover="isLnbOpen = true">
                <NuxtLink to="/katech/search" class="gnb__link"
                  ><span>데이터 등록</span></NuxtLink
                >
                <ul class="lnb">
                  <li class="lnb__item">
                    <NuxtLink to="/katech/search-map" class="lnb__link"
                      >데이터 등록</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/katech/search-map" class="lnb__link"
                      >데이터 일괄등록 요청</NuxtLink
                    >
                  </li>
                </ul>
              </li>
              <li class="gnb__item" @mouseover="isLnbOpen = true">
                <NuxtLink to="/katech/search" class="gnb__link"
                  ><span>데이터 분석활용</span></NuxtLink
                >
                <ul class="lnb">
                  <li class="lnb__item">
                    <NuxtLink to="/katech/search-map" class="lnb__link"
                      >데이터 활용사례</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/katech/search-map" class="lnb__link"
                      >데이터 분석 시각화</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/katech/search-keyword" class="lnb__link"
                      >데이터 분석 요청</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/katech/search-keyword" class="lnb__link"
                      >데이터 분석 도구</NuxtLink
                    >
                  </li>
                </ul>
              </li>
              <li class="gnb__item" @mouseover="isLnbOpen = true">
                <NuxtLink to="/katech/search" class="gnb__link"
                  ><span>커뮤니티</span></NuxtLink
                >
                <ul class="lnb">
                  <li class="lnb__item">
                    <NuxtLink to="/katech/search-map" class="lnb__link"
                      >데이터 분석 경진대회</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/katech/search-map" class="lnb__link"
                      >데이터 교육</NuxtLink
                    >
                  </li>
                </ul>
              </li>
              <li class="gnb__item" @mouseover="isLnbOpen = true">
                <NuxtLink to="/katech/search" class="gnb__link"
                  ><span>이용안내</span></NuxtLink
                >
                <ul class="lnb">
                  <li class="lnb__item">
                    <NuxtLink to="/katech/search-map" class="lnb__link"
                      >공지사항</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/katech/search-map" class="lnb__link"
                      >FAQ</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/katech/search-keyword" class="lnb__link"
                      >문의하기</NuxtLink
                    >
                  </li>
                </ul>
              </li>
              <li class="gnb__item" @mouseover="isLnbOpen = true">
                <NuxtLink to="/katech/search" class="gnb__link"
                  ><span>마이페이지</span></NuxtLink
                >
                <ul class="lnb">
                  <li class="lnb__item">
                    <NuxtLink to="/katech/search-map" class="lnb__link"
                      >마이디스크</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/katech/search-map" class="lnb__link"
                      >데이터 활용관리</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/katech/search-keyword" class="lnb__link"
                      >관심/등록 데이터</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/katech/search-keyword" class="lnb__link"
                      >문의내역</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/katech/search-keyword" class="lnb__link"
                      >개인정보 관리</NuxtLink
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          <div class="nav-dim"></div>
        </div>
      </div>
    </div>
  </header>
</template>

<i18n src="./header.json"></i18n>

<script>
import BaseButton from "@component/project/katech/atoms/base-button/base-button";
import BaseInput from "@component/project/katech/atoms/base-input/base-input";
// import Locale from "@project/sample/locale/locale.vue";
import { mapGetters } from "vuex";

export default {
  name: "Header",
  components: {
    BaseButton,
    BaseInput
  },
  data() {
    return {
      user: null,
      activeElementIndex: 0,
      width: 0,
      isLnbOpen: false,
      isMobileGnbOpen: false
    };
  },
  computed: {
    // ...mapGetters({
    //   user: "user"
    // })
  },
  mounted() {
    window.addEventListener("resize", this.checkResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.checkResize);
  },
  methods: {
    checkResize(event) {
      this.width = window.innerWidth;
    },
    onChangeLocale(param) {
      // this.$i18n.setLocale(param);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./header";
</style>
