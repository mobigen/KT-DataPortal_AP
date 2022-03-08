import Vue from "vue";
import Vuex from "vuex";
import sample from "./sample/sample";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    sample: sample
  }
});

if (module.hot) {
  module.hot.accept(["./sample/sample"], () => {
    const sample = require("./sample/sample").default;
    store.hotUpdate({
      modules: {
        sample
      }
    });
  });
}

export default store;
