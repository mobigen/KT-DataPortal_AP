import Vue from "vue";
import Vuex from "vuex";
import sample from "./sample/sample";
import app from "./app/app";
import constants from "@/constants/constants";

import bizMeta from "./stores/bizMeta";

import { storePlugin } from "./plugins/storePlugin";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [storePlugin],
  modules: {
    constants: constants,
    sample: sample,
    app: app,
    bizMeta: bizMeta
  }
});

if (module.hot) {
  module.hot.accept(["./sample/sample"], () => {
    const dataPortal = require("./sample/sample").default;
    store.hotUpdate({
      modules: {
        dataPortal
      }
    });
  });
}

export default store;
