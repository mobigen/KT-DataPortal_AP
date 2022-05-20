export const state = () => ({
  metaNameList: [],
  useMetaNameList: [],
  metaName: {},
  bizMetaList: [],
  metaNameDetail: {},
  bizMetaDetail: {},
  metaMapList: [],
  bizMetaForm: []
});

export const getters = {
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
  bizMetaForm(state) {
    return state.bizMetaForm;
  },
  metaMapList(state) {
    return state.metaMapList;
  }
};
export const mutations = {
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
  setBizMetaForm(state, data) {
    state.bizMetaForm = data;
  },
  setMetaMapList(state, data) {
    state.metaMapList = data;
  }
};
export const actions = {
  getMetaNameList({ commit, rootGetters, dispatch }, params) {
    const paging =
      rootGetters["module/pagination/paging"][params.paginationKey];
    // param with pageInfo (start, end...)
    const paramAPI = `?perPage=${paging.itemsPerPage}&curPage=${paging.page}`;
    this.$axios
      .get(this.$config.API_META_PREFIX + "/metaNameList" + paramAPI)
      .then((d) => {
        commit("setMetaNameList", d);

        // setTotalPage
        dispatch(
          "module/pagination/setTotalCount",
          {
            key: params.paginationKey,
            totalCount: 8
          },
          { root: true }
        );
      });
  },
  async getUseMetaNameList({ commit }) {
    await this.$axios
      .get(this.$config.API_META_PREFIX + "/useMetaNameList")
      .then((d) => {
        commit("setUseMetaNameList", d);
      });
  },
  getMetaName({ commit }, rowKey) {
    if (rowKey === undefined) {
      const empObj = {};
      commit("setMetaName", empObj);
      return;
    }

    this.$axios
      .get(this.$config.API_META_PREFIX + "/getMetaName", {
        params: { nameId: rowKey }
      })
      .then((d) => {
        commit("setMetaName", d);
      });
  },
  async addMetaName({}, obj) {
    if (Object.keys(obj).length === 0) {
      console.log("저장할 Data 없음");
      return;
    }
    await this.$axios.post(
      this.$config.API_META_PREFIX + "/insertMetaName",
      obj
    );
  },
  removeMetaName({ dispatch }, rowKey) {
    this.$axios
      .delete(this.$config.API_META_PREFIX + "/deleteMetaName", {
        params: { nameId: rowKey }
      })
      .then(() => {
        dispatch("getMetaNameList");
      });
  },
  async editMetaName({}, obj) {
    if (Object.keys(obj).length === 0) {
      console.log("변경된 Data 없음");
      return;
    }

    await this.$axios.put(
      this.$config.API_META_PREFIX + "/updateMetaName",
      obj
    );
  },
  getBizMetaList({ commit }) {
    this.$axios
      .get(this.$config.API_META_PREFIX + "/getBizMetaList")
      .then((d) => {
        d.useRebuildBody = true;

        // header rebuild
        let newHeader = [];
        d.header.forEach((_h) => {
          newHeader.push({ column_name: _h.eng_name });
        });
        d.header = newHeader;

        commit("setBizMetaList", d);
      });
  },
  getMetaNameDetail({ commit }, rowId) {
    this.$axios
      .get(this.$config.API_META_PREFIX + "/getMetaNameDetail?nameId=" + rowId)
      .then((d) => {
        commit("setMetaNameDetail", d);
      });
  },
  async getBizMetaDetail({ commit }, rowId) {
    if (rowId === undefined) {
      const empObj = {};
      commit("setBizMetaDetail", empObj);
      return;
    }
    await this.$axios
      .get(
        this.$config.API_META_PREFIX + "/getBizMetaDetail?datasetId=" + rowId
      )
      .then((d) => {
        d.useRebuildBody = true;
        commit("setBizMetaDetail", d);
      });
  },
  async getBizMetaForm({ commit }) {
    await this.$axios
      .get(this.$config.API_META_PREFIX + "/getBizMetaForm")
      .then((d) => {
        commit("setBizMetaForm", d);
      });
  },
  removeBizMeta({ dispatch }, rowKey) {
    this.$axios
      .delete(this.$config.API_META_PREFIX + "/deleteBizMeta", {
        params: { bizDatasetId: rowKey }
      })
      .then(() => {
        dispatch("getBizMetaList");
      });
  },
  async addBizMeta({}, dataList) {
    if (dataList.length === 0) {
      console.log("저장할 Data 없음");
      return;
    }
    await this.$axios.post(
      this.$config.API_META_PREFIX + "/insertBizMeta",
      dataList
    );
  },
  async editBizMeta({}, { rowKey, dataList }) {
    if (dataList.length === 0) {
      console.log("변경된 Data 없음");
      return;
    }

    await this.$axios.put(this.$config.API_META_PREFIX + "/updateBizMeta", {
      bizDatasetId: rowKey,
      dataList: dataList
    });
  },
  getMetaMapList({ commit }) {
    this.$axios.get(this.$config.API_META_PREFIX + "/metaMapList").then((d) => {
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

    await this.$axios.post(
      this.$config.API_META_PREFIX + "/insertMetaMap",
      dataList
    );
  },

  async viewReload({}) {
    let response = null;
    await this.$axios
      .get(this.$config.API_META_PREFIX + "/setViewTable")
      .then((d) => {
        response = d;
      });

    return response.result === "success";
  }
};
