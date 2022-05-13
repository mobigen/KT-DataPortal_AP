import { resolve } from "path";

function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { default: e };
}
const consola__default = /*#__PURE__*/ _interopDefaultLegacy(consola);
const logger = consola__default["default"];

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
    baseURL: process.env.VUE_APP_AXIOS_BACKEND_URL + "/",
    proxy: process.env.ENV_TYPE === "development"
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
    // api-router 사용
    "/api/": {
      target: "http://192.168.101.43:18000/route/",
      pathRewrite: {
        "/api/meta/": "/meta/",
        "/api/user/": "/meta/"
      }
      // changeOrigin: true // cross origin 허용
    },
    // backend 바로 붙을때 사용
    // "/api/": {
    //   target: "http://192.168.101.43:19000/",
    //   pathRewrite: { "/api": "/route/" },
    //   changeOrigin: true // cross origin 허용
    // },
    // local 테스트
    "/local/": {
      target: "http://localhost:8888/",
      pathRewrite: { "/local": "/dataPortal/api" },
      changeOrigin: true
    }
  },
  server: {
    port: process.env.VUE_APP_AXIOS_BASE_PORT,
    listen: 80
  },

  router: {
    extendRoutes(routes) {
      logger.info(
        "## NuxtLink 처리: 정적 리소스에 대한 html 파일 대응을 위해 아래와 같이 alias 경로를 변경 합니다."
      );
      routes.forEach((route) => {
        const alias =
          route.path.length > 1 ? `${route.path}/index.html` : "/index.html";
        logger.info(route.alias, "==> " + alias);
        for (var key in route) {
          logger.info("----" + key + " [" + route[key] + "]");
        }
        route.alias = alias;
      });
    }
  }
};
