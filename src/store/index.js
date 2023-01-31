import Vue from "vue";
import Vuex from "vuex";
import search from "@/store/search";
import category from "@/store/category";
import common from "@/store/common";
import VuexPersistence from "vuex-persist";
Vue.use(Vuex);

const SESSION_STORAGE_KEY = "state";

let vuexPersistence = new VuexPersistence({
  storage: window.sessionStorage,
  key: SESSION_STORAGE_KEY,
  supportCircular: true,
  modules: ["common", "search", "category"]
});

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    search,
    category,
    common
  },
  // 该插件默认把state里面的数据存储在sessionStorage里面
  plugins: [vuexPersistence.plugin]
});
