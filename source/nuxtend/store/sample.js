export const state = () => ({
  name: "cat",
  photo: "https://a.wattpad.com/useravatar/Sundew_01.256.440713.jpg",
  images: []
});

export const getters = {
  name(state) {
    return state.name;
  },
  userPhoto(state) {
    return state.photo;
  },
  userPhotoList(state) {
    console.log(state);
    return state.images;
  }
};

export const mutations = {
  setName(state, data) {
    state.name = data;
  },
  setImages(state, data) {
    state.images = data;
  },
  setPhoto(state, data) {
    state.photo = data;
  }
};

export const actions = {
  getUserPhotos({ state, commit }, data) {
    Vue.prototype.$api.get("/api/sample-images?count=" + data).then((d) => {
      commit("setImages", d);
    });
  }
};

// import Vue from "vue";
// // import Vuex from "vuex";
//
// const sample = {
//   namespaced: true,
//   state: {
//     name: "cat",
//     photo: "https://a.wattpad.com/useravatar/Sundew_01.256.440713.jpg",
//     images: []
//   },
//   getters: {
//     name(state) {
//       return state.name;
//     },
//     userPhoto(state) {
//       return state.photo;
//     },
//     userPhotoList(state) {
//       console.log(state)
//       return state.images;
//     }
//   },
//   mutations: {
//     setName(state, data) {
//       state.name = data;
//     },
//     setImages(state, data) {
//       state.images = data;
//     },
//     setPhoto(state, data) {
//       state.photo = data;
//     }
//   },
//   actions: {
//     getUserPhotos({ state, commit }, data) {
//       Vue.prototype.$api.get("/api/sample-images?count=" + data).then((d) => {
//         commit("setImages", d);
//       });
//     }
//   }
// };
//
// export default sample;
