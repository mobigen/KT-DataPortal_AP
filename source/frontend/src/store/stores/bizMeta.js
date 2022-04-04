import Vue from "vue";

const bizMeta = {
  namespaced: true,

  state: {
    metaNameList: [],
    metaName: {},
    bizMetaList: []
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
    }
  },

  actions: {
    getMetaNameList({ _, commit }) {
      Vue.prototype.$api.get("/api/meta/metaNameList").then((d) => {
        commit("setMetaNameList", d);
      });
    },
    getMetaName({ commit }, id) {
      console.log("get : " + id);

      const d = {
        kor_name: "지역",
        eng_name: "region",
        show_order: 3,
        type: 0,
        reference_table: null,
        name_id: id
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
    removeMetaName({ commit }, id) {
      alert("remove : " + id);
    },
    editMetaName({ commit }, obj) {
      alert("edit");
      console.log(obj);
    },
    getBizMetaList({ _, commit }) {
      Vue.prototype.$api.get("/api/meta/getBizMetaList").then((d) => {
        commit("setBizMetaList", d);
      });
    }
  }
};

export default bizMeta;
