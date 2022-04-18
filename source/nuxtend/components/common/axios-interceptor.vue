<script>
import Vue from "vue";
import LoadingOverlay from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

/**
 * AXIOS의 Interceptor 설정 및
 * Request - Response 간의 자동 Preloader 기능 지원
 * @displayName Axios-Interceptor
 */
export default {
  name: "AxiosInterceptor",
  components: {
    "loading-overlay": LoadingOverlay
  },
  template: " ",
  data() {
    return {
      loader: null,
      requestCount: 0
    };
  },
  created() {
    Vue.use(LoadingOverlay);
    let api = Vue.prototype.$api;
    /**
     * 각각의 root 페이지에서 axios-interceptor를 호출하게 되어있음.
     * 페이지가 변경될때마다 axios가 생성되어서, interceptor가 중복으로 등록됨.
     *
     * 수정방안 1 :
     *    index.vue를 root로 처리하고 axios-interceptor를 등록하려 했으나, 추후에 root 페이지별로 분리할 가능성이 있어서 보류함.
     * 수정방안 2 :
     *    interceptor를 store로 관리하려 했으나, 처리가 복잡하여 보류함.
     *
     * 이미 등록된 request가 없는 경우에만 interceptor을 등록해줌.
     */
    if (api.interceptors.request.handlers.length <= 1) {
      api.interceptors.request.use(this.requestSuccess, this.requestError);
      api.interceptors.response.use(this.responseSuccess, this.responseError);
    }
  },
  methods: {
    getErrorMessage(message) {
      if (message === null || message === "") {
        message = "여기에 시스템 에러 메세지를 넣어야 함";
      }
      return message;
    },
    requestSuccess(config) {
      this.showLoader(config);
      return config;
    },
    requestError(error) {
      return Promise.reject(error);
    },
    responseSuccess(response) {
      this.hideLoader();

      let data = response.data;
      if (
        Object.prototype.hasOwnProperty.call(data, "result") &&
        data.result === 0
      ) {
        // alert(this.getErrorMessage(data.errorMessage));
        return Promise.reject(response);
      }

      return data.data;
    },
    responseError(error) {
      this.hideLoader();
      // alert(this.getErrorMessage(error));
      return Promise.reject(error);
    },
    showLoader(config) {
      if (config.noLoader) {
        return;
      }
      if (this.requestCount === 0) {
        this.loader = this.$loading.show({
          container: this.$refs.loadingContainer,
          canCancel: true, // default false
          onCancel: this.yourMethodName,
          color: "#000000",
          width: 64,
          height: 64,
          backgroundColor: "#ffffff",
          opacity: 0.5,
          zIndex: 999,
          loader: "spinner"
        });
      }
      this.requestCount++;
    },
    hideLoader() {
      this.requestCount--;
      if (this.requestCount === 0) {
        this.loader.hide();
      }
    }
  }
};
</script>
