<template>
  <!-- 内容区 -->
  <div class="content-main">
    <!-- 搜索关键字 -->
    <div class="search-bar">
      <i class="fa fa-search" />
      <span class="search-label">关键字</span>
      <span class="search-keyword">{{ condition }}</span>
      <span class="search-count" v-if="!loading">共 {{ total }} 条结果</span>
    </div>

    <!-- 文章列表项 -->
    <div class="articles" v-loading="loading">
      <div class="empty" v-if="!loading && articles.length === 0">
        <i class="fa fa-inbox" />
        <p>没有找到与「{{ condition }}」相关的文章</p>
      </div>
      <ArticleItem :articleItem="article" v-for="article in articles" :key="article.id" />
    </div>

    <!-- 分页 -->
    <div class="pager" v-if="total > 0">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="page"
        @current-change="handlePageChange"
      />
      <span class="pager-total">共 {{ total }} 条</span>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import ArticleItem from "@c/ArticleItem.vue";
import {findArticleSearch} from "@/api/article";

const route = useRoute();

const loading = ref(false);
const articles = ref([]);
const total = ref(0);
const page = ref(1);
const pageSize = ref(10);
const condition = ref("");

function getSearchList() {
  if (!condition.value) {
    articles.value = [];
    total.value = 0;
    return;
  }
  loading.value = true;
  findArticleSearch(condition.value, page.value, pageSize.value).then(res => {
    let data = res.data.data;
    articles.value = data.records || [];
    total.value = data.total || 0;
  }).finally(() => {
    loading.value = false;
  });
}

function handlePageChange(currentPage) {
  page.value = currentPage;
  getSearchList();
  let content = document.querySelector(".content");
  if (content) {
    content.scrollIntoView({behavior: "smooth"});
  }
}

onMounted(() => {
  condition.value = route.query.q || "";
  getSearchList();
});

// 关键字变化时重新搜索（同组件复用）
watch(() => route.query.q, (q) => {
  condition.value = q || "";
  page.value = 1;
  getSearchList();
});
</script>

<style scoped lang="scss">
.content-main {
  flex: 1;
  min-width: 0;

  .search-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--bg-card);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    padding: 12px 18px;
    margin-bottom: 14px;
    font-size: 14px;

    i.fa-search {
      color: var(--primary);
    }

    .search-label {
      color: var(--text-secondary);
    }

    .search-keyword {
      color: var(--primary);
      font-weight: 600;
    }

    .search-count {
      margin-left: auto;
      font-size: 12px;
      color: var(--text-placeholder);
    }
  }

  .articles {
    min-height: max(400px, calc(100vh - 420px));
  }

  .empty {
    padding: 100px 0;
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
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 20px 0 8px;

    .pager-total {
      font-size: 13px;
      color: var(--text-secondary);
    }
  }
}
</style>
