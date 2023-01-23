export default {
  namespaced: true,
  state: () => ({
    // 当前路由对象，每次路由改变时都会实时更改
    activeRoute: null,
    //
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
