<template>
  <div class="content-main">
    <!-- 标签筛选条 -->
    <div class="filter-bar" v-if="tagName">
      <i class="fa fa-tag" />
      <span class="filter-label">标签</span>
      <span class="filter-keyword">{{ tagName }}</span>
      <span class="filter-count" v-if="!loading">共 {{ total }} 篇文章</span>
      <a href="javascript:" class="filter-clear" @click="clearTag"><i class="fa fa-times" /> 清除筛选</a>
    </div>

    <!-- 文章列表 -->
    <div class="articles" v-loading="loading">
      <div class="empty" v-if="!loading && articles.length === 0">
        <i class="fa fa-inbox" />
        <p v-if="tagName">暂无包含「{{ tagName }}」标签的文章</p>
        <p v-else>暂无文章</p>
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
import {useRoute, useRouter} from "vue-router";
import ArticleItem from "@c/ArticleItem.vue";
import {findArticleList} from "@/api/article";

const route = useRoute();
const router = useRouter();

const loading = ref(false);
const articles = ref([]);
const total = ref(0);
const page = ref(1);
const pageSize = ref(10);
const tagId = ref("");
const tagName = ref("");

function getArticleList() {
  loading.value = true;
  findArticleList(page.value, pageSize.value, "", tagId.value).then(res => {
    let data = res.data.data;
    articles.value = data.records || [];
    total.value = data.total || 0;
  }).finally(() => {
    loading.value = false;
  });
}

function handlePageChange(currentPage) {
  page.value = currentPage;
  getArticleList();
  // 回到内容区顶部
  let content = document.querySelector(".content");
  if (content) {
    content.scrollIntoView({behavior: "smooth"});
  }
}

function clearTag() {
  router.push("/articles");
}

function syncQuery() {
  tagId.value = route.query.tagId || "";
  tagName.value = route.query.tagName || "";
  page.value = 1;
  getArticleList();
}

watch(() => [route.query.tagId, route.query.tagName], syncQuery);

onMounted(() => {
  syncQuery();
});
</script>

<style scoped lang="scss">
.content-main {
  flex: 1;
  min-width: 0;

  .filter-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--bg-card);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    padding: 12px 18px;
    margin-bottom: 14px;
    font-size: 14px;

    i.fa-tag {
      color: var(--primary);
    }

    .filter-label {
      color: var(--text-secondary);
    }

    .filter-keyword {
      font-weight: 600;
      color: var(--primary);
      background: var(--primary-light);
      border-radius: var(--radius-sm);
      padding: 2px 10px;
    }

    .filter-count {
      color: var(--text-placeholder);
      font-size: 13px;
    }

    .filter-clear {
      margin-left: auto;
      color: var(--text-secondary);
      font-size: 13px;
      transition: color 0.2s;

      &:hover {
        color: var(--primary);
      }
    }
  }

  .articles {
    min-height: max(600px, calc(100vh - 420px));
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
