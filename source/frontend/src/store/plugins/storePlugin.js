export function storePlugin(store) {
  // called when the store is initialized
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

  store.subscribe((mutation, _) => {
    // called after every mutation.
    // The mutation comes in the format of `{ type, payload }`.
    if (
      // useRebuildBody를 가지고 있고, useRebuildBody가 true인 값만 rebuild 한다.
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

      mutation.payload.body.forEach((b) => {
        obj = {
          rowId: b.rowid
        };
        _header.forEach((h, i) => {
          obj[h.kor_name] = b.data[i];
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
