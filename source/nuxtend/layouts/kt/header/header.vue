<template>
  <header :class="isLnbOpen ? 'open-header' : ''">
    <div class="header">
      <div class="header__inner">
        <h1 class="logo">
          <a href="#">KT유통포털</a>
        </h1>
        <div class="gnb-area">
          <div class="top-bar">
            <ul class="top-menu">
              <li v-if="user === null" class="top-menu__item">
                <NuxtLink to="/sample/login" class="top-menu__link" href="#"
                  >로그인</NuxtLink
                >
              </li>
              <li v-if="user === null" class="top-menu__item">
                <a class="top-menu__link" href="#">회원가입</a>
              </li>
              <!--
              <li v-if="user !== null" class="top-menu__item user-name">
                <a class="top-menu__link" href="#">{{ user.name }}</a>
              </li>
              -->
              <li v-if="user !== null" class="top-menu__item">
                <a class="top-menu__link disabled" href="/logout">로그아웃</a>
              </li>
              <li class="top-menu__item">
                <a class="top-menu__link disabled" href="/kt/my-wish">
                  관심데이터
                  <base-badge class="badge--dark badge--rounded">
                    <span class="badge__label">37</span>
                  </base-badge>
                </a>
              </li>
              <!-- <li class="top-menu__search">
                <label for="top-menu__input" class="hidden">Label</label>
                <base-input class="top-menu__input" @keydown="isComboBoxShow = true" id="top-menu__input" placeholder="검색어를 입력하세요" ></base-input>
                <base-button class="top-menu-input__clear-button" title="초기화">
                  <svg-icon class="svg-icon__clear-button" name="close" aria-hidden="true"></svg-icon>
                </base-button>
                <base-button title="검색" class="top-menu-input__search-button">
                  <svg-icon class="svg-icon__search-button" name="search" aria-hidden="true"></svg-icon>
                </base-button>
              </li> -->
            </ul>
          </div>

          <!-- <div class="header-mobile__menu-button" @click="isMobileGnbOpen = true">
            <base-button class="button--icon button--link">
              <svg-icon name="menu_katech" class="svg-icon" />
              <span class="hidden">메뉴열기</span></base-button>
          </div> 2022-06-16 DEL : 모바일없음 -->

          <nav
            class="nav"
            :class="isMobileGnbOpen ? 'nav--open' : ''"
            @mouseleave="isLnbOpen = false"
          >
            <!--<div class="mobile-top-bar">
              <div class="mobile-top-bar__home-button">
                <base-button class="button--link button--icon">
                  <svg-icon name="home_katech" class="svg-icon" />
                  <span class="hidden">처음으로가기</span>
                </base-button>
              </div>
              <ul class="top-menu">
                <li v-if="user === null" class="top-menu__item"><NuxtLink to="/sample/login" class="top-menu__link" href="#">로그인</NuxtLink></li>
                <li v-if="user === null" class="top-menu__item"><a class="top-menu__link" href="#">회원가입</a></li>
                <li v-if="user !== null" class="top-menu__item user-name">
                  <a class="top-menu__link" href="#">{{ user.name }}</a>
                </li>
                <li v-if="user !== null" class="top-menu__item"><a class="top-menu__link" href="/logout">로그아웃</a></li>
                <li class="top-menu__item"><a class="top-menu__link" href="/logout">마이디스크</a></li>
                <li class="top-menu__search">
                  <label for="top-menu__input" class="hidden">Label</label>
                  <base-input class="top-menu__input" @keydown="isComboBoxShow = true" id="top-menu__input" placeholder="검색어를 입력하세요" ></base-input>
                  <base-button class="top-menu-input__clear-button" title="초기화">
                    <svg-icon class="svg-icon" name="close" aria-hidden="true"></svg-icon>
                  </base-button>
                  <base-button title="검색" class="top-menu-input__search-button">
                    <svg-icon class="svg-icon button__icon" name="search" aria-hidden="true"></svg-icon>
                  </base-button>
                </li>
              </ul>
            </div>
            <div class="header-mobile__close-button" @click="isMobileGnbOpen = false">
              <base-button class="button--icon button--link button--lg">
                <svg-icon name="close" class="svg-icon" />
                <span class="hidden">메뉴닫기</span>
              </base-button>
            </div> 2022-06-16 DEL : 모바일없음 -->
            <ul class="gnb">
              <li class="gnb__item" @mouseover="isLnbOpen = true">
                <NuxtLink
                  to="/portal/ui/meta/search/fullSearch"
                  class="gnb__link"
                  ><span>데이터</span></NuxtLink
                >
                <ul class="lnb">
                  <li class="lnb__item">
                    <NuxtLink
                      to="/portal/ui/meta/search/fullSearch"
                      class="lnb__link"
                      >데이터검색</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/kt/search-map" class="lnb__link disabled"
                      >시각화검색</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/kt/registration" class="lnb__link disabled"
                      >데이터 신청</NuxtLink
                    >
                  </li>
                </ul>
              </li>
              <li class="gnb__item" @mouseover="isLnbOpen = true">
                <NuxtLink to="/kt/usage" class="gnb__link disabled"
                  ><span>데이터 활용</span></NuxtLink
                >
                <ul class="lnb">
                  <li class="lnb__item">
                    <NuxtLink to="/kt/example" class="lnb__link disabled"
                      >데이터 활용사례</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/kt/campaign" class="lnb__link disabled"
                      >AB캠페인</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/kt/analysis" class="lnb__link disabled"
                      >데이터 분석 툴</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/kt/project" class="lnb__link disabled"
                      >프로젝트</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink
                      to="/kt/content-register"
                      class="lnb__link disabled"
                      >데이터콘텐츠 등록</NuxtLink
                    >
                  </li>
                </ul>
              </li>
              <li class="gnb__item" @mouseover="isLnbOpen = true">
                <NuxtLink to="/kt/letsdata" class="gnb__link disabled"
                  ><span>커뮤니티</span></NuxtLink
                >
                <ul class="lnb">
                  <li class="lnb__item">
                    <NuxtLink to="/kt/letsdata" class="lnb__link disabled"
                      >Let’s DATA</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/kt/docean" class="lnb__link disabled"
                      >D Ocean 협의체</NuxtLink
                    >
                  </li>
                </ul>
              </li>
              <li class="gnb__item" @mouseover="isLnbOpen = true">
                <NuxtLink to="/kt/notice" class="gnb__link disabled"
                  ><span>이용안내</span></NuxtLink
                >
                <ul class="lnb">
                  <li class="lnb__item">
                    <NuxtLink to="/kt/notice" class="lnb__link disabled"
                      >공지사항</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/kt/faq" class="lnb__link disabled"
                      >FAQ</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/kt/inquiry" class="lnb__link disabled"
                      >문의하기</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/kt/service" class="lnb__link disabled"
                      >서비스 소개</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/kt/reference" class="lnb__link disabled"
                      >자료실</NuxtLink
                    >
                  </li>
                </ul>
              </li>
              <li class="gnb__item" @mouseover="isLnbOpen = true">
                <NuxtLink to="/kt/search" class="gnb__link disabled"
                  ><span>마이페이지</span></NuxtLink
                >
                <ul class="lnb">
                  <li class="lnb__item">
                    <NuxtLink to="/kt/my-dashboard" class="lnb__link disabled"
                      >대시보드</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/kt/my-wish" class="lnb__link disabled"
                      >관심데이터</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/portal/ui/users/my-usage" class="lnb__link"
                      >내 활용내역</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/kt/my-example" class="lnb__link disabled"
                      >내 활용사례</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/kt/my-data" class="lnb__link disabled"
                      >데이터 신청현황</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/kt/my-inquiry" class="lnb__link disabled"
                      >문의내역</NuxtLink
                    >
                  </li>
                  <li class="lnb__item">
                    <NuxtLink to="/kt/my-project" class="lnb__link disabled"
                      >프로젝트 관리</NuxtLink
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
import BaseBadge from "@component/common/atoms/base-badge/base-badge";
import BaseButton from "@component/common/atoms/base-button/base-button";
import BaseInput from "@component/common/atoms/base-input/base-input";
import Locale from "@component/common/molecules/locale/locale.vue";
import { mapGetters } from "vuex";

export default {
  name: "Header",
  components: {
    BaseBadge,
    BaseButton,
    BaseInput,
    Locale
  },
  data() {
    return {
      activeElementIndex: 0,
      width: 0,
      isLnbOpen: false,
      isMobileGnbOpen: false,
      user: {
        name: "TEST"
      }
    };
  },
  // computed: {
  //   ...mapGetters({
  //     user: "user"
  //   })
  // },
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
      this.$i18n.setLocale(param);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./header";
// 안쓰는 메뉴 disabled 처리 위해 임시로 추가
.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
