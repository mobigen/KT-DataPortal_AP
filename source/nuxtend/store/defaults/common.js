export const state = () => ({
  devJsonObject: {}
});

export const getters = {
  devJsonObject(state) {
    return state.devJsonObject;
  }
};

export const mutations = {
  setDevJsonObject(state, { type, payload }) {
    // JSON Object는 state에서 변경된것을 catch 하지 못하기 때문에 deep clone 해서 변경됨을 알려준다.
    const oldObj = state.devJsonObject;
    oldObj[type] = payload;
    state.devJsonObject = JSON.parse(JSON.stringify(oldObj));
  },
  setDevJsonReset(state) {
    state.devJsonObject = {};
  },
  setDevJsonObjByKeyValue(state, { key, value }) {
    state.devJsonObject[key] = value;
  }
};

export const actions = {
  setDevJsonObject({ commit }, param) {
    // mutation subscribe 를 타지 않기 위한 boolean 값
    param.subscribed = true;
    commit("setDevJsonObject", param);
  },
  setDevJsonReset({ commit }) {
    // mutation subscribe 를 타지 않기 위한 boolean 값
    commit("setDevJsonReset", {
      subscribed: true
    });
  },
  setDevJsonObjByKeyValue({ commit }, param) {
    commit("setDevJsonObjByKeyValue", param);
  }
};

// const common = {
//   namespaced: true,
//   state: {
//     devJsonObject: {}
//   },
//   getters: {
//     devJsonObject(state) {
//       return state.devJsonObject;
//     }
//   },
//   mutations: {
//     setDevJsonObject(state, { type, payload }) {
//       // JSON Object는 state에서 변경된것을 catch 하지 못하기 때문에 deep clone 해서 변경됨을 알려준다.
//       const oldObj = state.devJsonObject;
//       oldObj[type] = payload;
//       state.devJsonObject = JSON.parse(JSON.stringify(oldObj));
//     },
//     setDevJsonReset(state) {
//       state.devJsonObject = {};
//     }
//   },
//   actions: {
//     setDevJsonObject({ commit }, param) {
//       // mutation subscribe 를 타지 않기 위한 boolean 값
//       param.subscribed = true;
//       commit("setDevJsonObject", param);
//     },
//     setDevJsonReset({ commit }) {
//       // mutation subscribe 를 타지 않기 위한 boolean 값
//       commit("setDevJsonReset", {
//         subscribed: true
//       });
//     }
//   }
// };
//
// export default common;
