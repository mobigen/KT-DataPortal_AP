import Vue from "vue";
import api from "@/utils/api";
import i18n from "@/utils/i18n";
import cookie from "vue-cookies";
import router from "@/router/route"
import AxiosInterceptor from "@/components/common/axios-interceptor.vue";
import App from "@modules/app/App.vue";

Vue.config.productionTip = false;

Vue.use(cookie);

Vue.prototype.$cookie = cookie;
Vue.prototype.$api = api;

Vue.component("axios-interceptor", AxiosInterceptor);

new Vue({
    i18n,
    router,
    render: h => h(App)
}).$mount("#app");