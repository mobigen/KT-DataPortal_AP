export function storePlugin(store) {
  // called when the store is initialized

  // called (before or after) every action.
  // The action comes in the format of `{type, payload}`
  // but, this comes payload undefined.
  store.subscribeAction({
    // before: (action, state) => {
    //   console.log("action before");
    // },
    // after: (action, state) => {
    //   // not working
    //   console.log(action.type);
    //   console.log(action.payload);
    // }
  });

  // called after every mutation.
  // The mutation comes in the format of `{ type, payload }`.
  store.subscribe((mutation, _) => {
    if (
      // useRebuildBody를 가지고 있고, useRebuildBody가 true인 값만 rebuild.
      Object.prototype.hasOwnProperty.call(
        mutation.payload,
        "useRebuildBody"
      ) &&
      mutation.payload.useRebuildBody
    ) {
      console.log("mutation subscribed");

      let obj = {};
      let newBody = [];
      const _header = mutation.payload.header;
      let defaultColumnName = "column_name";
      if (Object.keys(_header[0]).indexOf("column_name") === -1) {
        // column_name이 default가 아닌 경우, kor_name으로 임의처리한다.
        defaultColumnName = "kor_name";
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
        newHeader.push({ column_name: h.kor_name });
      });

      const d = {
        header: newHeader,
        body: newBody
      };

      store.commit(mutation.type, d);
    }
  });
}
