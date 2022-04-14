import Vue from "vue";
import api from "@/utils/api";
// import i18n from "@/utils/i18n";
import cookie from "vue-cookies";
import AxiosInterceptor from "@/components/common/axios-interceptor";

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
