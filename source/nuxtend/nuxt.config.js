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
    dir: "../src/main/resources/static"
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
    "@/plugins/persisted-state.client.js",
    "@/plugins/lodash.js",
    "@/plugins/users/common.js"
  ],

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
    profile: "risky" //  속도 가장 빠름, 에러에 대해서 pass 같음.
    // profile: 'experimental' // default
    // profile: 'safe'
    // profile: false
  },

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
    },

    // build, generate 속도 향샹
    // thread-loader 를 사용한다.
    // thread-loader 는 워커풀을 가능하게 한다.
    // 일정한 thread 개수를 미리 만들어두어 처리 속도를 빠르게 한다.
    parallel: true,
    cache: false,
    // 캐시의 성능을 더 높이기 위해 hardSourceWebpackPlugin 을 사용한다.
    // ERROR  [hardsource:bb467e33] Could not freeze ./.nuxt/router.js:
    // Cannot read property 'hash' of undefined
    // 만약 위와 같은 오류가 뜬다면 node_modules/.cache/hard-source 폴더를
    // 삭제했다가 다시 빌드하면 된다.
    hardSource: true
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
    baseURL: process.env.API_GW_URL,
    // baseURL: process.env.API_REMOTE_URL,
    // proxy: false,
    // baseURL: process.env.SERVER_HOST + ":" + process.env.SERVER_PORT,
    proxy: false
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

  publicRuntimeConfig: {
    API_USERS_PREFIX: process.env.API_USERS_PREFIX,
    API_META_PREFIX: process.env.API_META_PREFIX,
    USER_ACCESS_TOKEN_NAME: process.env.USER_ACCESS_TOKEN_NAME,
    USER_INDEX_PAGE: process.env.USER_INDEX_PAGE,
    USER_LOGIN_PAGE: process.env.USER_LOGIN_PAGE,
    API_ADMIN_USERS_PREFIX: process.env.API_ADMIN_USERS_PREFIX,
    API_ADMIN_META_PREFIX: process.env.API_ADMIN_META_PREFIX,
    ADMIN_ACCESS_TOKEN_NAME: process.env.ADMIN_ACCESS_TOKEN_NAME,
    ADMIN_INDEX_PAGE: process.env.ADMIN_INDEX_PAGE,
    ADMIN_LOGIN_PAGE: process.env.ADMIN_LOGIN_PAGE
  },

  storybook: {
    addons: ["@storybook/addon-actions", "@storybook/addon-controls"],
    modules: {
      exclude: ["svg-sprite"]
    }
  },

  proxy: {
    "/api/user/": {
      target: process.env.API_USER_URL
      // api-router 사용
    }
  },

  server: {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
    listen: 82
  },

  // 라우터 타면 여길로 들어옴.
  // 미들웨어에 인증, 권한 추가
  router: {
    middleware: ["auth"],
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
