export default {
  namespaced: true,
  state: () => ({
    activeRoute: null,
  }),
  getters: {},
  mutations: {
    // 修改当前路由
    changeActiveRoute(state, activeRoute) {
      state.activeRoute = activeRoute;
    },
  },
  actions: {},
  modules: {},
};
