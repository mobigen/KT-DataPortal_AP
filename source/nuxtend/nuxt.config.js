import { resolve } from "path";

export default {
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // generate
  generate: {
    cache: false,
    crawler: true,
    routes: ["/"]
    // dir: "../../src/main/resources/static"
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "KT-Dataportal",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/main.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/defaults.js",
    "@/plugins/axios.js",
    "@/plugins/route.js",
    "@/plugins/persisted-state.client.js"
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "@nuxtjs/dotenv",
    "@nuxtjs/proxy",
    "@nuxtjs/axios",
    "@nuxtjs/style-resources",
    "@nuxtjs/svg-sprite",
    "@nuxtjs/i18n",
    "@nuxtjs/fontawesome"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["cookie-universal-nuxt"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      preset: {
        features: {
          "custom-properties": false
        }
      }
    },

    extend(config) {
      config.resolve.alias["vue"] = "vue/dist/vue.common";
    }
  },

  // alias
  alias: {
    "@component": resolve(__dirname, "./components"),
    "@molecules": resolve(__dirname, "./components/molecules"),
    "@organisms": resolve(__dirname, "./components/organisms")
  },

  // options
  svgSprite: {
    input: "./assets/style-core/images/icon"
  },

  axios: {
    baseURL:
      process.env.ENV_TYPE === "development" ? "http://localhost:8888/" : "/",
    proxy: true
  },

  i18n: {
    locales: [
      { code: "en", iso: "en-US", file: "en.json" },
      { code: "ko", iso: "ko-KR", file: "ko.json" }
    ],
    defaultLocale: "ko",
    vueI18n: {
      fallbackLocale: "ko"
    },
    lazy: true,
    langDir: "./locales",
    vueI18nLoader: true
  },

  loading: {
    color: "blue"
  },

  styleResources: {
    scss: ["./assets/main.scss"]
  },

  fontawesome: {
    component: "fa",
    icons: {
      solid: true,
      brands: true
    }
  },

  storybook: {
    addons: ["@storybook/addon-actions", "@storybook/addon-controls"],
    modules: {
      exclude: ["svg-sprite"]
    }
  },

  proxy: {
    "/api/": {
      target: "http://localhost:8888/",
      pathRewrite: { "/api": "/dataPortal/api" },
      changeOrigin: true // cross origin 허용
    },
    "/remote/": {
      target: "http://192.168.101.43:8000",
      pathRewrite: { "/remote": "" }
      // , changeOrigin: true
    }
  },
  server: {
    port: process.env.VUE_APP_AXIOS_BASE_PORT,
    listen: 80
  }
};
