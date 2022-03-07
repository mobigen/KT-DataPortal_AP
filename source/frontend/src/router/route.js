import Vue from "vue";
import VueRouter from "vue-router";

import Error from "@modules/error/Error.vue";
import FormSample from "@modules/app/pages/form-sample.vue";
import ImageListSample from "@modules/app/pages/image-list-sample.vue";

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
