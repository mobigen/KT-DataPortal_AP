import axios from "axios";

let url;

export const state = () => ({
  noticeResMap:{
    noticeList : [],
    totalCount : 0
  }
});

export const getters = {
  noticeResMap(state){return state.noticeResMap;},
}

export const mutations = {
  setNoticeResMap(state, data){
    state.noticeResMap = data;
    state.noticeResMap.noticeList.map((notice) => {
      notice.id = notice.noticeId;
      notice.body = notice.contents;
      notice.date = notice.regDateStr;
    });
    console.log(data);
  }
}

export const actions = {
  setUrl(){ // SSR or CSR에 따른 URL 변경
    url = process.server
      ? `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}${process.env.API_BOARD_PREFIX}`  // SSR
      : `${this.$config.API_BOARD_PREFIX}`  // CSR
  },

  async getNoticeList({commit, dispatch}, params){
    dispatch("setUrl")
    const res = await axios.get(`${url}/notice/list`, {params});
    commit("setNoticeResMap", res.data.data);
  },

  async getNotice({commit, dispatch}, params){
    dispatch("setUrl")
    const res = await axios.get(`${url}/notice`, {params})
    commit("setNotice", res.data.data)
  }
}
