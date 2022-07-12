import axios from 'axios'

let url;

export const state = () => ({
  detailParams:{},
  hasDetailParams: false,
  qnaListRes: {
    qnaList:[],
    totalCount:0
  },
  qna:{
    ansYn: false,
    qnaTitle:{
      header:[{column_name: "문의제목"}],
      body:{}
    },
    qnaInfo: {
      header: [
        {column_name: "문의유형"},
        {column_name: "작성자"},
        {column_name: "작성일"},
        {column_name: "상태"}
      ],
      body: {}
    },
    qnaContents:{
      header:[{column_name: "문의내용"}],
      body: {}
    },
    answerInfo:{
      header:[{column_name: "답변"}],
      body: {}
    },
    answerContents:{
      header:[{column_name: "답변내용"}],
      body: {}
    },
  },
  fileList:[]
});
export const getters = {
  detailParams(state){return state.detailParams;},
  hasDetailParams(state){return state.hasDetailParams},
  qnaListRes(state){return state.qnaListRes;},
  qna(state){return state.qna},
  fileList(state){return state.fileList}
};
export const mutations = {
  setDetailParams(state,data){state.detailParams = data},
  setHasDetailParams(state,data){state.hasDetailParams = data},
  setQnaListRes(state, data) {
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
  },
  setQna(state, data){
    state.qna.qnaTitle.body = {문의제목:data.title}
    state.qna.qnaInfo.body= {
      qnaId: data.qnaId,
      userId: data.regUser,
      userEmail: data.userEmail,
      emailAnsYn: data.emailAnsYn,
      openYn: data.openYn,
      password: data.password,
      문의유형: data.category,
      작성자: data.userName,
      작성일: data.regDateStr,
      상태: data.ansContents == null ? '대기중': '답변완료'
    }
    state.qna.qnaContents.body={문의내용: data.contents}
    state.qna.answerInfo.body={답변:data.ansDateStr}
    state.qna.answerContents.body={답변내용:data.ansContents}
    if(data.ansContents!=null){
      state.qna.ansYn = true
    }else{
      state.qna.ansYn = false
    }
  },
  setFileList(state,data){state.fileList = data}
};
export const actions = {
  setUrl(){ // SSR or CSR에 따른 URL 변경
    url = process.server
      ? `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}${process.env.API_BOARD_PREFIX}`  // SSR
      : `${this.$config.ROUTE_API_BOARD_PREFIX}`  // CSR
  },
  setDetailParams({commit},params){commit("setDetailParams",params)},
  setHasDetailParams({commit},params){commit("setHasDetailParams",params)},
  /**
   * 문의하기
   * */
  async getQnaListRes({commit,dispatch},params){
    dispatch("setUrl")
    const res = await axios.get(`${url}/qna/list`, {params})
    commit("setQnaListRes",res.data.data)
  },
  /**
   * 문의하기 상세
   * */
  async getQna({commit,dispatch},params){
    dispatch("setUrl")
    const res = await axios.get(`${url}/qna`, {params})
    let getUserInfoURL = null;
    if(process.server){getUserInfoURL = `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}${process.env.API_USERS_PREFIX}/user/info`}
    if(process.client){getUserInfoURL = `${this.$config.ROUTE_API_USERS_PREFIX}/user/info`}
    console.log(getUserInfoURL)
    const userInfo = await axios.get(`${getUserInfoURL}`,{params:{userId:res.data.data.regUser}})
    res.data.data.userName=userInfo.data.data.userNm
    res.data.data.userEmail=userInfo.data.data.email
    commit("setQna",res.data.data)
  },
  async getFileList({commit,dispatch},params){
    dispatch("setUrl")
    const res = await axios.get(`${url}/file/list`,{params})
    commit("setFileList",res.data.data)
  },
  /**
   * 문의하기 등록
   * */
  async createQna({dispatch},data){
    dispatch("setUrl")
    const res = await axios.post(`${url}/qna`,data)
    return res.data.data;
  },
  async fileUpload(context,params){
    let formData = new FormData()
    params.files.map((file)=>formData.append("files",file))
    delete params.files
    await axios.post(`${url}/file/upload`, formData, {params, headers: {'content-type': 'multipart/form-data'}})
  },
  /**
   * 문의하기 수정
   * */
  async modifyQna({dispatch},data){
    dispatch("setUrl")
    const res = await axios.post(`${url}/qna/modify`,data)
    return res.data.data;
  },
  async deleteFiles({dispatch},data){
    dispatch("setUrl");
    await axios.post(`${url}/file/delete`,data)
  },
  /**
   * 문의하기 삭제
   * */
  async deleteQna({dispatch},data){
    dispatch("setUrl")
    await axios.post(`${url}/qna/delete`,data)
  }
};
