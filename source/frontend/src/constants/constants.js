const constants = {
  namespaced: true,

  state: {
    constants: Object.freeze({
      TITLE: "KT_DATA_PORTAL"
    })
  },
  mutations: {},
  getters: {
    CONSTANTS: (state) => {
      return state.constants;
    }
  },
  actions: {}
};

export default constants;
