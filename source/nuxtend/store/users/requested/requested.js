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

import sampleRequestedData from "./_requested.json";

export const actions = {
  getRequestedData({ commit }) {
    // this.$axios
    //   .get(this.$config.API_ROUTER_PREFIX + "/getRequestedData")
    //   .then((d) => {
    //     // commit("setRequestedData", d);
    //   });

    // sample data load
    commit("setRequestedData", sampleRequestedData);
  }
};
