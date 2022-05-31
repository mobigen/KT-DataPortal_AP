export const state = () => ({
  metaNameList: []
});

export const getters = {
  metaNameList(state) {
    return state.metaNameList;
  }
};
export const mutations = {
  setMetaNameList(state, data) {
    state.metaNameList = data;
  }
};
export const actions = {
  getMetaNameList({ commit, rootGetters, dispatch }, params) {
    const paging =
      rootGetters["module/pagination/paging"][params.paginationKey];
    const paramAPI = `?perPage=${paging.itemsPerPage}&curPage=${paging.page}`;

    this.$axios.get(this.$config.API_META_PREFIX + "/metaNameList" + paramAPI).then((response) => {
      // backend-api에서 rowno를 조회하는데, 이 api에서는 response.header에 rowno가 들어있기 않기 때문에
      // javascript단에서 수동으로 값을 넣어준다.
      response.header.unshift({ column_name: "rowno" });
      commit("setMetaNameList", response);

      // paging에 totalCount 값을 넣어준다.
      // 지금 사용하고 있는 api에는 totalCount 값 부분이 구현되어 있지 않아서 임의로 값을 넣어줌.
      dispatch(
        "module/pagination/setTotalCount",
        {
          key: params.paginationKey,
          totalCount: 14
          // totalCount: response.totalCount
        },
        { root: true }
      );
    });
  }
};
