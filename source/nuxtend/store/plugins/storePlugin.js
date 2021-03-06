export function storePlugin(store) {
  // called after every mutation.
  // The mutation comes in the format of `{ type, payload }`.
  store.subscribe((mutation, state) => {
    // common vuex는 Json 을 표시해줄 필요가 없음.
    if (mutation.type.includes("defaults/common/")) {
      return;
    }

    // json-Viewr용 vuex를 여기서 처리.
    // local, dev 버전에서만 표시함. (실서버에서는 표시하지 않음)
    if (process.env.NODE_ENV !== "prod") {
      const type = mutation.type;
      const apiResponse = mutation.payload;
      store.dispatch("defaults/common/setDevJsonObject", {
        type: type,
        payload: apiResponse
      });
    }
  });
}
