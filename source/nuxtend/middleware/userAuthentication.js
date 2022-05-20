// 인증

export const includeAuthUrl = (url) => {
  const includeUrls = ["/user/users/member"]

  // const idx = _.findIndex(includeUrls, function (item) {
  //   return item === url
  // })
  let idx = -1;
  if ( url === '/user/users/member' ) {
    idx = 0;
  }

  if (idx > -1) return true
  else return false
}

export default async function ({ $getAuthUser, route, error, redirect }) {
  console.log('사용자 인증 route middleware 체크');
  const path = route.path;
  const query = route.query;
  const incAuth = includeAuthUrl(path)
  const user = await $getAuthUser();
  console.log('path : ', path)
  console.log('query : ', query)
  console.log('JSON.stringify(query) : ', JSON.stringify(query))
  console.log('JSON.stringify(query) : ', encodeURIComponent(JSON.stringify(query)))
  console.log('user : ', user)
  console.log('user.userId : ', user.userId)

  if ( incAuth && (!user || !user.userId) ) {
    console.log("You are not login")
    return redirect(`/user/users/user?prevPath=${encodeURIComponent(path)}&prevQuery=${encodeURIComponent(JSON.stringify(query))}`)
  }

}