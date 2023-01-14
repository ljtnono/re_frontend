import Vue from "vue";
import Vuex from "vuex";
import search from "./module/search";
import web from "./module/web";
import blogType from "./module/blogType";
// import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    search,
    web,
    blogType,
  },
  // // 配置插件
  // plugins: [
  //   // 该插件默认把state里面的数据存储在localStorage里面
  //   createPersistedState({
  //     // 本地存储的key
  //     key: SESSION_STORAGE_KEY,
  //     // 指定需要存储的模块
  //     paths: ["systemSetting", "common", "user"],
  //     storage: window.sessionStorage
  //   })
  // ]
});
