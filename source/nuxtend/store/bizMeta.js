import Vue from "vue";
// import Vuex from "vuex";

export const state = () => ({
  metaNameList: [],
  metaName: {},
  bizMetaList: [],
  metaNameDetail: {},
  bizMetaDetail: {}
});

export const getters = {
  metaNameList(state) {
    return state.metaNameList;
  },
  metaName(state) {
    return state.metaName;
  },
  bizMetaList(state) {
    return state.bizMetaList;
  },
  metaNameDetail(state) {
    return state.metaNameDetail;
  },
  bizMetaDetail(state) {
    return state.bizMetaDetail;
  },
  bizMetaForm(state) {
    return state.bizMetaForm;
  }
};
export const mutations = {
  setMetaNameList(state, data) {
    state.metaNameList = data;
  },
  setMetaName(state, data) {
    state.metaName = data;
  },
  setBizMetaList(state, data) {
    state.bizMetaList = data;
  },
  setMetaNameDetail(state, data) {
    state.metaNameDetail = data;
  },
  setBizMetaDetail(state, data) {
    state.bizMetaDetail = data;
  },
  setBizMetaForm(state, data) {
    state.bizMetaForm = data;
  }
};
export const actions = {
  getMetaNameList({ _, commit }) {
    Vue.prototype.$api.get("/api/meta/metaNameList").then((d) => {
      commit("setMetaNameList", d);
    });
  },
  getMetaName({ commit }, rowKey) {
    if (rowKey === undefined) {
      const empObj = {};
      commit("setMetaName", empObj);
      return;
    }

    Vue.prototype.$api
      .get("/api/meta/getMetaName", { params: { nameId: rowKey } })
      .then((d) => {
        commit("setMetaName", d);
      });
  },
  async addMetaName({}, obj) {
    if (Object.keys(obj).length === 0) {
      console.log("저장할 Data 없음");
      return;
    }
    await Vue.prototype.$api.post("/api/meta/insertMetaName", obj);
  },
  removeMetaName({ dispatch }, rowKey) {
    Vue.prototype.$api
      .delete("/api/meta/deleteMetaName", { params: { nameId: rowKey } })
      .then(() => {
        dispatch("getMetaNameList");
      });
  },
  async editMetaName({}, obj) {
    if (Object.keys(obj).length === 0) {
      console.log("변경된 Data 없음");
      return;
    }

    await Vue.prototype.$api.put("/api/meta/updateMetaName", obj);
  },
  getBizMetaList({ commit }) {
    Vue.prototype.$api.get("/api/meta/getBizMetaList").then((d) => {
      commit("setBizMetaList", d);
    });
  },
  getMetaNameDetail({ commit }, rowId) {
    Vue.prototype.$api
      .get("/api/meta/getMetaNameDetail?nameId=" + rowId)
      .then((d) => {
        commit("setMetaNameDetail", d);
      });
  },
  getBizMetaDetail({ commit }, rowId) {
    Vue.prototype.$api
      .get("/api/meta/getBizMetaDetail?datasetId=" + rowId)
      .then((d) => {
        commit("setBizMetaDetail", d);
      });
  },
  getBizMetaForm({ commit }) {
    Vue.prototype.$api.get("/api/meta/getBizMetaForm").then((d) => {
      commit("setBizMetaForm", d);
    });
  },
  removeBizMeta({ commit }, rowKey) {
    Vue.prototype.$api.get("/api/meta/removeBizMeta", {
      params: { nameId: rowKey }
    });
  }
};