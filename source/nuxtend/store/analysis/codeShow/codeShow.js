export const state = () => ({
  codeShowRes:{
    codeShowList:[],
    totCnt:0
  },
  codeShowDetailRes:{}
});
export const getters = {
  codeShowRes(state) {
    return state.codeShowRes;
  },
  codeShowDetailRes(state){
    return state.codeShowDetailRes;
  }
};
export const mutations = {
  setCodeShowList(state, data){
    state.codeShowRes = data;
  },
  setCodeShowDetail(state, data){
    state.codeShowDetailRes = data;
  }
};
export const actions = {
  getCodeShowList({commit}, params){
    this.$axios(`${this.$config.API_ANALYSIS_PREFIX}/codeShow/list`, {params})
      .then(response=> {
        commit("setCodeShowList", response)
      })
      .catch(error =>{console.log(error)})
  },
  getCodeShowDetail({commit}, params){
    this.$axios(`${this.$config.API_ANALYSIS_PREFIX}/codeShow/detail`, {params})
      .then(response => {
        commit("setCodeShowDetail", response);
      })
      .catch(error => {console.log(error)})
  }
};
