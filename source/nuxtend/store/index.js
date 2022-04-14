import { storePlugin } from "./plugins/storePlugin";

export const plugins = [storePlugin];

// import Vue from "vue";
// import Vuex from "vuex";
// import sample from "./modules/sample";
// import common from "./modules/common";
// import constants from "./modules/constants";
//
// import bizMeta from "./modules/bizMeta";
//
// import { storePlugin } from "./plugins/storePlugin";
//
// Vue.use(Vuex);
//
// const store = () =>
//   new Vuex.Store({
//     plugins: [storePlugin],
//     modules: {
//       constants: constants,
//       common: common,
//       sample: sample,
//       bizMeta: bizMeta
//     }
//   });
//
// // if (module.hot) {
// //   module.hot.accept(["./sample/sample"], () => {
// //     const dataPortal = require("./sample/sample").default;
// //     store.hotUpdate({
// //       modules: {
// //         dataPortal
// //       }
// //     });
// //   });
// // }
//
// // if (module.hot) {
// //   module.hot.accept(['@/store/myModule.js'], () => {
// //     // 변경된 모듈 읽어 들이기
// //     const myModule = require('@/store/myModule.js').default
// //     // 새로운 정의 설정하기
// //     store.hotUpdate({
// //       modules: {
// //         myModule: myModule
// //       }
// //     })
// //   })
// // }
//
// export default store;
