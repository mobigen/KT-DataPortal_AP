import Vue from "vue";

const metaName = {
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
      state.metaName = data;
    }
  },

  actions: {
    getMetaNameList({ _, commit }) {
      Vue.prototype.$api.get("/api/meta/metaNameList").then((d) => {
        commit("setMetaName", d);
      });
    },
    getMetaName({ commit }, id) {
      alert(id);
    },
    addMetaName({ commit }, Object) {
      alert(Object);
    },
    removeMetaName({ commit }, id) {
      alert(id);
    }
  }
};

export default metaName;
