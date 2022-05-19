export default ({ app }) => {
  // Every time the route changes (fired on initialization too)
  app.router.afterEach(() => {
    app.store.dispatch("defaults/common/setDevJsonReset");
  });
};
