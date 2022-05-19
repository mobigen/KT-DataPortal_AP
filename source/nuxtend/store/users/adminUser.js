export const state = () => ({
  adminUserInfo: { authenticated: false },
})

export const getters = {
  getAdminUserInfo: state => state.adminUserInfo,
}

export const mutations = {
  SET_ADMIN_USER_INFO(state, user) {
    state.adminUserInfo = user || { authenticated: false }
  },
  CLEAR_ADMIN_USER_INFO(state) {
    state.adminUserInfo = { authenticated: false }
  },
}

export const actions = {
  async getAuthenticatedAdminUser ({ commit }) {
    console.log('store admin user getAuthenticatedUser')
    const adminUser = await this.$getAdminUser();
    console.log('adminUser : ', adminUser)
    if ( adminUser && adminUser.authenticated ) {
      commit('SET_ADMIN_USER_INFO', adminUser || { 'authenticated': false })
    } else {
      commit('SET_ADMIN_USER_INFO', { 'authenticated': false })
    }
  },
  clearAdminUserInfo ({ commit }) {
    commit('CLEAR_ADMIN_USER_INFO')
  }

}