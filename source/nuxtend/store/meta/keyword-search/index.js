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
