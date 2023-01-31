import Vue from "vue";
import App from "./App";
import axios from "@/config/axiosConfig";
import VueAxios from "vue-axios";
import VueRouter from "vue-router";
import router from "./router";
import store from "./store";
import config from "./config/commonConfig";
import moment from "moment";
import mavonEditor from "mavon-editor";
import * as echarts from "echarts";
import ElementUI from "element-ui";
import vueToTop from "vue-totop";

// 引入全局css
import "mavon-editor/dist/css/index.css";
import "font-awesome/css/font-awesome.min.css";
import "@a/css/style.min.css";
import "element-ui/lib/theme-chalk/index.css";

Vue.prototype.$echarts = echarts;
Vue.use(mavonEditor);
Vue.use(VueAxios, axios);
Vue.use(VueRouter);
// 使用ElementUI
Vue.use(ElementUI);
Vue.use(vueToTop);

// 配置全局过滤器
Vue.filter("timeFormat", function (time) {
  return moment(time).format("YYYY-MM-DD");
});
// 全局注册config
Vue.prototype.$config = config;
// 解决vConsole报错
Vue.prototype.toJSON = () =>{}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
