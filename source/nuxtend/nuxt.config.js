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
    routes: ["/"],
    dir: "../../../web/htdocs"
    // dir: process.env.ENV_TYPE === "local" ? "../../../web/htdocs" : "../../../web2/htdocs"
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Katech-Dataportal",
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
    "@/plugins/persisted-state.client.js",
    "@/plugins/lodash.js",
    "@/plugins/users/common.js",
    "@/plugins/vue-js-modal.js"
  ],

  components: ["~/components/common/functional"],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "@nuxtjs/dotenv",
    "@nuxtjs/proxy",
    "@nuxtjs/axios",
    "@nuxtjs/style-resources",
    "@nuxtjs/svg-sprite",
    "@nuxtjs/i18n",
    "@nuxtjs/fontawesome",
    // build, generate 속도 향샹
    "nuxt-build-optimisations"
  ],
  buildOptimisations: {
    profile: process.env.STORYBOOK_ENV === "storybook" ? false : "risky"
    // profile: 'experimental' // default
    // profile: 'safe'
    // profile: false
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["cookie-universal-nuxt"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // build, generate 속도 향샹
    parallel: process.env.STORYBOOK_ENV === "storybook" ? false : true,
    hardSource: process.env.STORYBOOK_ENV === "storybook" ? false : true,
    cache: process.env.STORYBOOK_ENV === "storybook" ? false : true,
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
    "@common": resolve(__dirname, "./components/common"),
    "@functional": resolve(__dirname, "./components/common/functional")
  },

  // options
  svgSprite: {
    input: "./assets/style-core/images/icon"
  },

  axios: {
    baseURL: process.env.API_GW_URL,
    credentials: true,
    proxy:
      process.env.ENV_TYPE === "local" || process.env.ENV_TYPE === "dev.apache",
    progress: false
    // debug : true
  },
  proxy: [
    // [
    //   "/oauth2/authorization/",
    //   {
    //     target: process.env.API_USER_URL,
    //     changeOrigin: true,
    //     secure: false
    //   }
    // ],
    // [
    //   "/login/oauth2",
    //   {
    //     target: process.env.API_USER_URL,
    //     changeOrigin: true,
    //     secure: false
    //   }
    // ],
    [
      "/portal/api/analysis",
      {
        target: process.env.API_ANALYSIS_URL,
        pathRewrite: { "^/api/": "" },
        changeOrigin: true,
        secure: false
      }
    ],
    [
      "/portal/api/board",
      {
        target: process.env.API_BOARD_URL,
        pathRewrite: { "^/api/": "" },
        changeOrigin: true,
        secure: false
      }
    ],
    [
      "/portal/api/users",
      {
        target: process.env.API_USER_URL,
        pathRewrite: { "^/api/": "" },
        changeOrigin: true,
        secure: false
      }
    ],
    [
      "/route/portal/users",
      {
        target: process.env.API_USER_URL,
        pathRewrite: { "/route/portal/users": "/portal/api/users" },
        changeOrigin: true,
        secure: false
      }
    ],
    [
      "/portal/api/meta",
      {
        target: process.env.API_META_URL,
        pathRewrite: { "/portal/api/meta/": "/route/meta/" }
      }
    ],
    [
      "/mgnt/api/apiRouter",
      {
        target: process.env.API_META_URL,
        pathRewrite: { "/mgnt/api/apiRouter/": "/api/" }
      }
    ]
  ],

  i18n: {
    locales: [
      { code: "en", iso: "en-US", file: "en.json" },
      { code: "ko", iso: "ko-KR", file: "ko.json" }
    ],
    defaultLocale: "ko",
    vueI18n: {
      fallbackLocale: "ko"
    },
    langDir: "locales/",
    vueI18nLoader: true
  },

  // custom loading bar
  loading: "~/components/common/functional/loader/loader.vue",

  // 미들웨어
  router: {
    extendRoutes(routes, resolves) {
      logger.info(
        "## NuxtLink 처리: 정적 리소스에 대한 html 파일 대응을 위해 아래와 같이 alias 경로를 변경 합니다."
      );
      routes.forEach((route) => {
        const alias =
          route.path.length > 1 ? `${route.path}/index.html` : "/index.html";
        route.alias = alias;
        logger.info(route.path + "---------------");
        for (var key in route) {
          logger.info("----" + key + " [" + route[key] + "]");
        }
      });
    },
    // 인증, 권한 추가
    middleware: ["auth"]
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

  publicRuntimeConfig: {
    API_ANALYSIS_PREFIX: process.env.API_ANALYSIS_PREFIX,
    API_BOARD_PREFIX: process.env.API_BOARD_PREFIX,
    API_USERS_PREFIX: process.env.API_USERS_PREFIX,
    API_META_PREFIX: process.env.API_META_PREFIX,
    API_ROUTER_PREFIX: process.env.API_ROUTER_PREFIX,
    USER_ACCESS_TOKEN_NAME: process.env.USER_ACCESS_TOKEN_NAME,
    ROUTE_USERS_PREFIX: process.env.ROUTE_USERS_PREFIX,
    USER_INDEX_PAGE: process.env.USER_INDEX_PAGE,
    USER_LOGIN_PAGE: process.env.USER_LOGIN_PAGE,
    API_ADMIN_USERS_PREFIX: process.env.API_ADMIN_USERS_PREFIX,
    API_ADMIN_META_PREFIX: process.env.API_ADMIN_META_PREFIX,
    ADMIN_INDEX_PAGE: process.env.ADMIN_INDEX_PAGE,
    ADMIN_LOGIN_PAGE: process.env.ADMIN_LOGIN_PAGE
  },

  storybook: {
    addons: ["@storybook/addon-actions", "@storybook/addon-controls"],
    stories: ["~/components/**/*.stories.js"],
    modules: {
      exclude: ["svg-sprite"]
    },
    // Run Storybook on localhost:4001
    port: 4002
  },

  server: {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
    listen: 82
  }
};
