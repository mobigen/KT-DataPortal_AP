import _searchTagList from "./_searchTagList.json";
import _searchFilterList from "./_searchFilterList.json";
import _searchResultList from "./_searchResultList.json";
import _searchDetailObject from "./_searchDetailObject.json";
import _fileData from "./_fileData.json";
import _dataUseCases from "./_dataUseCases.json";
import _requireObject from "./_requireObject.json";

export const state = () => ({
  _contents: {},
  _detail: {},
  searchKeyword: "",
  searchTagList: {},
  searchFilterList: [],
  selectSearchFilterList: {},
  searchResultList: [],
  searchDetailObject: {},
  fileData: [],
  recommendData: [],
  dataUseCases: {},
  requireObj: {},
  sampleData: {},
  dataQualityScore: {},
  keywordObj: {}
});

export const getters = {
  contents(state) {
    return state._contents;
  },
  detail(state) {
    return state._detail;
  },
  searchKeyword(state) {
    return state.searchKeyword;
  },
  searchTagList(state) {
    return state.searchTagList;
  },
  searchFilterList(state) {
    return state.searchFilterList;
  },
  selectSearchFilterList(state) {
    return state.selectSearchFilterList;
  },
  searchResultList(state) {
    return state.searchResultList;
  },
  searchDetailObject(state) {
    return state.searchDetailObject;
  },
  fileData(state) {
    return state.fileData;
  },
  recommendData(state) {
    return state.recommendData;
  },
  dataUseCases(state) {
    return state.dataUseCases;
  },
  requireObj(state) {
    return state.requireObj;
  },
  sampleData(state) {
    return state.sampleData;
  },
  dataQualityScore(state) {
    return state.dataQualityScore;
  }
};

export const mutations = {
  setContents(state, data) {
    state._contents = data;
  },
  setDetail(state, data) {
    state._detail = data;
  },
  setSearchKeyword(state, data) {
    state.searchKeyword = data;
  },
  setSearchTagList(state, data) {
    state.searchTagList = data;
  },
  setSearchFilterList(state, data) {
    state.searchFilterList = data;

    // selectSearchFilterList setting
    // const setData = JSON.parse(JSON.stringify(data));
    // for (const key in setData) {
    //   setData[key] = [];
    // }
    // state.selectSearchFilterList = setData;
  },
  // list를 덮어씌움
  setSearchFilterListByKey(state, { key, changeList }) {
    state.selectSearchFilterList[key] = changeList;

    state.selectSearchFilterList = JSON.parse(
      JSON.stringify(state.selectSearchFilterList)
    );
  },
  // 값 1개를 덮어씌움 or 삭제함.
  setSearchFilterSingleByKey(state, { key, itemId }) {
    state.selectSearchFilterList[key] = state.selectSearchFilterList[
      key
    ].filter((e) => {
      return e.itemId !== itemId;
    });
    state.selectSearchFilterList[key] = JSON.parse(
      JSON.stringify(state.selectSearchFilterList[key])
    );
  },
  resetSearchFilterList(state) {
    const data = state.selectSearchFilterList;

    for (const key in data) {
      data[key] = [];
    }
  },
  setSearchResultList(state, data) {
    state.searchResultList = data;
  },
  setSearchDetailObject(state, data) {
    state.searchDetailObject = data;
  },
  setFileData(state, data) {
    state.fileData = data;
  },
  setRecommendData(state, data) {
    state.recommendData = data;
  },
  setDataUseCases(state, data) {
    state.dataUseCases = data;
  },
  setRequireObj(state, data) {
    state.requireObj = data;
  },
  setSampleData(state, data) {
    state.sampleData = data;
  },
  getDataQualityScore(state, data) {
    state.dataQualityScore = data;
  },
  setKeywordObj(state, data) {
    state.keywordObj = data;
  }
};

export const actions = {
  // setUrl() {
  //   console.log(process.env);
  //   // SSR or CSR에 따른 URL 변경
  //   url = process.server
  //     ? `${process.env.API_ROUTE_URL}${this.$config.ROUTE_API_META_PREFIX}` // SSR
  //     : `${this.$config.ROUTE_API_META_PREFIX}`; // CSR
  // },
  async getContents({ commit, rootGetters, dispatch, state }, params) {
    let keywordObj = { keyword1: "", keyword2: "", keyword3: "" };
    params.searchKeywordList.forEach((el, index) => {
      keywordObj["keyword" + (index + 1)] = el;
    });

    // 다른페이지로 넘긴 후 다른 keyword로 검색시 페이지값 남아있으면서 에러가 생김
    // 검색시 keywordObj 다를경우 페이지네이션의 페이지값 1로 셋팅
    if (JSON.stringify(keywordObj) !== JSON.stringify(state.keywordObj)) {
      dispatch(
        "module/pagination/setPage",
        {
          key: params.paginationKey,
          page: 1
        },
        { root: true }
      );
    }

    const paging =
      rootGetters["module/pagination/paging"][params.paginationKey];
    // param with pageInfo (start, end...)

    const keywordStr = `&keyword1=${keywordObj.keyword1}&keyword2=${keywordObj.keyword2}&keyword3=${keywordObj.keyword3}`;
    const paramAPI =
      `?perPage=${paging.itemsPerPage}&curPage=${paging.page}` + keywordStr;

    await this.$axios
      .get(this.$config.ROUTE_API_META_PREFIX + "/getBizMetaList" + paramAPI)
      .then((d) => {
        commit("setContents", d);
        commit("setKeywordObj", keywordObj);

        // setTotalPage
        dispatch(
          "module/pagination/setTotalCount",
          {
            key: params.paginationKey,
            totalCount: d.totalcount
          },
          { root: true }
        );
      });
  },
  async getDetail({ commit, dispatch }, rowKey) {
    // dispatch("setUrl");
    // await this.$axios
    //   .get(`${url}/getBizMetaDetail?datasetId=` + rowKey)
    //   .then((d) => {
    //     commit("setDetail", d);
    //   });
    await this.$axios
      .get(
        this.$config.ROUTE_API_META_PREFIX +
          "/getBizMetaDetail?datasetId=" +
          rowKey
      )
      .then((d) => {
        commit("setDetail", d);
      });
  },
  setSearchKeyword({ commit }, keyword) {
    commit("setSearchKeyword", keyword);
  },
  getSearchTagList({ commit }) {
    commit("setSearchTagList", _searchTagList);
  },
  async getSearchFilterList({ commit }, filterObj) {
    // when connect API server, use this code.

    // const filterKeys = Object.keys(filterObj);
    // let result = {};
    // await filterKeys.forEach((key) => {
    //   this.$axios.get(filterObj[key].restApi).then((d) => {
    //     result[key] = d;
    //   });
    // });

    commit("setSearchFilterList", _searchFilterList);
  },
  changeSearchFilterList({ commit }, params) {
    commit("setSearchFilterListByKey", params);
  },
  resetSearchFilterList({ commit }) {
    // state에게 들어올 값의 타입 미리 알려주기위해 {} 입력
    commit("resetSearchFilterList", {});
  },
  changeSearchFilterSingle({ commit }, params) {
    commit("setSearchFilterSingleByKey", params);
  },
  getSearchResultList({ commit }) {
    commit("setSearchResultList", _searchResultList);
  },
  getSearchDetailObject({ commit }, postId) {
    const searchDetailObject = _searchDetailObject;
    // string convert list
    searchDetailObject.dataInfo.body.keyword =
      searchDetailObject.dataInfo.body.keyword.split(",");

    commit("setSearchDetailObject", searchDetailObject);
  },
  getFileData({ commit }, postId) {
    commit("setFileData", _fileData);
  },
  getRecommendData({ commit }, postId) {
    const recommendData = [{}, {}, {}, {}, {}];

    commit("setRecommendData", recommendData);
  },
  getDataUseCases({ commit }, postId) {
    commit("setDataUseCases", _dataUseCases);
  },
  getSampleData({ commit }, rowId) {
    // TODO : TEST CODE
    rowId = 1;
    this.$axios
      .get(
        this.$config.ROUTE_API_META_PREFIX +
          "/getBizMetaDetailSample?datasetId=" +
          rowId
      )
      .then((d) => {
        commit("setSampleData", d);
      });
  },
  getRequireObj({ commit }, { searchCriteria, searchKeyword }) {
    console.log(searchCriteria);
    console.log(searchKeyword);

    commit("setRequireObj", _requireObject);
  },
  getDataQualityScore({ commit }, rowId) {
    console.log(rowId);
    rowId = 1;
    this.$axios
      .get(
        this.$config.ROUTE_API_META_PREFIX +
          "/getBizMetaDetailDq?datasetId=" +
          rowId
      )
      .then((d) => {
        commit("getDataQualityScore", d);
      });
  }
};
