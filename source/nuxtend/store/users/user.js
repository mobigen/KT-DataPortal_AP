export const state = () => ({
  prevFullUrl: null,
  userInfo: { authenticated: false }
});

export const getters = {
  getterPrevFullUrl: (state) => state.prevFullUrl,
  getUserInfo: (state) => state.userInfo
};

export const mutations = {
  SET_PREV_FULL_URL(state, data) {
    state.prevFullUrl = data || null;
  },
  SET_USER_INFO(state, user) {
    state.userInfo = user || { authenticated: false };
  },
  CLEAR_USER_INFO(state) {
    state.userInfo = { authenticated: false };
  }
};

export const actions = {
  async setPrevFullUrl({ commit }, data) {
    console.log("setPrevFullUrl_data : ", data);
    commit("SET_PREV_FULL_URL", data);
  },
  async getAuthenticatedUser({ commit }) {
    console.log("store user getAuthenticatedUser");
    const user = await this.$getAuthUser();
    console.log("user : ", user);
    if (user && user.authenticated) {
      commit("SET_USER_INFO", user || { authenticated: false });
    } else {
      commit("SET_USER_INFO", { authenticated: false });
    }
  },
  clearUserInfo({ commit }) {
    commit("CLEAR_USER_INFO");
  }
};
