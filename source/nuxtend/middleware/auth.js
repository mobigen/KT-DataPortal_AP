import _ from "lodash"

export const checkAuthorizationUrl = (path, checkUserUrl) => {
  const includeUserUrls = ["/portal/ui/users/member"]
  const includeAdminUrls = ["/mgnt/ui/users/member"]

  let idx = -1;

  if ( checkUserUrl ) {
    idx = _.findIndex(includeUserUrls, function (item) {
      return item === path
    })
  } else {
    idx = _.findIndex(includeAdminUrls, function (item) {
      return item === path
    })
  }
  // console.log('checkUserUrl : ', checkUserUrl)
  // console.log('idx : ', idx)
  if (idx > -1) return false
  else return true
}

export default async function ({ $isUserRouteUrl, $isAdminRouteUrl, $config, route, store, error, redirect }) {
  console.log('인증 route middleware 체크');
  const fullPath = route.fullPath;
  const path = route.path;
  const query = route.query;
  // console.log('route : ', route);
  // console.log('fullPath : ', fullPath);
  // console.log('path : ', path);
  // console.log('$config : ', $config);

  // 1. 인증 체크
  const checkUserUrl = $isUserRouteUrl(path);
  const checkAdminUrl = $isAdminRouteUrl(path);
  console.log('path : ', path)
  console.log('checkUserUrl : ', checkUserUrl)
  console.log('checkAdminUrl : ', checkAdminUrl)

  console.log('checkAuthorizationUrl(path, checkUserUrl, checkAdminUrl) : ', checkAuthorizationUrl(path, checkUserUrl, checkAdminUrl))
  if ( checkUserUrl ) { // 사용자 URL
    console.log("사용자 인증 체크")
    await store.dispatch("users/user/getAuthenticatedUser");
    const userInfo = await store.state.users.user.userInfo;
    console.log('userInfo : ', userInfo)

    if ( !checkAuthorizationUrl(path, checkUserUrl, checkAdminUrl) && (!userInfo || !userInfo.authenticated) ) {
      // return redirect(`${$config/USER_LOGIN_PAGE}?prevPath=${encodeURIComponent(path)}&prevQuery=${encodeURIComponent(JSON.stringify(query))}`)
      // return redirect(`${$config.USER_LOGIN_PAGE}?prevFullUrl=${encodeURIComponent(fullPath)}`)
      return redirect({
        path : `${$config.USER_LOGIN_PAGE}`,
        query : {
          prevFullUrl : `${encodeURIComponent(fullPath)}`
        }
      })
    }
  } else if ( checkAdminUrl ) { // 관리자 URL
    console.log("관리자 인증 체크")
    await store.dispatch("users/adminUser/getAuthenticatedAdminUser");
    const adminUserInfo = await store.state.users.adminUser.adminUserInfo;
    console.log('checkAuthorizationUrl(path) : ', checkAuthorizationUrl(path))
    console.log('adminUserInfo.authenticated_1 : ', adminUserInfo.authenticated)
    if ( !checkAuthorizationUrl(path, checkUserUrl, checkAdminUrl) && (!adminUserInfo || !adminUserInfo.authenticated) ) {
      console.log('adminUserInfo.authenticated_2 : ', adminUserInfo.authenticated)
      // return redirect(`${$config.ADMIN_LOGIN_PAGE}?prevFullUrl=${encodeURIComponent(fullPath)}`)
      return redirect({
        path : `${$config.ADMIN_LOGIN_PAGE}`,
        query : {
          prevFullUrl : `${encodeURIComponent(fullPath)}`
        }
      })
    }
  }
}