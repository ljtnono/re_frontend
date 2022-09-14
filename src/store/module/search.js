import Vue from "vue"
import Vuex from "vuex"
import {searchEsPageByCondition} from "../../api/blog";

Vue.use(Vuex);

export default {
  state: {
    condition: "",
    totalPages: 1,
    totalCount: 1,
    count: 10,
    page: 1,
    searchArticleList: [],
    articlesDefaultFlag: false
  },
  mutations: {
    setCondition(state, condition) {
      state.condition = condition;
    },
    setSearchArticleList(state, list) {
      state.searchArticleList = list;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
    setTotalCount(state, totalCount) {
      state.totalCount = totalCount;
    },
    setPage(state, page) {
      state.page = page;
    },
    setCount(state, count) {
      state.count = count;
    },
    setArticlesDefaultFlag(state, flag) {
      state.articlesDefaultFlag = flag;
    }
  },
  actions: {
    searchEsPageByCondition({commit}, {condition, pageParam}) {
      commit("setArticlesDefaultFlag", true);
      searchEsPageByCondition(condition, pageParam).then(res => {
        if (res.data.request === "success" && res.data.status === 200) {
          let data = res.data;
          commit("setCondition", condition);
          commit("setSearchArticleList", res.data.data);
          commit("setTotalPages", data.fields.totalPages);
          commit("setTotalCount", data.fields.totalCount);
          commit("setPage", pageParam.page);
          commit("setCount", pageParam.count);
        }
        commit("setArticlesDefaultFlag", false);
      }).catch(e => {
        console.log(e);
        commit("setArticlesDefaultFlag", false);
      });
    },
    loadData({dispatch, state}, page) {
      let pageParam = {
        page: page,
        count: state.count
      };
      let condition = state.condition;
      dispatch("searchEsPageByCondition", {condition, pageParam})
    }
  }
};
