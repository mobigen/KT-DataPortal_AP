export const state = () => ({
  userInfo: { authenticated: false },
})

export const getters = {
  getUserInfo: state => state.userInfo,
}

export const mutations = {
  SET_USER_INFO(state, user) {
    state.userInfo = user || { authenticated: false }
  },
  CLEAR_USER_INFO(state) {
    state.userInfo = { authenticated: false }
  },
}

export const actions = {
  async getAuthenticatedUser ({ commit }) {
    console.log('store user getAuthenticatedUser')
    const user = await this.$getUser();
    console.log('user : ', user)
    if ( user && user.authenticated ) {
      commit('SET_USER_INFO', user || { 'authenticated': false })
    } else {
      commit('SET_USER_INFO', { 'authenticated': false })
    }
  },
  clearUserInfo ({ commit }) {
    commit('CLEAR_USER_INFO')
  }

}