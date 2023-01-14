import Router from "vue-router";
import Index from "../view/Index";
import Articles from "../view/Articles";
import Support from "../view/Support";
import About from "../view/About";
import Article from "../view/Article";
import Search from "../view/Search";

let routes = [
  {
    path: "/",
    name: "index",
    component: Index,
  },
  {
    path: "/articles/:type",
    name: "articles",
    component: Articles,
  },
  {
    path: "/article/:blogId",
    name: "article",
    component: Article,
    props: true,
  },
  {
    path: "/support",
    name: "support",
    component: Support,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/search",
    name: "search",
    component: Search,
  },
  {
    path: "/401",
    name: "error_401",
    meta: {
      hideInMenu: true,
    },
    component: () => import("@v/error-page/401.vue"),
  },
  {
    path: "/500",
    name: "error_500",
    meta: {
      hideInMenu: true,
    },
    component: () => import("@v/error-page/500.vue"),
  },
  {
    path: "*",
    name: "error_404",
    title: "404",
    meta: {
      hideInMenu: true,
    },
    component: () => import("@v/error-page/404.vue"),
  },
];

let router = new Router({
  mode: "history",
  base: "/",
  routes,
});

export default router;
