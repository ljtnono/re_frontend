import Vue from 'vue'
import App from './App'
import axios from "axios";
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import router from "./router/router";
import store from "./store";
import config from "./config/config";
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import moment from "moment";
import mavonEditor from 'mavon-editor'
// 引入全局css
import animated from 'animate.css'
import 'mavon-editor/dist/css/index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "@a/css/style.min.css";

Vue.use(mavonEditor);
Vue.use(animated)
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VueRouter);
// 配置全局过滤器
Vue.filter("timeFormat", function (time) {
  return moment(time).format("YYYY-MM-DD");
});
// 全局注册config
Vue.prototype.$config = config;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
