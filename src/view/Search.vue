<template>
  <!-- 内容区 -->
  <div class="content pr">
    <div class="content-main">
      <!-- 导航路径 -->
      <div class="nav-path mb15 mt15 p10">
        <i class="fa fa-home mr5" />
        <span>关键字</span>
        <i class="fa fa-angle-double-right mr5 ml5" />
        <span>{{ condition }}</span>
      </div>
      <!-- 文章列表项 -->
      <div class="articles">
        <Loading :show="articlesDefaultFlag" style="top: 20px;"></Loading>
        <div v-if="searchArticleList.length === 0 && !articlesDefaultFlag" style="height: 1000px;text-align: center;">
          <h1 class="f16">没有数据</h1>
        </div>
        <ArticleItem v-else :article="article" v-for="article in searchArticleList" :key="article.id"></ArticleItem>
      </div>
      <!-- 分页导航 -->
      <div class="mt-3" v-if="searchArticleList.length !== 0">
        <BPagination
          :total-rows="totalCount"
          :per-page="count"
          :value="page"
          first-text="首页"
          prev-text="上一页"
          next-text="下一页"
          last-text="尾页"
          limit="5"
          @change="loadData"
          align="center">
        </BPagination>
      </div>
    </div>
    <ContentSide />
  </div>
</template>

<script>
import ContentSide from "../components/ContentSide";
import ArticleItem from "../components/ArticleItem";
import {BPagination} from "bootstrap-vue";
import Loading from "../components/Loading";
import {mapState, mapActions} from "vuex";

export default {
  name: "Search",
  computed: {
    ...mapState({
      totalPages: state => state.search.totalPages,
      totalCount: state => state.search.totalCount,
      count: state => state.search.count,
      page: state => state.search.page,
      condition: state => state.search.condition,
      searchArticleList: state => state.search.searchArticleList,
      articlesDefaultFlag: state => state.search.articlesDefaultFlag
    })
  },
  methods: {
    ...mapActions([
      "loadData"
    ])
  },
  components: {
    ContentSide,
    ArticleItem,
    BPagination,
    Loading
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">

</style>
