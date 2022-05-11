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
    const paging = rootGetters["module/pagination/paging"][params.paginationKey];
    const paramAPI = `?perPage=${paging.itemsPerPage}&curPage=${paging.page}`;

    this.$axios.get("/api/meta/metaNameList" + paramAPI).then((d) => {
      // d.header에 rowNo을 추가한다.
      d.header.unshift({ column_name: "rowno" });
      commit("setMetaNameList", d);

      // setTotalPage
      dispatch(
        "module/pagination/setTotalCount",
        {
          key: params.paginationKey,
          totalCount: d.totalCount
        },
        { root: true }
      );
    });
  }
};
