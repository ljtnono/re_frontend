import Vue from "vue";
import Vuex from "vuex";
import search from "@/store/search";
import web from "@/store/web";
import category from "@/store/category";
import common from "@/store/common";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const SESSION_STORAGE_KEY = "state";
export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    search,
    web,
    category,
    common
  },
  // 配置插件
  plugins: [
    // 该插件默认把state里面的数据存储在localStorage里面
    createPersistedState({
      // 本地存储的key
      key: SESSION_STORAGE_KEY,
      // 指定需要存储的模块
      paths: ["search", "web", "category", "common"],
      storage: window.sessionStorage
    })
  ]
});
