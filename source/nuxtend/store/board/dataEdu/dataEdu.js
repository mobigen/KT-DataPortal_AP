export const state = () =>({
  dataEduRes:{
    dataEduList: [],
    dataCardInfo:[],
    totCnt: 0,
  },
  dataEduDetailRes: {}
});
export const getters = {
  dataEduRes(state){
    return state.dataEduRes;
  },
  dataEduDetailRes(state){
    return state.dataEduDetailRes;
  }
};
export const mutations = {
  setDataEduList(state, data) {
    state.dataEduRes = data;
    console.log(data);
    const tempData = new Array();

    state.dataEduRes.dataEduList.forEach(element=> {
      const temp = new Object();
      temp.id = element['eduId'];
      temp.category = element['eduType'];
      temp.dataLocation = '';
      temp.fileType = [];
      temp.title = element['eduNm'];
      temp.body = element['eduInfo'];
      temp.date = element['eduRegDate'];
      temp.download = 0;
      temp.hit = element['searchCnt'];
      tempData.push(temp);
    });
      state.dataEduRes.dataCardInfo = tempData;

      console.log(state.dataEduRes.dataCardInfo);
  },
  setDataEduDetail(state, data) {
    state.dataEduDetailRes = data;
  }
};
export const actions ={
  async getDataEduList({commit}, params){
    console.log(params)
    const data = await this.$axios(`${this.$config.API_BOARD_PREFIX}/dataEdu/list`, {params});
    console.log(data)
    commit("setDataEduList", data);
  },
  getDataEduDetail({commit}, params){
    this.$axios(`${this.$config.API_BOARD_PREFIX}/dataEdu/detail`,{params})
      .then(response =>{
        console.log(response)
        commit("setDataEduDetail", response)
      })
      .catch(error =>{console.log(error)});
  },
}
