export const state = () => ({
  searchTagList: {},
  tabMenuList: [],
  searchFilterList: [],
  selectSearchFilterList: {},
  searchResultList: []
});

export const getters = {
  searchTagList(state) {
    return state.searchTagList;
  },
  tabMenuList(state) {
    return state.tabMenuList;
  },
  searchFilterList(state) {
    return state.searchFilterList;
  },
  selectSearchFilterList(state) {
    return state.selectSearchFilterList;
  },
  searchResultList(state) {
    return state.searchResultList;
  }
};

export const mutations = {
  setSearchTagList(state, data) {
    state.searchTagList = data;
  },
  setTabMenuList(state, data) {
    state.tabMenuList = data;
  },
  setSearchFilterList(state, data) {
    state.searchFilterList = data;

    // selectSearchFilterList setting
    const setData = JSON.parse(JSON.stringify(data));
    for (const key in setData) {
      setData[key]["dataList"] = [];
    }
    state.selectSearchFilterList = setData;
  },
  setSearchFilterListByKey(state, params) {
    state.selectSearchFilterList[params.key]["dataList"] = params.changeList;
  },
  resetSearchFilterList(state) {
    const data = state.selectSearchFilterList;

    for (const key in data) {
      data[key]["dataList"] = [];
    }
  },
  setSearchResultList(state, data) {
    state.searchResultList = data;
  }
};

export const actions = {
  getSearchTagList({ commit }) {
    const result = [
      { itemId: 1, itemName: "tag01" },
      { itemId: 2, itemName: "tag02" },
      { itemId: 3, itemName: "tag03" },
      { itemId: 4, itemName: "tag04" },
      { itemId: 5, itemName: "tag05" }
    ];

    commit("setSearchTagList", result);
  },
  getTabMenuList({ commit }) {
    const result = [
      { menuName: "전체", data: {}, numberOfPosts: 126 },
      { menuName: "내부데이터", data: {}, numberOfPosts: 777 },
      { menuName: "CKAN", data: {}, numberOfPosts: 99 },
      { menuName: "분원데이터", data: {}, numberOfPosts: 456 }
    ];

    commit("setTabMenuList", result);
  },
  getSearchFilterList({ commit }) {
    const category = {
      label: "카테고리",
      dataList: [
        { itemId: 1, itemName: "자동차부품" },
        { itemId: 2, itemName: "자동차제조" },
        { itemId: 3, itemName: "자동차정비" },
        { itemId: 4, itemName: "화물운송" },
        { itemId: 5, itemName: "관제사고" },
        { itemId: 6, itemName: "미래차산업" }
      ]
    };
    const provider = {
      label: "제공기관",
      dataList: [
        { itemId: 7, itemName: "도로교통공단" },
        { itemId: 8, itemName: "한국지질자원연구원" },
        { itemId: 9, itemName: "한국과학기술정보연구원" },
        { itemId: 10, itemName: "국토교통부" },
        { itemId: 11, itemName: "한국지질자원연구원" },
        { itemId: 12, itemName: "도로교통공단" },
        { itemId: 13, itemName: "한국지질자원연구원" },
        { itemId: 14, itemName: "한국과학기술정보연구원" },
        { itemId: 15, itemName: "도로교통공단" },
        { itemId: 16, itemName: "한국지질자원연구원" }
      ]
    };

    const dataType = {
      label: "데이터 타입",
      dataList: [
        { itemId: 17, itemName: "데이터셋(파일)" },
        { itemId: 18, itemName: "데이터 서비스" }
      ]
    };

    const treeView = {
      label: "트리뷰",
      dataList: []
    };

    const result = { category, provider, dataType, treeView };

    commit("setSearchFilterList", result);
  },
  changeSearchFilterList({ commit }, { key, changeList }) {
    commit("setSearchFilterListByKey", { key, changeList });
  },
  resetSearchFilterList({ commit }) {
    // state에게 들어올 값의 타입 미리 알려주기위해 {} 입력
    commit("resetSearchFilterList", {});
  },
  getSearchResultList({ commit }) {
    const searchResultList = [
      {
        id: 1,
        category: "자동차부품",
        dataLocation: "내부",
        dataSource: "도로교통공단",
        fileType: ["CSV", "XML"],
        title: "도로교통공단_결빙사고 다발지역",
        body: "노면상태가 '서리/결빙'인 교통사고에 대한 사고다발지역 정보",
        date: "2022-05-09",
        download: 180,
        hit: 200
      },
      {
        id: 2,
        category: "자동차부품",
        dataLocation: "내부",
        dataSource: "도로교통공단",
        fileType: ["CSV", "XML"],
        title: "도로교통공단_결빙사고 다발지역",
        body: "노면상태가 '서리/결빙'인 교통사고에 대한 사고다발지역 정보",
        date: "2022-05-09",
        download: 180,
        hit: 200
      },
      {
        id: 3,
        category: null,
        dataLocation: "외부",
        dataSource: "도로교통공단",
        fileType: null,
        title:
          "Dataset for the paper Prolonged prothrombin time as an early prognostic indicator of severe",
        body: "Predicting continental US drought levels using meteorological & soil data. The US drought monitor is a measure of drought across the US manually created by experts using a wide range of data. This datasets' aim is to help investigate if droughts could be predicted using only meteorological data, potentially leading to generalizationr",
        date: "2022-05-09",
        download: 180,
        hit: 200
      },
      {
        id: 4,
        category: "자동차부품",
        dataLocation: "내부",
        dataSource: "도로교통공단",
        fileType: ["CSV", "XML"],
        title: "도로교통공단_결빙사고 다발지역",
        body: "노면상태가 '서리/결빙'인 교통사고에 대한 사고다발지역 정보",
        date: "2022-05-09",
        download: 180,
        hit: 200
      }
    ];

    commit("setSearchResultList", searchResultList);
  }
};
