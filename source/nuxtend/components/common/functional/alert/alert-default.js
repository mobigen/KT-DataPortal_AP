import Vue from "vue";
import AlertDefault from "./alert-default.vue";
import i18nGenerator from "@/utility/i18n-generator";
import messages from "./alert-default.json";

/**
 * 기본적인 Alert 창의 원형
 * @param props
 * @param config
 * @param events
 * @returns {Promise<unknown>}
 */
const defaultAlert = (props, config, events) => {
  return new Promise((resolve) => {
    let modalProps = {
      clickToClose: false,
      draggable: false
    };

    let modalEvents = {
      confirm: () => {
        resolve(1);
      }
    };

    modalProps = Object.assign(modalProps, config);
    modalEvents = Object.assign(modalEvents, events);

    Vue.prototype.$modal.show(AlertDefault, props, modalProps, modalEvents);
  });
};
export default defaultAlert;

/**
 * 성공 시 사용하는 Alert
 * @param content
 * @returns {Promise<*>}
 */
export const successAlert = (params) => {
  let locale = null;
  if (typeof $nuxt !== "undefined") {
    locale = $nuxt.$options.i18n.locale;
  }
  let i18n = i18nGenerator(locale, messages);
  let props = {
    title: params.title ? params.title : i18n.t("alert-success.title"),
    iconTheme: i18n.t("alert-success.icon-theme"),
    confirmButtonTheme: i18n.t("alert-success.confirm-button-theme"),
    confirmButtonText: i18n.t("alert-success.confirm-button-text"),
    type: i18n.t("alert-success.type"),
    content: params.content,
    width: "450"
  };

  let config = {
    width: 300,
    height: "auto",
    pivotY: 0.3,
    styles: "overflow: inherit",
    draggable: false
  };

  return defaultAlert(props, config);
};

/**
 * 실패 시 사용하는 Alert
 * @param content
 * @returns {Promise<*>}
 */
export const errorAlert = (content) => {
  let locale = null;
  if (typeof $nuxt !== "undefined") {
    locale = $nuxt.$options.i18n.locale;
  }
  let i18n = i18nGenerator(locale, messages);
  let props = {
    title: i18n.t("alert-error.title"),
    iconTheme: i18n.t("alert-error.icon-theme"),
    confirmButtonTheme: i18n.t("alert-error.confirm-button-theme"),
    confirmButtonText: i18n.t("alert-error.confirm-button-text"),
    type: i18n.t("alert-error.type"),
    content: content,
    width: "450"
  };

  let config = {
    width: 300,
    height: "auto",
    pivotY: 0.3,
    styles: "overflow: inherit",
    draggable: false
  };

  return defaultAlert(props, config);
};

export const confirmAlert = (content, events) => {
  let locale = null;
  if (typeof $nuxt !== "undefined") {
    locale = $nuxt.$options.i18n.locale;
  }
  let i18n = i18nGenerator(locale, messages);
  let props = {
    title: i18n.t("alert.confirm"),
    iconTheme: i18n.t("alert.property.icon-theme"),
    confirmButtonTheme: i18n.t("alert.property.confirm-button-theme"),
    confirmButtonText: "확인",
    type: "confirm",
    content: content,
    width: "450"
  };

  let config = {
    width: 300,
    height: "auto",
    pivotY: 0.3,
    styles: "overflow: inherit",
    draggable: false
  };

  return defaultAlert(props, config, events);
};
