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
  $axios.onRequest((config) => {
    const userAccessToken = $cookies.get($config.USER_ACCESS_TOKEN_NAME);
    const adminAccessToken = $cookies.get($config.ADMIN_ACCESS_TOKEN_NAME);
    // console.log("Making request to " + config.url);
    // console.log("$cookies userAccessToken : ",  userAccessToken);
    // console.log("$cookies adminAccessToken : ",  adminAccessToken);
    // console.log("isAdminUrl(config.url) : ",  isAdminUrl(config.url));
    // console.log("$config userAccessToken : ",  $config.USER_ACCESS_TOKEN_NAME);
    // console.log("isUserApiUrl(config.url) ",  isUserApiUrl(config.url));
    if (isUserApiUrl(config.url)) {
      config.headers.common[
        $config.USER_ACCESS_TOKEN_NAME
      ] = `${userAccessToken}`;
    } else if (isAdminApiUrl(config.url)) {
      config.headers.common[
        $config.ADMIN_ACCESS_TOKEN_NAME
      ] = `${adminAccessToken}`;
    }
  });

  $axios.onResponse((response) => {
    let data = response.data;
    if (data.hasOwnProperty("result") && data.result === 0) {
      let errorMessage = data.errorMessage;
      if (errorMessage === null || errorMessage === "") {
        errorMessage = "여기에 시스템 에러 메세지를 넣어야 함";
      }
      alert(errorMessage);
      return Promise.resolve(false);
    }
    return data.data;
  });
}
