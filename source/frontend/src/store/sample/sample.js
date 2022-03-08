import Vue from "vue";

const sample = {
  namespaced: true,
  state: {
    name: "orangutan",
    photo: "https://avatars.githubusercontent.com/u/25652173?v=4",
    images: []
  },
  getters: {
    name(state) {
      return state.name;
    },
    userPhoto(state) {
      return state.photo;
    },
    userPhotoList(state) {
      return state.images;
    }
  },
  mutations: {
    setName(state, data) {
      state.name = data;
    },
    setImages(state, data) {
      state.images = data;
    },
    setPhoto(state, data) {
      state.photo = data;
    }
  },
  actions: {
    getUserPhotos({ state, commit }, data) {
      Vue.prototype.$api.get("/api/sample-images?count=" + data).then((d) => {
        commit("setImages", d);
      });
    }
  }
};

export default sample;
