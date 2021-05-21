import Vue from "vue";
import api from "@/utils/api";
import i18n from "@/utils/i18n";
import cookie from "vue-cookies";
import AxiosInterceptor from "@/components/common/axios-interceptor.vue";
import Index from "@modules/index/Index.vue";

// svg-icon
import { VueSvgIcon } from "@yzfe/vue-svgicon";
import "@yzfe/svgicon/lib/svgicon.css";

Vue.config.productionTip = false;

Vue.use(cookie);

Vue.prototype.$cookie = cookie;
Vue.prototype.$api = api;

Vue.component("axios-interceptor", AxiosInterceptor);
Vue.component("icon", VueSvgIcon);

new Vue({
  i18n,
  render: (h) => h(Index)
}).$mount("#index");
