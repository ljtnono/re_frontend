<template>
  <!-- 内容区 -->
  <div class="content pr">
    <div class="content-main">
      <!-- 导航路径 -->
      <div class="nav-path mb15 mt15 p10">
        <i class="fa fa-home mr5"></i>
        <span>技术文章</span>
        <i class="fa fa-angle-double-right mr5 ml5"></i>
        <span>{{ type }}</span>
      </div>
      <!-- 文章列表项 -->
      <div class="articles">
        <Loading :show="articlesDefaultFlag" style="top: 20px;"></Loading>
        <div v-if="articles.length === 0 && !articlesDefaultFlag" style="height: 1000px;text-align: center;">
          <h1 class="f16">没有数据</h1>
        </div>
        <ArticleItem
          v-else
          :article="article" v-for="article in articles" :key="article.id">
        </ArticleItem>
      </div>
      <!-- 分页导航 -->
      <div class="mt-3" v-if="articles.length !== 0">
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
    <ContentSide></ContentSide>
  </div>
</template>

<script>
import {listBlogPageByType} from "../api/blog";
import ContentSide from "../components/ContentSide";
import ArticleItem from "../components/ArticleItem";
import Loading from "../components/Loading";
import {BPagination} from 'bootstrap-vue';

export default {
  name: "Articles",
  data() {
    return {
      articlesDefaultFlag: true,
      articles: [],
      totalPages: 1,
      totalCount: 1,
      count: 10,
      page: 1,
      type: "ALL"
    }
  },
  methods: {
    loadData(page) {
      let pageParam = {
        page: page,
        count: this.count
      };
      this.articles = [];
      this.listBlogPageByType(this.type, pageParam);
    },
    listBlogPageByType(type, pageParam) {
      this.articlesDefaultFlag = true;
      listBlogPageByType(type, pageParam).then(res => {
        if (res.data.request === "success" && res.data.status === 200) {
          let data = res.data.data;
          this.articles = data;
          this.page = pageParam.page;
          this.count = pageParam.count;
          this.totalPages = parseInt(res.data.fields.totalPages);
          this.totalCount = parseInt(res.data.fields.totalCount);
        }
        this.articlesDefaultFlag = false;
      }).catch(() => {
        this.articlesDefaultFlag = false;
      });
    }
  },
  mounted() {
    let pageParam = {
      page: 1,
      count: this.count
    };
    this.type = this.$route.params.type || "ALL";
    this.listBlogPageByType(this.type, pageParam);
  },
  components: {
    ContentSide,
    ArticleItem,
    BPagination,
    Loading
  }
}
</script>

<style scoped lang="scss">

</style>
