import RSA from "rsajs";
const UrlPattern = require("url-pattern");

export default ({ $axios, $config }, inject) => {
  const getPublicKey = async () => {
    const publicKey = await $axios.get(
      `${$config.ROUTE_API_USERS_PREFIX}/auth/key`
    );
    return publicKey;
  };

  const encrypt = (key, source) =>{
    const encrypt = new RSA();
    encrypt.setKey(key);

    return encrypt.encrypt(source);
  };

  const getUser = async () => {
    const user = await $axios
      .get(`${$config.ROUTE_API_USERS_PREFIX}/user`)
      .catch((e) => {
        console.log("e : ", e);
      });

    return user;
  };

  const getAuthUser = async () => {
    const user = await $axios
      .get(`${$config.ROUTE_API_USERS_PREFIX}/auth/user`)
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
      .get(`${$config.ROUTE_API_USERS_PREFIX}/user/info`, config)
      .catch((e) => {
        console.log("e : ", e);
      });

    return user;
  };

  const isUserRouteUrl = (path) => {
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

  const chkUserId = (userId) => {
    const reg_userId = /^[a-z0-9]{4,20}$/;
    if (!reg_userId.test(userId)) {
      return false;
    }
    return true;
  };

  const chkEmail = (email) => {
    const reg_email =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (!reg_email.test(email)) {
      return false;
    } else {
      return true;
    }
  };

  inject("getPublicKey", getPublicKey);
  inject("encrypt", encrypt);
  inject("getUser", getUser);
  inject("getAuthUser", getAuthUser);
  inject("getUserInfo", getUserInfo);
  inject("isUserRouteUrl", isUserRouteUrl);
  inject("isAdminRouteUrl", isAdminRouteUrl);
  inject("chkUserId", chkUserId);
  inject("chkEmail", chkEmail);
};
