export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

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
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~plugin/defaultPlugin.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/dotenv"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/proxy"],
  axios: {
    proxy: true
  },
  proxy: {
    "/dataPortal/api": {
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
    // extend (config, ctx) {
    //   // svgicon [BEGIN]
    //   const svgFilePath = path.join(__dirname, 'icons')
    //   const imageLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'))
    //   imageLoaderRule.test = /\.(png|jpe?g|gif|webp)$/
    //
    //   config.module.rules.push({
    //     test: /\.svg$/,
    //     include: [svgFilePath],
    //     use: [
    //       {
    //         loader: '@yzfe/svgicon-loader',
    //         options: {
    //           svgFilePath: [svgFilePath],
    //           svgoConfig: null // Custom svgo configuration
    //         }
    //       }
    //     ]
    //   })
    //
    //   // Recommended configuration transformAssetUrls
    //   const vueRule = config.module.rules.find(
    //     (rule) => rule.use ? rule.use.some(
    //       (use) => use.loader === 'vue-loader'
    //     ) : rule.loader === 'vue-loader'
    //   )
    //
    //   vueRule.options.transformAssetUrls = vueRule.options.transformAssetUrls || {}
    //
    //   vueRule.options.transformAssetUrls['icon'] = 'data'
    //
    //   // Recommended configuration alias
    //   config.resolve.alias['@icon'] = svgFilePath
    //   // svgicon [END]
    // },
  }
};
