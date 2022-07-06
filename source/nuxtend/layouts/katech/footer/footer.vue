<template lang="html">
  <footer>
    <div class="footer-top">
      <div class="footer-top__inner">
        <div class="footer-top__list">
          <ul>
            <li class="footer-top__item">
              <a
                href="/"
                class="footer-top__item-text"
                :title="$t('footer.nav.home')"
              >
                {{ $t("footer.nav.home") }}
              </a>
            </li>
            <li class="footer-top__item">
              <a
                href="#"
                target="_blank"
                class="footer-top__item-text"
                :title="$t('footer.nav.terms')"
              >
                {{ $t("footer.nav.terms") }}
              </a>
            </li>
            <li class="footer-top__item">
              <a
                href="#"
                target="_blank"
                class="footer-top__item-text"
                :title="$t('footer.nav.privacy-policy')"
              >
                {{ $t("footer.nav.privacy-policy") }}
              </a>
            </li>
            <li class="footer-top__item">
              <a
                href="#"
                target="_blank"
                class="footer-top__item-text"
                :title="$t('footer.nav.copyright-policy')"
              >
                {{ $t("footer.nav.copyright-policy") }}
              </a>
            </li>
            <li class="footer-top__item">
              <a
                href="'mailto:' + $t('footer.company-mail')"
                class="footer-top__item-text"
                :title="$t('footer.nav.personal-center')"
              >
                {{ $t("footer.nav.personal-center") }}
              </a>
            </li>
            <li class="footer-top__item">
              <a
                href="#"
                target="_blank"
                class="footer-top__item-text"
                :title="$t('footer.nav.data-report')"
              >
                {{ $t("footer.nav.data-report") }}
              </a>
            </li>
          </ul>
        </div>
        <div class="footer-top__family-site">
          <div
            class="select"
            :class="isSelectOpen ? 'select--open' : ''"
            @click="isSelectOpen = !isSelectOpen"
          >
            <div class="select-selector">
              <button class="select-selector__button">
                <span class="select-selector__title">{{
                  selectedFamilySite.title
                }}</span>
                <svg-icon
                  class="svg-icon select-selector__icon"
                  name="chevron-down"
                  aria-hidden="true"
                ></svg-icon>
              </button>
            </div>
            <div class="select-container footer-top__family-site-select">
              <ul class="select-container__list">
                <li
                  class="select-container__item"
                  v-for="(item, index) in familyList"
                  :key="index"
                >
                  <button class="select-container__button" type="button">
                    <a
                      :href="item.url"
                      target="_blank"
                      title="새창열기"
                      class="select-container__text"
                      >{{ item.title }}</a
                    >
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-bottom__inner">
        <div class="logo">한국자동차연구원 데이터포털</div>
        <div class="footer-bottom__info">
          <p class="footer-bottom__text-line">
            {{ $t("footer.company-address") }}
          </p>
          <p class="footer-bottom__copyright">
            <span class="footer-bottom__info-text">{{
              $t("footer.company-copyright")
            }}</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<i18n src="./footer.json"></i18n>

<script type="text/javascript">
import FamilySite from "./footer.familysite.json";
import { errorAlert } from "@functional/alert/alert-default";

export default {
  name: "Footer",
  data() {
    return {
      isSelectOpen: false,
      selectedFamilySite: {
        title: this.$t("footer.relative-site")
      }
    };
  },
  computed: {
    familyList() {
      return FamilySite;
    }
  },
  methods: {
    onSelectFamilySize(item) {
      this.selectedFamilySite = item;
    },
    async onClickMoveRelativeSize() {
      let url = this.selectedFamilySite.url;
      if (url === undefined) {
        await errorAlert({ content: this.$t("footer.error-relative-site") });
        return;
      }

      window.open(url);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./footer";
</style>
