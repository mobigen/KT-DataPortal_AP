import Vue from "vue";

const superAdmin = {
  namespaced: true,

  state: {
    metaName: []
  },

  getters: {
    metaName(state) {
      return state.metaName;
    }
  },

  mutations: {
    setMetaName(state, data) {
      console.log("mutation");
      state.metaName = data;
    }
  },

  actions: {
    getMetaNameList({ _, commit }) {
      Vue.prototype.$api.get("/api/meta/metaNameList").then((d) => {
        console.log("actions");
        commit("setMetaName", d);
      });
    }
  }
};

export default superAdmin;
