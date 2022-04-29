export const state = () => ({
  pagingObj: {},
  defaultPageObj: {
    totalCount: 0,
    itemsPerPage: 10,
    visiblePages: 10,
    page: 1
  }
});

export const getters = {
  paging(state) {
    return state.pagingObj;
  },
  defaultPageObj(state) {
    return state.defaultPageObj;
  }
};

export const mutations = {
  setNewPaging(state, params) {
    const newDefaultObj = Object.assign(state.defaultPageObj, params.data);
    state.pagingObj[params.key] = newDefaultObj;
  },
  setPage(state, params) {
    console.log(params);
    Object.assign(state[params.key], params.data);

    // Object 변경사항 적용
    state.pagingObj = JSON.parse(JSON.stringify(state.pagingObj));
  }
};

export const actions = {
  setNewPagination({ commit }, params) {
    commit("setNewPaging", params);
  },
  setPaging({ commit }, params) {
    commit("setPage", params);
  }
};
