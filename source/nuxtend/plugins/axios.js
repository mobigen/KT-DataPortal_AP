import { errorAlert } from "@functional/alert/alert-default";
const UrlPattern = require("url-pattern");

const isUserApiUrl = (path) => {
  // const pattern = new UrlPattern(/^\/api(.*)$/);
  const pattern = new UrlPattern("/portal/api*");
  const data = pattern.match(path);
  if (data) {
    return true;
  } else {
    return false;
  }
};

const isAdminApiUrl = (path) => {
  // const pattern = new UrlPattern(/^\/admin\/api(.*)$/);
  const pattern = new UrlPattern("/mgnt/api*");
  const data = pattern.match(path);
  if (data) {
    return true;
  } else {
    return false;
  }
};

export default function ({ $axios, $config, $cookies, store, redirect }) {
  function showLoader() {
    if (typeof $nuxt !== "undefined") {
      $nuxt.$loading.start();
    }
  }

  function hideLoader() {
    if (typeof $nuxt !== "undefined") {
      $nuxt.$loading.finish();
    }
  }

  $axios.onRequest((config) => {
    showLoader();
  });

  $axios.onResponse(async (response) => {
    hideLoader();
    let data = response.data;

    /**
     * TODO : API Router에서 조회하는 경우 response가 달라서 임시로 따로 처리하였습니다.
     * - AP skysora.
     */
    if (response.config.url.includes("/apiRouter/")) {
      return response;
    }

    if (data.hasOwnProperty("result") && data.result === 0) {
      let errorMessage = data.errorMessage;
      if (errorMessage === null || errorMessage === "") {
        errorMessage = "여기에 시스템 에러 메세지를 넣어야 함";
      }
      await errorAlert(errorMessage);
      return Promise.resolve(false);
    }
    return data.data;
  });

  $axios.onError((error) => {
    hideLoader();
    errorAlert(error.message);
    return Promise.resolve(false);
  });
}
