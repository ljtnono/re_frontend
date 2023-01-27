export default {
  namespaced: true,
  state: () => ({
    // 当前路由对象，每次路由改变时都会实时更改
    activeRoute: null,
    //########## 侧边栏相关数据 ##########//
    // 热门标签列表
    hotTagList: [],
    // 友情链接列表
    friendLinkList: []
  }),
  getters: {},
  mutations: {
    // 修改当前路由
    changeActiveRoute(state, activeRoute) {
      state.activeRoute = activeRoute;
    },
    // 修改热门标签列表
    changeHotTagList(state, hotTagList) {
      state.hotTagList = hotTagList;
    },
    // 修改友情链接列表
    changeFriendLinkList(state, friendLinkList) {
      state.friendLinkList = friendLinkList;
    }
  },
  actions: {},
  modules: {},
};
