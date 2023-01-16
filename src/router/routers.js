export default [
  {
    path: "/",
    name: "Index",
    meta: {
      title: "首页",
      hideInMenu: true
    },
    component: () => import("@v/Index.vue")
  },
  {
    path: "/articles/:type",
    name: "Articles",
    meta: {
      title: "文章列表",
      hideInMenu: true
    },
    component: () => import("@v/Articles.vue")
  },
  {
    path: "/article/:blogId",
    name: "Article",
    meta: {
      title: "文章详情",
      hideInMenu: true
    },
    component: () => import("@v/Article.vue"),
    props: true
  },
  {
    path: "/support",
    name: "Support",
    meta: {
      title: "支持我",
      hideInMenu: true
    },
    component: () => import("@v/Support.vue")
  },
  {
    path: "/about",
    name: "About",
    meta: {
      title: "关于作者",
      hideInMenu: true
    },
    component: () => import("@v/About.vue")
  },
  {
    path: "/search",
    name: "Search",
    meta: {
      title: "搜索",
      hideInMenu: true
    },
    component: () => import("@v/Search.vue")
  },
  {
    path: "/401",
    name: "401",
    meta: {
      title: "没有权限",
      hideInMenu: true,
    },
    component: () => import("@v/error-page/401.vue")
  },
  {
    path: "/500",
    name: "500",
    meta: {
      title: "服务器异常",
      hideInMenu: true,
    },
    component: () => import("@v/error-page/500.vue")
  },
  {
    path: "*",
    name: "404",
    meta: {
      title: "404",
      hideInMenu: true,
    },
    component: () => import("@v/error-page/404.vue")
  },
];
