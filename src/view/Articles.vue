<template>
  <div class="content-main">
    <!-- 文章列表 -->
    <div class="articles" v-loading="loading">
      <div class="empty" v-if="!loading && articles.length === 0">
        <i class="fa fa-inbox" />
        <p>暂无文章</p>
      </div>
      <ArticleItem :articleItem="article" v-for="article in articles" :key="article.id" />
    </div>

    <!-- 分页 -->
    <div class="pager" v-if="total > pageSize">
      <el-pagination
        background
        layout="prev, pager, next, total"
        :total="total"
        :page-size="pageSize"
        :current-page.sync="page"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import ArticleItem from "../components/ArticleItem";
import {findArticleList} from "@/api/article";

export default {
  name: "Articles",
  data() {
    return {
      loading: false,
      articles: [],
      total: 0,
      page: 1,
      pageSize: 10
    };
  },
  components: {
    ArticleItem
  },
  methods: {
    getArticleList() {
      this.loading = true;
      findArticleList(this.page, this.pageSize, "").then(res => {
        let data = res.data.data;
        this.articles = data.records || [];
        this.total = data.total || 0;
      }).finally(() => {
        this.loading = false;
      });
    },
    handlePageChange(page) {
      this.page = page;
      this.getArticleList();
      // 回到内容区顶部
      let content = document.querySelector(".content");
      if (content) {
        content.scrollIntoView({behavior: "smooth"});
      }
    }
  },
  mounted() {
    this.getArticleList();
  }
};
</script>

<style scoped lang="scss">
.content-main {
  flex: 1;
  min-width: 0;

  .articles {
    min-height: 600px;
  }

  .empty {
    padding: 120px 0;
    text-align: center;
    color: var(--text-placeholder);

    i.fa {
      font-size: 48px;
      margin-bottom: 12px;
    }

    p {
      margin: 0;
      font-size: 14px;
    }
  }

  .pager {
    display: flex;
    justify-content: center;
    padding: 20px 0 8px;
  }
}
</style>
