export const state = () => ({
  emailAthn: {
    email: null,
    athnNo: null,
    isEmailAthn: false
  },
  socialUser: {
    socialType: null,
    id: null,
    name: null,
    email: null
  },
  memberRegisterInfo: {
    userType: null,
    isAgree: false,
    isPrivacyTerms: false,
    isServiceTerms: false,
    isPublicData: false
  }
});

export const getters = {
  getEmailAthn: (state) => state.emailAthn,
  getSocialUser: (state) => state.socialUser,
  getMemberRegisterInfo: (state) => state.memberRegisterInfo
};

export const mutations = {
  SET_EMAIL_ATHN(state, data) {
    state.emailAthn = data;
  },
  CLEAR_EMAIL_ATHN(state) {
    state.emailAthn = null;
  },
  SET_SOCIAL_USER(state, data) {
    state.socialUser = data;
  },
  CLEAR_SOCIAL_USER(state) {
    state.socialUser = null;
  },
  SET_MEMBER_REGISTER_INFO(state, data) {
    state.memberRegisterInfo = data;
  },
  CLEAR_MEMBER_REGISTER_INFO(state) {
    state.memberRegisterInfo = null;
  }
};

export const actions = {
  async setEmailAthn({ commit }, data) {
    commit("SET_EMAIL_ATHN", data);
  },
  async clearEmailAthn({ commit }) {
    commit("CLEAR_EMAIL_ATHN");
  },
  async setSocialUser({ commit }, data) {
    commit("SET_SOCIAL_USER", data);
  },
  async clearSocialUser({ commit }) {
    commit("CLEAR_SOCIAL_USER");
  },
  async setMemberRegisterInfo({ commit }, data) {
    commit("SET_MEMBER_REGISTER_INFO", data);
  },
  async clearMemberRegisterInfo({ commit }) {
    commit("CLEAR_MEMBER_REGISTER_INFO");
  }
};
