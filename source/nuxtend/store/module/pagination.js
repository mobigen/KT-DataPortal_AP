export const state = () => ({
  totalCount: 0,
  itemsPerPage: 10,
  visiblePages: 10,
  page: 1
});

export const getters = {
  paging(state) {
    return {
      totalCount: state.totalCount,
      itemsPerPage: state.itemsPerPage,
      visiblePages: state.visiblePages,
      page: state.page
    };
  }
};

export const mutations = {
  setPage(state, params) {
    state[params.key] = params.data;
  }
};

export const actions = {
  setPaging({ commit }, params) {
    commit("setPage", params);
  }
};
