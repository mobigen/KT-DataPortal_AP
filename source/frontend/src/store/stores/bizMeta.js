import Vue from "vue";

const bizMeta = {
  namespaced: true,

  state: {
    metaNameList: [],
    useMetaNameList: [],
    metaName: {},
    bizMetaList: [],
    metaNameDetail: {},
    bizMetaDetail: {},
    metaMapList: []
  },

  getters: {
    metaNameList(state) {
      return state.metaNameList;
    },
    useMetaNameList(state) {
      return state.useMetaNameList;
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
    metaMapList(state) {
      return state.metaMapList;
    },
    bizMetaForm(state) {
      return state.bizMetaForm;
    }
  },

  mutations: {
    setMetaNameList(state, data) {
      state.metaNameList = data;
    },
    setUseMetaNameList(state, data) {
      state.useMetaNameList = data;
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
    setMetaMapList(state, data) {
      state.metaMapList = data;
    },
    setBizMetaForm(state, data) {
      state.bizMetaForm = data;
    }
  },

  actions: {
    getMetaNameList({ _, commit }) {
      Vue.prototype.$api.get("/api/meta/metaNameList").then((d) => {
        commit("setMetaNameList", d);
      });
    },
    getUseMetaNameList({ commit }) {
      Vue.prototype.$api.get("/api/meta/useMetaNameList").then((d) => {
        commit("setUseMetaNameList", d);
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
    addMetaName({}, obj) {
      if (Object.keys(obj).length === 0) {
        console.log("저장할 Data 없음");
        return;
      }
      Vue.prototype.$api.post("/api/meta/insertMetaName", obj);
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
    },
    getMetaMapList({ commit }) {
      Vue.prototype.$api.get("/api/meta/metaMapList").then((d) => {
        commit("setMetaMapList", d);
      });
    },
    async addMetaMap({}, list) {
      let dataList = [];

      list.sort();
      list.forEach((data, i) => {
        let obj = {};
        obj.itemId = i + 1;
        obj.nameId = data;
        dataList.push(obj);
      });

      await Vue.prototype.$api.post("/api/meta/insertMetaMap", dataList);
    }
  }
};

export default bizMeta;
