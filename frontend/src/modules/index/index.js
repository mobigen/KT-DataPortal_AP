import Vue from "vue";
import api from "@/utils/api";
import i18n from "@/utils/i18n";
import cookie from "vue-cookies";
import AxiosInterceptor from "@/components/common/axios-interceptor.vue";
import Index from "@modules/index/Index.vue";

Vue.config.productionTip = false;

Vue.use(cookie);

Vue.prototype.$cookie = cookie;
Vue.prototype.$api = api;

Vue.component("axios-interceptor", AxiosInterceptor);

new Vue({
  i18n,
  render: h => h(Index)
}).$mount("#index");
