export const state = () => ({
  _contents: []
});

export const getters = {
  contents(state) {
    return state._contents;
  }
};

export const mutations = {
  setContents(state, data) {
    state._contents = data;
  }
};

import sampleContents from "./_contents.json";

export const actions = {
  getContents({ commit, rootGetters, dispatch }, params) {
    /*
    const paging =
      rootGetters["module/pagination/paging"][params.paginationKey];
    // param with pageInfo (start, end...)
    const paramAPI = `?perPage=${paging.itemsPerPage}&curPage=${paging.page}`;
    */

    commit("setContents", sampleContents);

    // fullSearch/backup페이지에 페이지네이션 기능 추가 안해서 생기는 에러때문에 임시로 설정
    if (params === undefined) {
      return;
    }

    dispatch(
      "module/pagination/setTotalCount",
      {
        key: params.paginationKey,
        totalCount: sampleContents.length
      },
      { root: true }
    );
  }
};
