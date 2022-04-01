import Vue from "vue";

const metaForm = {
  namespaced: true,

  state: {
    bizMetaList: []
  },

  getters: {
    bizMetaList(state) {
      return state.bizMetaList;
    }
  },

  mutations: {
    setBizMetaList(state, data) {
      state.bizMetaList = data;
    }
  },

  actions: {
    getBizMetaList({ _, commit }) {
      Vue.prototype.$api.get("/api/meta/getBizMetaList").then((d) => {
        commit("setBizMetaList", d);
      });
    }
  }
};
export default metaForm;
