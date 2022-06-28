export const state = () => ({
  faqListRes:{
    faqList:[],
    totalCount:0
  }
});
export const getters = {
  faqListRes(state){return state.faqListRes;},
};
export const mutations = {
  setFaqListRes(state, data) {
    state.faqListRes= data;
    state.faqListRes.faqList.map((faq)=>{
      faq.id = faq.faqId;
      faq.body = faq.contents;
      faq.date = faq.regDateStr;
    })
    console.log(data)
  }
};
export const actions = {
  async getFaqListRes({commit},params){
    const data = await this.$axios.get(`${this.$config.ROUTE_API_BOARD_PREFIX}/faq/list`, {params})
    console.log("data",data)
    commit("setFaqListRes", data)
  }
};
