export const state = () => ({
  searchTagList: {},
  tabMenuList: [],
  searchFilterList: [],
  selectSearchFilterList: {}
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
  setSelectSearchFilterList(state, data) {
    state.selectSearchFilterList = data;
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
    const result = {
      category: {
        label: "카테고리",
        dataList: [
          { itemId: 1, itemName: "자동차부품" },
          { itemId: 2, itemName: "자동차제조" },
          { itemId: 3, itemName: "자동차정비" },
          { itemId: 4, itemName: "화물운송" },
          { itemId: 5, itemName: "관제사고" },
          { itemId: 6, itemName: "미래차산업" }
        ]
      },
      provider: {
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
      },
      dataType: {
        label: "데이터 타입",
        dataList: [
          { itemId: 17, itemName: "데이터셋(파일)" },
          { itemId: 18, itemName: "데이터 서비스" }
        ]
      },
      treeView: {
        label: "트리뷰",
        dataList: []
      }
    };

    commit("setSearchFilterList", result);
  },
  changeSearchFilterList({ commit }, { key, changeList }) {
    commit("setSearchFilterListByKey", { key, changeList });
  },
  resetSearchFilterList({ commit }) {
    // state에게 들어올 값의 타입 미리 알려주기위해 {} 입력
    commit("resetSearchFilterList", {});
  },
  getSelectSearchFilterList({ commit }) {
    const result = {
      category: {
        label: "카테고리",
        dataList: [
          { itemId: 1, itemName: "자동차부품" },
          { itemId: 2, itemName: "자동차제조" },
          { itemId: 4, itemName: "화물운송" }
        ]
      },
      provider: {
        label: "제공기관",
        dataList: [
          { itemId: 10, itemName: "국토교통부" },
          { itemId: 9, itemName: "한국과학기술정보연구원" },
          { itemId: 7, itemName: "도로교통공단" }
        ]
      },
      dataType: {
        label: "데이터 타입",
        dataList: [{ itemId: 17, itemName: "파일" }]
      },
      treeView: {
        label: "트리뷰",
        dataList: []
      }
    };

    commit("setSelectSearchFilterList", result);
  }
};