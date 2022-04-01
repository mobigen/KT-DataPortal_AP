import Vue from "vue";
import Vuex from "vuex";
import sample from "./sample/sample";
import admin from "./admin/admin";
import app from "./app/app";
import superAdmin from "./superAdmin/superAdmin";
import metaForm from "./superAdmin/metaForm";
import metaName from "./superAdmin/metaName";
import constants from "@/constants/constants";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    constants: constants,
    sample: sample,
    admin: admin,
    app: app,
    superAdmin: superAdmin,
    metaName: metaName,
    metaForm: metaForm
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

  module.hot.accept(["./superAdmin/superAdmin"], () => {
    const dataPortal = require("./superAdmin/superAdmin").default;
    store.hotUpdate({
      modules: {
        dataPortal
      }
    });
  });

  module.hot.accept(["./admin/admin"], () => {
    const dataPortal = require("./admin/admin").default;
    store.hotUpdate({
      modules: {
        dataPortal
      }
    });
  });
}

export default store;
