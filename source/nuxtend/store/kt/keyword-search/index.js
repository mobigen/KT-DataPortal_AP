export const state = () => ({
  _contents: {},
  _detail: {},
  searchKeyword: ""
});

export const getters = {
  contents(state) {
    return state._contents;
  },
  detail(state) {
    return state._detail;
  },
  searchKeyword(state) {
    return state.searchKeyword;
  }
};

export const mutations = {
  setContents(state, data) {
    state._contents = data;
  },
  setDetail(state, data) {
    state._detail = data;
  },
  setSearchKeyword(state, data) {
    state.searchKeyword = data;
  }
};

export const actions = {
  getContents({ commit, rootGetters, dispatch }, params) {
    let keywordObj = { keyword1: "", keyword2: "", keyword3: "" };
    params.searchKeywordList.forEach((el, index) => {
      keywordObj["keyword" + (index + 1)] = el;
    });

    const paging =
      rootGetters["module/pagination/paging"][params.paginationKey];
    // param with pageInfo (start, end...)

    const keywordStr = `&keyword1=${keywordObj.keyword1}&keyword2=${keywordObj.keyword2}&keyword3=${keywordObj.keyword3}`;
    const paramAPI =
      `?perPage=${paging.itemsPerPage}&curPage=${paging.page}` + keywordStr;

    this.$axios
      .get(this.$config.ROUTE_API_META_PREFIX + "/getBizMetaList" + paramAPI)
      .then((d) => {
        commit("setContents", d);

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
  async getDetail({ commit }, rowKey) {
    await this.$axios
      .get(
        this.$config.ROUTE_API_META_PREFIX +
          "/getBizMetaDetail?datasetId=" +
          rowKey
      )
      .then((d) => {
        console.log(d);
        commit("setDetail", d);
      });
  },
  setSearchKeyword({ commit }, keyword) {
    commit("setSearchKeyword", keyword);
  }
};
