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

// import sampleContents from "./_contents.json";
import d from "./_detail.json";

export const actions = {
  getContents({ commit, rootGetters, dispatch }, params) {
    let keywordObj = { keyword1: "", keyword2: "", keyword3: "" };
    params.searchKeywordList.forEach((el, index) => {
      keywordObj["keyword" + (index + 1)] = el;
    });

    console.log(params.searchKeywordList);

    const paging =
      rootGetters["module/pagination/paging"][params.paginationKey];
    // param with pageInfo (start, end...)

    const keywordStr = `&keyword1=${keywordObj.keyword1}&keyword2=${keywordObj.keyword2}&keyword3=${keywordObj.keyword3}`;
    const paramAPI = `?perPage=${paging.itemsPerPage}&curPage=${paging.page}`;
    // TODO : BACKEND 서버 배포하면 주석 해제후 테스트. + keywordStr;

    console.log(paramAPI);
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
    // console.log(
    //   this.$config.ROUTE_API_META_PREFIX +
    //     "/getBizMetaDetail?datasetId=" +
    //     rowKey
    // );
    await this.$axios
      .get(
        this.$config.ROUTE_API_META_PREFIX +
          "/getBizMetaDetail?datasetId=" +
          rowKey
      )
      .then((d) => {
        commit("setDetail", d);
      });
  },
  setSearchKeyword({ commit }, keyword) {
    commit("setSearchKeyword", keyword);
  }
};
