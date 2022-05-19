const UrlPattern = require('url-pattern');

export default ({ $axios, $config }, inject) => {
  const getUser = async () => {
    const user = await $axios
      .post(`${$config.API_USERS_PREFIX}/auth/user`)
      .catch((e) => {
        console.log('e : ', e)
      })

    return user
  }

  const getAdminUser = async () => {
    const user = await $axios
      .post(`${$config.API_ADMIN_USERS_PREFIX}/auth/user`)
      .catch((e) => {
        console.log('e : ', e)
      })

    return user
  }

  const isUserRouteUrl = (path) => {
    //const pattern = new UrlPattern(/^\/user\/(.*)$/);
    //const pattern = new UrlPattern(/^\/admin\/api\/(.*)$/);
    const pattern = new UrlPattern('\(/\)\(/portal/ui*\)');
    const data = pattern.match(path);
    if ( data ) {
      return true;
    } else {
      return false;
    }
  }

  const isAdminRouteUrl = (path) => {
    const pattern = new UrlPattern('\(/mgnt/ui\)\(/mgnt/ui*\)');
    const data = pattern.match(path);
    if ( data ) {
      return true;
    } else {
      return false;
    }
  }

  inject('getUser', getUser)
  inject('getAdminUser', getAdminUser)
  inject('isUserRouteUrl', isUserRouteUrl)
  inject('isAdminRouteUrl', isAdminRouteUrl)

}
