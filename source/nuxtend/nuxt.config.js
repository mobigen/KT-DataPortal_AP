import { resolve } from "path";

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  router: {
    base: "/dataPortal/"
  },
  app: {
    base: "/dataPortal/",
    buildAssetsPath: "/_nuxt/"
  },

  // default alias
  // alias: {
  //   '~~': `<rootDir>`,
  //   '@@': `<rootDir>`,
  //   '~': `<srcDir>`,
  //   '@': `<srcDir>`,
  //   'assets': `<srcDir>/assets`, // (unless you have set a custom `dir.assets`)
  //   'static': `<srcDir>/static`, // (unless you have set a custom `dir.static`)
  // },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "nuxtend",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/main.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~plugin/defaultPlugin.js", "~plugin/route.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/dotenv"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    [
      "nuxt-svgicon",
      {
        sourcePath: "assets/style-core/images/icon",
        targetPath: "assets/svg/bundle",
        subDir: "assets/style-core/images/icon",
        ext: "js",
        es6: false,
        tpl: "",
        idSP: "_",
        svgo: null, // use default vue-svgicon config
        renameStyles: false,
        tagName: "svgIcon",
        usePolyfill: true
      }
    ]
  ],
  axios: {
    // baseURL: process.env.NODE_ENV !== "production" ? "http://localhost:8888/dataPortal/api/" : "",
    baseURL: "http://localhost:8888/dataPortal/api/",
    proxy: true
  },
  proxy: {
    "/dataPortal/api/": {
      target: "http://localhost:8888",
      changeOrigin: true // cross origin 허용
    }
  },
  server: {
    port: process.env.VUE_APP_AXIOS_BASE_PORT,
    listen: 80
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config) {
      config.resolve.alias["vue"] = "vue/dist/vue.common";

      // const hmrIndex = config.plugins.findIndex(
      //   (p) => p.constructor.name === "HotModuleReplacementPlugin"
      // );
      // config.plugins.splice(hmrIndex, 1);
    }
  }
};
