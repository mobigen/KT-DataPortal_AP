import _ from "lodash";

export const checkAuthorizationUrl = (path, checkUserUrl) => {
  const includeUserUrls = ["/portal/ui/users/member"];
  const includeAdminUrls = ["/mgnt/ui/users/member"];

  let idx = -1;

  if (checkUserUrl) {
    idx = _.findIndex(includeUserUrls, function (item) {
      return item === path;
    });
  } else {
    idx = _.findIndex(includeAdminUrls, function (item) {
      return item === path;
    });
  }
  // console.log('checkUserUrl : ', checkUserUrl)
  // console.log('idx : ', idx)
  if (idx > -1) return false;
  else return true;
};

export default async function ({
  $isUserRouteUrl,
  $isAdminRouteUrl,
  $config,
  route,
  store,
  error,
  redirect
}) {
  //console.log("인증 route middleware 체크");
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

  if (checkUserUrl) {
    // 사용자 URL
    await store.dispatch("users/user/getAuthenticatedUser");
    const userInfo = await store.state.users.user.userInfo;
    if (
      !checkAuthorizationUrl(path, checkUserUrl) &&
      (!userInfo || !userInfo.authenticated)
    ) {
      // return redirect(`${$config/USER_LOGIN_PAGE}?prevPath=${encodeURIComponent(path)}&prevQuery=${encodeURIComponent(JSON.stringify(query))}`)
      // return redirect(`${$config.USER_LOGIN_PAGE}?prevFullUrl=${encodeURIComponent(fullPath)}`)
      return redirect({
        path: `${$config.USER_LOGIN_PAGE}`,
        query: {
          prevFullUrl: `${encodeURIComponent(fullPath)}`
        }
      });
    }
  }
}
