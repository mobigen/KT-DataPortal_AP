export const state = () => ({
  pagingObj: {}
});

export const getters = {
  paging(state) {
    return state.pagingObj;
  }
};

export const mutations = {
  setNewPaging(state, params) {
    // 초기 설정값. 외부에서 수정 불가능
    const defaultObj = {
      pageSet: 0,
      totalCount: 0,
      itemsPerPage: 10,
      visiblePages: 10,
      page: 1,
      totalPage: 1
    };
    state.pagingObj[params.key] = Object.assign(defaultObj, params.data);
  },
  setPageObject(state, params) {
    const statePageObj = state.pagingObj[params.key];

    params.data.pageSet = parseInt(
      ((params.data.page ? params.data.page : 1) - 1) /
        statePageObj.visiblePages
    );

    // set TOTAL-Page No
    if (Object.prototype.hasOwnProperty.call(params.data, "totalCount")) {
      // totalCount가 변경되면, totalPageNo를 계산한다.
      params.data.totalPage = Math.ceil(
        statePageObj.totalCount / statePageObj.itemsPerPage
      );
    }
    Object.assign(state.pagingObj[params.key], params.data);
    // // Object 변경사항 적용
    state.pagingObj = JSON.parse(JSON.stringify(state.pagingObj));
  }
};

export const actions = {
  setNewPagination({ commit }, params) {
    commit("setNewPaging", params);
  },
  setPage({ commit }, { key, page }) {
    commit("setPageObject", {
      key: key,
      data: {
        page: page
      }
    });
  },

  setTotalCount({ commit }, { key, totalCount }) {
    commit("setPageObject", {
      key: key,
      data: {
        totalCount: totalCount
      }
    });
  }
};
