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
      Vue.prototype.$api.get("/api/meta/metaNameList").then((d) => {
        commit("setMetaNameList", d);
      });
    },
    getMetaName({ commit }, rowKey) {
      let d = {};

      if (rowKey === undefined) {
        // const empObj = {};
        commit("setMetaName", d);
        return;
      }

      d = {
        kor_name: "지역",
        eng_name: "region",
        show_order: 3,
        type: 0,
        reference_table: null,
        name_id: rowKey
      };

      commit("setMetaName", d);
    },
    addMetaName({ commit }, obj) {
      if (Object.keys(obj).length === 0) {
        alert("저장할 객체가 없습니다!");
        return;
      }
      alert("add");
      console.log(obj);
    },
    removeMetaName({ commit }, rowKey) {
      alert("remove : " + rowKey);
    },
    editMetaName({ commit }, obj) {
      alert("edit");
      console.log(obj);
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
