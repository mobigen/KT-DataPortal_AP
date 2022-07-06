<template lang="html">
  <footer>
    <div class="footer-top">
      <div class="footer-top__inner">
        <div class="footer-top__list">
          <ul>
            <li class="footer-top__item">
              <a href="#" target="_blank" class="footer-top__item-text" :title="$t('footer.nav.home')">
                {{ $t("footer.nav.home") }}
              </a>
            </li>
            <li class="footer-top__item">
              <a href="#" target="_blank" class="footer-top__item-text" :title="$t('footer.nav.terms')">
                {{ $t("footer.nav.terms") }}
              </a>
            </li>
            <li class="footer-top__item">
              <a href="#" target="_blank" class="footer-top__item-text" :title="$t('footer.nav.legal')">
                {{ $t("footer.nav.legal") }}
              </a>
            </li>
            <li class="footer-top__item">
              <a href="#" target="_blank" class="footer-top__item-text" :title="$t('footer.nav.privacy-policy')">
                {{ $t("footer.nav.privacy-policy") }}
              </a>
            </li>
            <li class="footer-top__item">
              <a href="#" target="_blank" class="footer-top__item-text" :title="$t('footer.nav.copyright-policy')">
                {{ $t("footer.nav.copyright-policy") }}
              </a>
            </li>
            <li class="footer-top__item">
              <a href="#" target="_blank" class="footer-top__item-text" :title="$t('footer.nav.data-report')">
                {{ $t("footer.nav.data-report") }}
              </a>
            </li>
          </ul>
        </div>
        <div class="footer-top__family-site">
          <div class="select" :class="isSelectOpen ? 'select--open' : ''" @click="isSelectOpen = !isSelectOpen">
            <div class="select-selector">
              <button class="select-selector__button">
                <span class="select-selector__title">{{ selectedFamilySite.title }}</span>
                <svg-icon
                  class="svg-icon select-selector__icon"
                  name="chevron-down"
                  aria-hidden="true"></svg-icon>
              </button>
            </div>
            <div class="select-container footer-top__family-site-select">
              <ul class="select-container__list">
                <li class="select-container__item" v-for="(item, index) in familyList" :key="index">
                  <button class="select-container__button" type="button">
                    <a :href="item.url" target="_blank" title="새창열기" class="select-container__text">{{item.title}}</a>
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
        <div class="logo">KT 유통포털</div>
        <div class="footer-bottom__info">
          <p class="footer-bottom__text-line">
            <span class="footer-bottom__info-text">{{ $t("footer.company-address-01") }}</span>
            <span class="footer-bottom__info-text">{{ $t("footer.company-address-02") }}</span>
            <span class="footer-bottom__info-text">{{ $t("footer.company-address-03") }}</span>
            <span class="footer-bottom__info-text">{{ $t("footer.company-address-04") }}</span>
            <span class="footer-bottom__info-text">{{ $t("footer.company-address-05") }}</span>
          </p>
          <p class="footer-bottom__text-line">
            <span class="footer-bottom__info-text">{{ $t("footer.company-tel") }}</span>
            <span class="footer-bottom__info-text">{{ $t("footer.company-email") }}</span>
          </p>
          <p class="footer-bottom__copyright">
            <span class="footer-bottom__info-text">{{ $t("footer.company-copyright") }}</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<i18n src="./footer.json"></i18n>

<script type="text/javascript">
import FamilySite from "./footer.familysite.json";

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
  }
};
</script>

<style lang="scss" scoped>
@import "./footer";
</style>
