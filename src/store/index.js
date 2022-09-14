import Vue from "vue"
import Vuex from "vuex"
import search from "./module/search"
import web from "./module/web"
import blogType from "./module/blogType"
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
    blogType
  },
  // plugins: [createPersistedState()]
});
