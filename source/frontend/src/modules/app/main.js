import Vue from "vue";
import api from "@/utils/api";
import i18n from "@/utils/i18n";
import cookie from "vue-cookies";
import router from "@/router/route";
import store from "@/store/app";
import AxiosInterceptor from "@/components/common/axios-interceptor.vue";
import App from "@modules/app/App.vue";

// svg-icon
import { VueSvgIcon } from "@yzfe/vue-svgicon";

// axios json-viwer
import JsonViewer from "@/components/basic/basic-jsonViewer";

Vue.config.productionTip = false;

Vue.use(cookie);

Vue.prototype.$cookie = cookie;
Vue.prototype.$api = api;

Vue.component("axios-interceptor", AxiosInterceptor);
Vue.component("icon", VueSvgIcon);
Vue.component("json-viwer", JsonViewer);

// Sentry.init({
//   Vue,
//   dsn: "https://c10f0211c0bb41af973f1f5ebf7fda60@o924939.ingest.sentry.io/6044951",
//   integrations: [
//     new Integrations.BrowserTracing({
//       routingInstrumentation: Sentry.vueRouterInstrumentation(router),
//       tracingOrigins: [/^\//]
//     })
//   ],
//   tracesSampleRate: 1.0
// });

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
