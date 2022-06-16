export const state = () => ({
  qnaListRes: {
    qnaList:[],
    totalCount:0
  }
});
export const getters = {
  qnaListRes(state){return state.qnaListRes;}
};
export const mutations = {
  setQnaListRes(state,data) {
    let today = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0]
    state.qnaListRes = data;
    state.qnaListRes.qnaList.map((qna)=>{
      qna.id = qna.qnaId;
      qna.body = qna.contents;
      qna.date = qna.regDateStr;
      qna.dataLocation = qna.ansContents ? '답변완료' : '대기중'
      qna.dataSource = qna.regDateStr == today ? "new" : ""
    })
    console.log(today)
    console.log(data)
  }
};
export const actions = {
  async getQnaListRes({commit},params){
    const data = await this.$axios.get(`${this.$config.API_BOARD_PREFIX}/qna/list`, {params})
    commit("setQnaListRes",data)
  },
  async createQna(context,params){
    await this.$axios.post(`${this.$config.API_BOARD_PREFIX}/qna`,params)
  },
  async fileUpload(context,files){
    let formData = new FormData()
    Array.from(files).map((file)=>formData.append("files",file))
    await this.$axios.post(`${this.$config.API_BOARD_PREFIX}/sftp`, formData,
      {
        headers: { 'content-type': 'multipart/form-data' },
        params: { serviceType:'BOARD' }
      })
  }
};
