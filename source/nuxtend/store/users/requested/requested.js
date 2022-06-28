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
  getRequestedData({ commit }, requestParam) {
    // TODO : 요청데이터 목록 조회시, 조회 filter 처리 안됨
    console.log(requestParam);
    this.$axios
      .get(this.$config.API_META_PREFIX + "/getUseBoardDataList")
      .then((d) => {
        commit("setRequestedData", d);
      });

    // console.log(requestParam);
    // // sample data load
    // commit("setRequestedData", sampleRequestedData);
  }
};
