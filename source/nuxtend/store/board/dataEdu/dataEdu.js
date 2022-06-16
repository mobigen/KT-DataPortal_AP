export const state = () =>({
  dataEduRes:{
    dataEduList: [],
    dataCardInfo:[],
    totCnt: 0,
  }
});
export const getters = {
  dataEduRes(state){
    return state.dataEduRes;
  },
};
export const mutations = {
  setDataEduList(state, data) {
    state.dataEduRes = data;

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
  }
};
export const actions ={
  async getDataEduList({commit}, param){
    const data = await this.$axios.get(`${this.$config.API_BOARD_PREFIX}/dataEdu/list?eduType=${param.eduType}&searchKeyword=${param.searchKeyword}`);
    commit("setDataEduList", data);
  }
}
