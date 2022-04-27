export function storePlugin(store) {
  // called when the store is initialized

  // called (before or after) every action.
  // The action comes in the format of `{type, payload}`
  // store.subscribeAction({
  //   // before: (action, state) => {},
  //   // after: (action, state) => {}
  // });

  // called after every mutation.
  // The mutation comes in the format of `{ type, payload }`.
  store.subscribe((mutation, state) => {
    // subscribed 한 후에 다시 돌아온 경우, 그대로 return 한다.
    if (mutation.payload.subscribed) {
      return;
    }

    // json-Viewr용 vuex를 여기서 처리.
    // 개발 버전에서만 표시함.
    if (process.env.NODE_ENV === "development") {
      const type = mutation.type;
      const apiResponse = mutation.payload;
      store.dispatch("defaults/common/setDevJsonObject", {
        type: type,
        payload: apiResponse
      });
    }
    mutation.payload.subscribed = true;
    store.commit(mutation.type, mutation.payload);
  });
}
