import Vue from "vue";

const bizMeta = {
  namespaced: true,

  state: {
    metaNameList: [],
    metaName: {},
    bizMetaList: [],
    metaNameDetail: {},
    bizMetaDetail: {}
  },

  getters: {
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
    }
  },

  mutations: {
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
    }
  },

  actions: {
    getMetaNameList({ _, commit }) {
      console.log("getMetaNameList");
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
          console.log(d);
          commit("setMetaName", d);
        });
    },
    addMetaName({}, obj) {
      if (Object.keys(obj).length === 0) {
        console.log("저장할 Data 없음");
        return;
      }
      Vue.prototype.$api.post("/api/meta/insertMetaName", obj).then(() => {});
    },
    removeMetaName({ dispatch }, rowKey) {
      Vue.prototype.$api
        .delete("/api/meta/deleteMetaName", { params: { nameId: rowKey } })
        .then((d) => {
          dispatch("getMetaNameList");
        });
    },
    async editMetaName({}, obj) {
      if (Object.keys(obj).length === 0) {
        console.log("변경된 Data 없음");
        return;
      }

      console.log(obj);
      await Vue.prototype.$api
        .put("/api/meta/updateMetaName", obj)
        .then((d) => {});
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
    }
  }
};

export default bizMeta;
