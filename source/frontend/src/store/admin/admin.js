const sample = {
  namespaced: true,

  state: {
    metaList: []
  },
  getters: {
    metaList(state) {
      return state.name;
    }
  },
  mutations: {
    setName(state, data) {
      state.name = data;
    }
  },
  actions: {}
};

export default sample;
