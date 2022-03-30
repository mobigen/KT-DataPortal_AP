import Vue from "vue";
import VueRouter from "vue-router";

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
    path: "/admin",
    component: () => import("@modules/admin/pages/main.vue"),
    children: [
      {
        path: "page1",
        name: "a-page1",
        component: () => import("@modules/admin/pages/page1")
      },
      {
        path: "page2",
        component: () => import("@modules/admin/pages/page2")
      }
    ]
  },
  {
    path: "/superAdmin",
    component: () => import("@modules/superAdmin/pages/main.vue"),
    children: [
      {
        path: "/superAdmin/page1",
        component: () => import("@modules/superAdmin/pages/page1")
      },
      {
        path: "/superAdmin/page2",
        component: () => import("@modules/superAdmin/pages/page2")
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

export default router;
