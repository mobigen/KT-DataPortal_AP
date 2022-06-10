import axios from "axios";

let __config = {
  // nuxt.config.js 에 설정 추가
  // baseURL: `http://localhost:${process.env.VUE_APP_AXIOS_BASE_PORT}`
  // timeout: 0,
  // withCredentials: false,
  // maxContentLength: 2000,
};

const __http = axios.create(__config);
__http.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
__http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default __http;
