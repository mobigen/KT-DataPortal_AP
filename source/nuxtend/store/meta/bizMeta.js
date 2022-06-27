export const state = () => ({
  metaNameList: [],
  useMetaNameList: [],
  bizMetaList: {},
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
            totalCount: d.totalcount
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
  async addMetaName({}, obj) {
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
      alert("변경된 Data 없음");
      return;
    }

    await this.$axios.post(
      this.$config.API_META_PREFIX + "/updateMetaName",
      obj
    );
  },
  getBizMetaList({ commit }) {
    this.$axios
      .get(this.$config.API_META_PREFIX + "/getBizMetaList")
      .then((d) => {
        /*
         d.useRebuildBody = true;

        // header rebuild
        let newHeader = [];
        d.header.forEach((_h) => {
          newHeader.push({ column_name: _h.ENG_NM });
        });
        d.header = newHeader;
        */

        commit("setBizMetaList", d);
      });
  },
  getMetaNameDetail({ commit }, rowId) {
    if (rowId === undefined) {
      this.$axios
        .get(this.$config.API_META_PREFIX + "/getMetaNameDetail")
        .then((d) => {
          d.body = {
            kor_nm: "",
            eng_nm: "",
            show_odrg: 0,
            nm_id: "",
            type: 0
          };
          commit("setMetaNameDetail", d);
        });
    } else {
      this.$axios
        .get(
          this.$config.API_META_PREFIX + "/getMetaNameDetail?nameId=" + rowId
        )
        .then((d) => {
          commit("setMetaNameDetail", d);
        });
    }
  },
  async getBizMetaDetail({ commit }, rowId) {
    if (rowId === undefined) {
      await this.$axios
        .get(this.$config.API_META_PREFIX + "/getBizMetaDetail")
        .then((d) => {
          // d.useRebuildBody = true;
          commit("setBizMetaDetail", d);
        });
    } else {
      await this.$axios
        .get(
          this.$config.API_META_PREFIX + "/getBizMetaDetail?datasetId=" + rowId
        )
        .then((d) => {
          // d.useRebuildBody = true;
          commit("setBizMetaDetail", d);
        });
    }
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

    await this.$axios.post(this.$config.API_META_PREFIX + "/updateBizMeta", {
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
    list.sort();

    await this.$axios.post(this.$config.API_META_PREFIX + "/insertMetaMap", {
      nm_id_list: list
    });
  }
};
