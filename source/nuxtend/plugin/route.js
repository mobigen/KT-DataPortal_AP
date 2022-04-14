// import store from "@/store/app";

export default ({ app }) => {
  // Every time the route changes (fired on initialization too)
  app.router.afterEach(() => {
    // console.log(app)
    app.store.dispatch("common/setDevJsonReset");
  });
};
