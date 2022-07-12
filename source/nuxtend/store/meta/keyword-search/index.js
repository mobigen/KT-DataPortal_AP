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

import sampleContents from "./_contents.json";
import sampleDetail from "./_detail.json";

export const actions = {
  getContents({ commit, rootGetters, dispatch }, params) {
    /*
    const paging =
      rootGetters["module/pagination/paging"][params.paginationKey];
    // param with pageInfo (start, end...)
    const paramAPI = `?perPage=${paging.itemsPerPage}&curPage=${paging.page}`;
    */
    commit("setContents", sampleContents);

    console.log("검색어 LIST: " + params.searchKeywordList);

    // fullSearch/backup페이지에 페이지네이션 기능 추가 안해서 생기는 에러때문에 임시로 설정
    if (params === undefined) {
      return;
    }

    dispatch(
      "module/pagination/setTotalCount",
      {
        key: params.paginationKey,
        totalCount: sampleContents.totalcount
      },
      { root: true }
    );
  },
  getDetail({ commit }, rowKey) {
    console.log(rowKey);

    commit("setDetail", sampleDetail);
  },
  setSearchKeyword({ commit }, keyword) {
    commit("setSearchKeyword", keyword);
  }
};
