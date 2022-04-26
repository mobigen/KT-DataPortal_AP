import Vue from "vue";

export const state = () => ({
  categoryObject: {},
  selectedNodeList: {},
  categoryObjectByKey: {}
});

export const getters = {
  categoryObject(state) {
    return state.categoryObject;
  },
  selectedNodeList(state) {
    return state.selectedNodeList;
  },
  categoryObjectByKey(state) {
    return state.categoryObjectByKey;
  }
};

export const mutations = {
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
  },
  setCategoryObjectByKey(state, data) {
    state.categoryObjectByKey = data;
  }
};

export const actions = {
  getCategoryObject({ commit }, param) {
    Vue.prototype.$api.get(param.api).then((d) => {
      // ArrayList 형태의 데이터를, children 형태의 데이터로 변경처리한다.
      let jsonHelper = {};

      // 조회한 목록을 역순으로 설정한 후에, 끝에서 처음까지 돌면서 부모별로 자식들을 Object-array로 정리해둔다.
      // 원래 데이터와 분리하기 위해 깊은 복사를 진행한다.
      let reversed = JSON.parse(JSON.stringify(d));
      const reverseD = reversed.reverse();

      let objectByKey = {};

      reverseD.forEach((el) => {
        objectByKey[el[param.nodeIdText]] = el;

        if (
          Object.prototype.hasOwnProperty.call(jsonHelper, el[param.nodeIdText])
        ) {
          el.children = jsonHelper[el[param.nodeIdText]];
          delete jsonHelper[el[param.nodeIdText]];
        }

        if (
          !Object.prototype.hasOwnProperty.call(
            jsonHelper,
            el[param.parentIdText]
          )
        ) {
          jsonHelper[el[param.parentIdText]] = [];
        }
        jsonHelper[el[param.parentIdText]].push(el);
      });

      objectByKey.subscribed = true;

      // root는 무조건 1개만 나오는 데이터로 가정.
      // db에서 조회한 데이터의 첫번째 row가 root node 로, 이 id를 기준으로 데이터가 정제되어 있다.
      let newD = jsonHelper[d[0][param.nodeIdText]][0];
      newD.subscribed = true;
      commit("setCategoryObject", newD);
      commit("setCategoryObjectByKey", objectByKey);
    });
  },
  setSelectedNodeList({ commit }, param) {
    param.subscribed = true;
    commit("setSelectedNodeList", param);
  },

  updateNodeInfo({ commit }, param) {
    console.log(param);
  },

  addNewChild({ commit }, param) {
    console.log(param);
  }
};
