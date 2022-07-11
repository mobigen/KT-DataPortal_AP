export const state = () => ({
  requestedData: {}
});

export const getters = {
  requestedData: (state) => state.requestedData
};

export const mutations = {
  setRequestedData(state, data) {
    state.requestedData = data;
  }
};

// import sampleRequestedData from "./_requested.json";

export const actions = {
  getRequestedData({ commit, rootGetters, dispatch }, requestParams) {
    // TODO : 요청데이터 목록 조회시, 조회 filter 처리 안됨
    console.log(requestParams.searchParam);

    /*
     TODO: pagination 처리
     const paging =
      rootGetters["module/pagination/paging"][requestParams.paginationKey];
    const paramAPI = `?perPage=${paging.itemsPerPage}&curPage=${paging.page}`;*/

    this.$axios
      .get(
        this.$config.ROUTE_API_META_PREFIX +
          "/getUseBoardDataList" +
          "?perPage=100&curPage=1"
      )
      .then((d) => {
        commit("setRequestedData", d);

        // setTotalPage
        /*dispatch(
          "module/pagination/setTotalCount",
          {
            key: requestParams.paginationKey,
            totalCount: d.totalcount
          },
          { root: true }
        );*/
      });

    // console.log(requestParam);
    // // sample data load
    // commit("setRequestedData", sampleRequestedData);
  }
};
