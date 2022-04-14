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
      store.dispatch("common/setDevJsonObject", {
        type: type,
        payload: apiResponse
      });
    }

    if (
      /**
       * RebuildBody Use Only GRID(LIST)
       * useRebuildBody를 가지고 있고, useRebuildBody가 true인 값만 rebuild.
       */
      Object.prototype.hasOwnProperty.call(
        mutation.payload,
        "useRebuildBody"
      ) &&
      mutation.payload.useRebuildBody
    ) {
      // console.log("mutation subscribed");

      let obj = {};
      let newBody = [];
      const _header = mutation.payload.header;
      let defaultColumnName = "column_name";
      if (Object.keys(_header[0]).indexOf("column_name") === -1) {
        // column_name이 default가 아닌 경우, kor_name으로 임의처리한다.
        defaultColumnName = state.constants.constants.DEFAULT_NAME_COLUMN;
      }

      mutation.payload.body.forEach((b) => {
        obj = {
          rowId: b.rowid
        };
        _header.forEach((h, i) => {
          obj[h[defaultColumnName]] = b.data[i];
        });
        newBody.push(obj);
      });

      let newHeader = [];

      mutation.payload.header.forEach((h) => {
        newHeader.push({ column_name: h[defaultColumnName] });
      });

      const d = {
        header: newHeader,
        body: newBody,
        subscribed: true
      };

      store.commit(mutation.type, d);
    } else {
      mutation.payload.subscribed = true;
      store.commit(mutation.type, mutation.payload);
    }
  });
}
