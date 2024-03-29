import Router from "vue-router";
import routes from "./routers";
import state from "@/store";

// 特殊页面数组
const SPECIAL_PAGES = ["/404", "/500", "/401"];
// 解决重复点击路由报错的BUG
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
}
let router = new Router({
  routes,
  base: "/",
  mode: "history"
});

// 设置路由守卫
router.beforeEach((to, from, next) => {
  let toPath = to.path;
  let toName = to.name;
  state.commit("common/changeActiveRoute", to);


  // // 设置面包屑导航
  // let breadcrumbList = RouteUtil.getBreadcrumb(toName);
  // store.commit("systemSetting/changeBreadcrumbList", breadcrumbList);
  //
  // // 如果token存在，并且路由路径为/,那么直接跳转到工作台页面
  // if (toPath === "/" + ROUT_HOME_NAME) {
  //   next({ name: "Workspace" });
  // }
  // // 除了特殊页面之外，如果跳转到正常页面，需要校验token等信息是否存在
  // if (!SPECIAL_PAGES.includes(toPath)) {
  //   let userInfo = store.state.user.userInfo;
  //   let tokeInfo = store.state.user.tokenInfo;
  //   let menus = store.state.user.menus;
  //   if (menus && tokeInfo && userInfo) {
  //     next();
  //   } else {
  //     // 弹出错误消息
  //     ElementUI.Message.error({
  //       message: "用户未认证",
  //       duration: 2000,
  //       center: false
  //     });
  //     next({ name: "Login" });
  //   }
  // }

  next();
});

export default router;
