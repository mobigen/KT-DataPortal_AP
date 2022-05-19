export const state = () => ({
  searchTagList: {},
  tabMenuList: [],
  searchFilterList: [],
  selectSearchFilterList: {},
  searchResultList: [],
  searchDetailObject: {}
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
  },
  searchDetailObject(state) {
    return state.searchDetailObject;
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
    // const setData = JSON.parse(JSON.stringify(data));
    // for (const key in setData) {
    //   setData[key] = [];
    // }
    // state.selectSearchFilterList = setData;
  },
  // list를 덮어씌움
  setSearchFilterListByKey(state, { key, changeList }) {
    if (
      !Object.prototype.hasOwnProperty.call(state.selectSearchFilterList, key)
    ) {
      state.selectSearchFilterList[key] = {};
    }
    state.selectSearchFilterList[key] = changeList;
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
  async getSearchFilterList({ commit }, filterObj) {
    // when connect API server, use this code.

    // const filterKeys = Object.keys(filterObj);
    // let result = {};
    // await filterKeys.forEach((key) => {
    //   this.$axios.get(filterObj[key].restApi).then((d) => {
    //     result[key] = d;
    //   });
    // });

    const category = [
      { itemId: 1, itemName: "자동차부품" },
      { itemId: 2, itemName: "자동차제조" },
      { itemId: 3, itemName: "자동차정비" },
      { itemId: 4, itemName: "화물운송" },
      { itemId: 5, itemName: "관제사고" },
      { itemId: 6, itemName: "미래차산업" }
    ];

    const provider = [
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
    ];

    const dataType = [
      { itemId: 17, itemName: "데이터셋(파일)" },
      { itemId: 18, itemName: "데이터 서비스" }
    ];

    const result = { category, provider, dataType };

    commit("setSearchFilterList", result);
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
  },
  getSearchDetailObject({ commit }, postId) {
    console.log(postId);

    const searchDetailObject = {
      mainProductInfo: {
        dataType: "교통",
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
      providerInfo: {
        header: [
          {
            column_name: "provider"
          },
          {
            column_name: "department"
          },
          {
            column_name: "manager"
          },
          {
            column_name: "deptPhoneNo"
          }
        ],
        body: {
          provider: "도로교통공사",
          department: "데이터융합처",
          manager: "홍길동",
          deptPhoneNo: "02-234-5678"
        }
      },
      dataInfo: {
        header: [
          {
            column_name: "category"
          },
          {
            column_name: "license"
          },
          {
            column_name: "dataType"
          },
          {
            column_name: "language"
          },
          {
            column_name: "basisPossess"
          },
          {
            column_name: "collectionMethod"
          },
          {
            column_name: "date"
          },
          {
            column_name: "dateUpdateCycle"
          },
          {
            column_name: "updateDate"
          },
          {
            column_name: "updateDueDate"
          },
          {
            column_name: "formProvision"
          },
          {
            column_name: "licenseRange"
          },
          {
            column_name: "provideUrl"
          },
          {
            column_name: "description"
          },
          {
            column_name: "keyword"
          }
        ],
        body: {
          category: "자동차제조 > 스마트팩토리",
          license: "국토교통부34개",
          dataType: "데이터셋",
          language: "한국어",
          basisPossess: null,
          collectionMethod: "수시(1회성 데이터)",
          date: "2021.06.01",
          dateUpdateCycle: "수시(1회성 데이터)",
          updateDate: "2022.03.22",
          updateDueDate: "2022.03.22",
          formProvision: "기관 자체 또는 다운로드",
          licenseRange: "제한없음",
          provideUrl:
            "http://openapi/grid/selectOpenApiSvcDtlView.do?apiSvcCd=CM",
          description: "지역별 결빙사고다발지역에 대한 주요 정보를 제공합니다.",
          keyword: "결빙, 사고, 다발지역, 교통"
        }
      },
      mainTextInfo: "Editor작성 내용 노출"
    };

    commit("setSearchDetailObject", searchDetailObject);
  }
};
