const UrlPattern = require("url-pattern");

export default ({ $axios, $config }, inject) => {
  const getUser = async () => {
    console.log("common.js : getUser", `${$config.API_USERS_PREFIX}/user`);
    const user = await $axios
      .get(`${$config.API_USERS_PREFIX}/user`)
      .catch((e) => {
        console.log("e : ", e);
      });

    return user;
  };

  const getAuthUser = async () => {
    const user = await $axios
      .get(`${$config.API_USERS_PREFIX}/auth/user`)
      .catch((e) => {
        console.log("e : ", e);
      });

    return user;
  };

  const getUserInfo = async (param) => {
    const config = {
      params: param
    };
    const user = await $axios
      .get(`${$config.API_USERS_PREFIX}/user/info`, config)
      .catch((e) => {
        console.log("e : ", e);
      });

    return user;
  };

  const isUserRouteUrl = (path) => {
    //const pattern = new UrlPattern(/^\/user\/(.*)$/);
    //const pattern = new UrlPattern(/^\/admin\/api\/(.*)$/);
    const pattern = new UrlPattern("(/)(/portal/ui*)");
    const data = pattern.match(path);
    if (data) {
      return true;
    } else {
      return false;
    }
  };

  const isAdminRouteUrl = (path) => {
    const pattern = new UrlPattern("(/mgnt/ui)(/mgnt/ui*)");
    const data = pattern.match(path);
    if (data) {
      return true;
    } else {
      return false;
    }
  };

  inject("getUser", getUser);
  inject("getAuthUser", getAuthUser);
  inject("getUserInfo", getUserInfo);
  inject("isUserRouteUrl", isUserRouteUrl);
  inject("isAdminRouteUrl", isAdminRouteUrl);
};
