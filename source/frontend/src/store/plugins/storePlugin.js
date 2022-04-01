export function storePlugin(store) {
  // called when the store is initialized
  store.subscribe((mutation, _) => {
    // called after every mutation.
    // The mutation comes in the format of `{ type, payload }`.

    if (
      // useRebuildBody를 가지고 있고, useRebuildBody가 true인 값만 정제한다.
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
          console.log(h);
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

      console.log(d);
      store.commit(mutation.type, d);
    }
  });
}
