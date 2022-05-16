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
  },
  categoryObjectForTag(state) {
    return (treeKey, nodeNameStr) => {
      const _selectedNode = state.selectedNodeList[treeKey];
      if (_selectedNode === undefined) {
        return [];
      }
      return Object.keys(_selectedNode).map((_c) => {
        return { itemId: _c, itemName: _selectedNode[_c][nodeNameStr] };
      });
    };
  }
};

export const mutations = {
  setCategoryObject(state, { componentKey, data }) {
    state.categoryObject[componentKey] = data;
    state.categoryObject = JSON.parse(JSON.stringify(state.categoryObject));
  },
  setSelectedNodeList(state, { key, node, bool, componentKey }) {
    if (bool) {
      const _node = JSON.parse(JSON.stringify(node));
      delete _node["children"];

      if (
        !Object.prototype.hasOwnProperty.call(
          state.selectedNodeList,
          componentKey
        )
      ) {
        state.selectedNodeList[componentKey] = {};
      }

      state.selectedNodeList[componentKey][key] = _node;
    } else {
      delete state.selectedNodeList[componentKey][key];
    }
    // deep copy
    state.selectedNodeList = JSON.parse(JSON.stringify(state.selectedNodeList));
  },
  setCategoryObjectByKey(state, { componentKey, data }) {
    state.categoryObjectByKey[componentKey] = data;
  },
  resetSelectedNodeList(state, { componentKey }) {
    state.selectedNodeList[componentKey] = {};
  }
};

export const actions = {
  getCategoryObject({ commit, rootGetters }, param) {
    const CONSTANTS = rootGetters["defaults/constants/CONSTANTS"];

    this.$axios.get(param.api).then((d) => {
      // ArrayList 형태의 데이터를, children 형태의 데이터로 변경처리한다.
      let jsonHelper = {};

      // 조회한 목록을 역순으로 설정한 후에, 끝에서 처음까지 돌면서 부모별로 자식들을 Object-array로 정리해둔다.
      // 원래 데이터와 분리하기 위해 깊은 복사를 진행한다.
      let reversed = JSON.parse(JSON.stringify(d));
      const reverseD = reversed.reverse();

      let objectByKey = {};

      reverseD.forEach((el) => {
        objectByKey[el[param[CONSTANTS.TREE.TREE_KEY.NODE_ID]]] = el;

        if (
          Object.prototype.hasOwnProperty.call(
            jsonHelper,
            el[param[CONSTANTS.TREE.TREE_KEY.NODE_ID]]
          )
        ) {
          el.children = jsonHelper[el[param[CONSTANTS.TREE.TREE_KEY.NODE_ID]]];
          delete jsonHelper[el[param[CONSTANTS.TREE.TREE_KEY.NODE_ID]]];
        }

        if (
          !Object.prototype.hasOwnProperty.call(
            jsonHelper,
            el[param[CONSTANTS.TREE.TREE_KEY.PARENT_ID]]
          )
        ) {
          jsonHelper[el[param[CONSTANTS.TREE.TREE_KEY.PARENT_ID]]] = [];
        }
        jsonHelper[el[param[CONSTANTS.TREE.TREE_KEY.PARENT_ID]]].push(el);
      });

      // root는 무조건 1개만 나오는 데이터로 가정.
      // db에서 조회한 데이터의 첫번째 row가 root node 로, 이 id를 기준으로 데이터가 정제되어 있다.
      let newD = jsonHelper[d[0][param[CONSTANTS.TREE.TREE_KEY.NODE_ID]]][0];

      commit("setCategoryObject", {
        componentKey: param.componentKey,
        data: newD
      });
      commit("setCategoryObjectByKey", {
        componentKey: param.componentKey,
        data: objectByKey
      });
    });
  },
  setSelectedNodeList({ commit }, param) {
    commit("setSelectedNodeList", param);
  },
  resetSelectedNodeList({ commit }, param) {
    commit("resetSelectedNodeList", param);
  },

  async updateNodeInfo({ commit }, param) {
    await this.$axios.post("/api/meta/updateCategory", param);
  },

  async addChildCategory({ commit }, param) {
    await this.$axios.post("/api/meta/addChildCategory", param);
  }
};
