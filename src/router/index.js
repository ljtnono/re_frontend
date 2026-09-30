import {createRouter, createWebHistory} from "vue-router";
import {useCommonStore} from "@/store";

const routes = [
  {
    path: "/",
    name: "Index",
    meta: {title: "首页"},
    component: () => import("@v/Index.vue")
  },
  {
    path: "/articles",
    name: "Articles",
    meta: {title: "博客"},
    component: () => import("@v/Articles.vue")
  },
  {
    path: "/article/:articleId",
    name: "Article",
    meta: {title: "文章详情"},
    component: () => import("@v/Article.vue"),
    props: true
  },
  {
    path: "/about",
    name: "About",
    meta: {title: "关于作者"},
    component: () => import("@v/About.vue")
  },
  {
    path: "/search",
    name: "Search",
    meta: {title: "搜索"},
    component: () => import("@v/Search.vue")
  },
  {
    path: "/500",
    name: "500",
    meta: {title: "服务器异常"},
    component: () => import("@v/error-page/500.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    meta: {title: "404"},
    component: () => import("@v/error-page/404.vue")
  }
];

const router = createRouter({
  history: createWebHistory("/"),
  routes
});

router.beforeEach((to, from, next) => {
  const commonStore = useCommonStore();
  commonStore.changeActiveRoute(to);
  next();
});

export default router;
