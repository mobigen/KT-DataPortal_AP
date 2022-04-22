import Vue from "vue";

export const state = () => ({
  metaNameList: [],
  useMetaNameList: [],
  metaName: {},
  bizMetaList: [],
  metaNameDetail: {},
  bizMetaDetail: {},
  metaMapList: [],
  bizMetaForm: [],
  categoryObject: {},
  selectedNodeList: {}
});

export const getters = {
  metaNameList(state) {
    return state.metaNameList;
  },
  useMetaNameList(state) {
    return state.useMetaNameList;
  },
  metaName(state) {
    return state.metaName;
  },
  bizMetaList(state) {
    return state.bizMetaList;
  },
  metaNameDetail(state) {
    return state.metaNameDetail;
  },
  bizMetaDetail(state) {
    return state.bizMetaDetail;
  },
  bizMetaForm(state) {
    return state.bizMetaForm;
  },
  metaMapList(state) {
    return state.metaMapList;
  },
  categoryObject(state) {
    return state.categoryObject;
  },
  selectedNodeList(state) {
    return state.selectedNodeList;
  }
};
export const mutations = {
  setMetaNameList(state, data) {
    state.metaNameList = data;
  },
  setUseMetaNameList(state, data) {
    state.useMetaNameList = data;
  },
  setMetaName(state, data) {
    state.metaName = data;
  },
  setBizMetaList(state, data) {
    state.bizMetaList = data;
  },
  setMetaNameDetail(state, data) {
    state.metaNameDetail = data;
  },
  setBizMetaDetail(state, data) {
    state.bizMetaDetail = data;
  },
  setBizMetaForm(state, data) {
    state.bizMetaForm = data;
  },
  setMetaMapList(state, data) {
    state.metaMapList = data;
  },
  setCategoryObject(state, data) {
    state.categoryObject = data;
  },
  setSelectedNodeList(state, { key, node, bool }) {
    if (bool) {
      const _node = JSON.parse(JSON.stringify(node));
      delete _node["children"];
      state.selectedNodeList[key] = _node;
    } else {
      delete state.selectedNodeList[key];
    }
    state.selectedNodeList = JSON.parse(JSON.stringify(state.selectedNodeList));
    // console.log(state.selectedNodeList);
  }
};
export const actions = {
  getMetaNameList({ _, commit }) {
    Vue.prototype.$api.get("/api/meta/metaNameList").then((d) => {
      commit("setMetaNameList", d);
    });
  },
  async getUseMetaNameList({ commit }) {
    await Vue.prototype.$api.get("/api/meta/useMetaNameList").then((d) => {
      commit("setUseMetaNameList", d);
    });
  },
  getMetaName({ commit }, rowKey) {
    if (rowKey === undefined) {
      const empObj = {};
      commit("setMetaName", empObj);
      return;
    }

    Vue.prototype.$api
      .get("/api/meta/getMetaName", { params: { nameId: rowKey } })
      .then((d) => {
        commit("setMetaName", d);
      });
  },
  async addMetaName({}, obj) {
    if (Object.keys(obj).length === 0) {
      console.log("저장할 Data 없음");
      return;
    }
    await Vue.prototype.$api.post("/api/meta/insertMetaName", obj);
  },
  removeMetaName({ dispatch }, rowKey) {
    Vue.prototype.$api
      .delete("/api/meta/deleteMetaName", { params: { nameId: rowKey } })
      .then(() => {
        dispatch("getMetaNameList");
      });
  },
  async editMetaName({}, obj) {
    if (Object.keys(obj).length === 0) {
      console.log("변경된 Data 없음");
      return;
    }

    await Vue.prototype.$api.put("/api/meta/updateMetaName", obj);
  },
  getBizMetaList({ commit }) {
    Vue.prototype.$api.get("/api/meta/getBizMetaList").then((d) => {
      commit("setBizMetaList", d);
    });
  },
  getMetaNameDetail({ commit }, rowId) {
    Vue.prototype.$api
      .get("/api/meta/getMetaNameDetail?nameId=" + rowId)
      .then((d) => {
        commit("setMetaNameDetail", d);
      });
  },
  async getBizMetaDetail({ commit }, rowId) {
    await Vue.prototype.$api
      .get("/api/meta/getBizMetaDetail?datasetId=" + rowId)
      .then((d) => {
        commit("setBizMetaDetail", d);
      });
  },
  async getBizMetaForm({ commit }) {
    await Vue.prototype.$api.get("/api/meta/getBizMetaForm").then((d) => {
      commit("setBizMetaForm", d);
    });
  },
  removeBizMeta({ dispatch }, rowKey) {
    Vue.prototype.$api
      .delete("/api/meta/deleteBizMeta", {
        params: { bizDatasetId: rowKey }
      })
      .then(() => {
        dispatch("getBizMetaList");
      });
  },
  async addBizMeta({}, obj) {
    let dataList = [];

    for (var key in obj) {
      let setObj = {};
      setObj.itemId = key;
      setObj.itemVal = obj[key];

      dataList.push(setObj);
    }
    await Vue.prototype.$api.post("/api/meta/insertBizMeta", dataList);
  },
  getMetaMapList({ commit }) {
    Vue.prototype.$api.get("/api/meta/metaMapList").then((d) => {
      commit("setMetaMapList", d);
    });
  },
  async addMetaMap({}, list) {
    let dataList = [];

    list.sort();
    list.forEach((data, i) => {
      let obj = {};
      obj.itemId = i + 1;
      obj.nameId = data;
      dataList.push(obj);
    });

    await Vue.prototype.$api.post("/api/meta/insertMetaMap", dataList);
  },

  getCategoryObject({ commit }, param) {
    Vue.prototype.$api.get("/api/meta/getCategoryList").then((d) => {
      // ArrayList 형태의 데이터를, children 형태의 데이터로 변경처리한다.
      let depthHelper = {};

      // 조회한 목록을 역순으로 설정한 후에, 끝에서 처음까지 돌면서 부모별로 자식들을 Object-array로 정리해둔다.
      // 원래 데이터와 분리하기 위해 깊은 복사를 진행한다.
      let reversed = JSON.parse(JSON.stringify(d));
      const reverseD = reversed.reverse();

      reverseD.forEach((el) => {
        // console.log(el.node_id);
        if (
          Object.prototype.hasOwnProperty.call(depthHelper, el[param.nodeId])
        ) {
          el.children = depthHelper[el[param.nodeId]];
          delete depthHelper[el[param.nodeId]];
        }

        if (
          !Object.prototype.hasOwnProperty.call(depthHelper, el[param.parentId])
        ) {
          depthHelper[el[param.parentId]] = [];
        }
        depthHelper[el[param.parentId]].push(el);
      });

      // root는 무조건 1개만 나오는 데이터로 가정.
      // db에서 조회한 데이터의 첫번째 row가 root node 로, 이 id를 기준으로 데이터가 정제되어 있다.
      let newD = depthHelper[d[0][param.nodeId]][0];
      newD.subscribed = true;
      commit("setCategoryObject", newD);
    });
  },
  setSelectedNodeList({ commit }, param) {
    param.subscribed = true;
    commit("setSelectedNodeList", param);
  },
  getTestData({}) {
    Vue.prototype.$api.post("/remote/remote_command").then((d) => {
      console.log(d);
    });
  }
};
