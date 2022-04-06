import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/app";

import Error from "@modules/error/Error.vue";
import FormSample from "@modules/app/sample/form/form-sample.vue";
import ImageListSample from "@modules/app/sample/image-list/image-list-sample.vue";
import SearchTemplate from "@modules/app/sample/search/search-template.vue";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: "./app"
  },
  {
    path: "/app",
    component: FormSample
  },
  {
    path: "/app/form-sample",
    component: FormSample
  },
  {
    path: "/app/image-list-sample",
    component: ImageListSample
  },
  {
    path: "/app/search-template",
    component: SearchTemplate
  },
  {
    path: "/admin/meta",
    redirect: { name: "metaList" },
    component: () => import("@modules/admin/meta/main.vue"),
    children: [
      {
        path: "metaList",
        name: "metaList",
        component: () => import("@modules/admin/meta/metaList")
      },
      {
        path: "metaAdd/:rowKey",
        component: () => import("@modules/admin/meta/metaAdd")
      },
      {
        path: "metaView/:rowKey",
        component: () => import("@modules/admin/meta/metaView")
      }
    ]
  },
  {
    path: "/superAdmin/meta",
    component: () => import("@modules/superAdmin/meta/main.vue"),
    children: [
      {
        path: "metaList",
        name: "sa-metaList",
        component: () => import("@modules/superAdmin/meta/metaList")
      },
      {
        path: "metaForm/:rowKey?",
        name: "sa-metaForm",
        component: () => import("@modules/superAdmin/meta/metaForm")
      },
      {
        path: "metaView/:rowKey",
        name: "sa-metaView",
        component: () => import("@modules/superAdmin/meta/metaView")
      }
    ]
  },
  {
    path: "*",
    component: Error
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.VUE_APP_PUBLIC_PATH,
  routes
});

router.afterEach(() => {
  store.dispatch("common/setDevJsonReset");
});

export default router;
