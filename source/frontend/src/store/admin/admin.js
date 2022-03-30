const sample = {
  namespaced: true,

  state: {
    name: ""
  },
  getters: {
    name(state) {
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
