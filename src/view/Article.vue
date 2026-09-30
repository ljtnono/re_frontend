<template>
  <!-- 左侧悬浮文章大纲 -->
  <div class="catalog-card" v-show="catalogVisible" :style="{left: catalogLeft + 'px'}">
    <div class="catalog-title">
      <i class="fa fa-list-ul" />
      文章大纲
    </div>
    <div class="catalog-body">
      <MdCatalog editorId="article-preview" :scrollElement="scrollElement" />
    </div>
  </div>

  <!-- 文章详情部分 -->
  <div class="content-main" ref="contentMain">
    <div class="article-card">
      <!-- 文章标题 -->
      <h1 class="article-title">{{ article.title }}</h1>

      <!-- 文章详情头部 -->
      <header class="detail-header">
        <span class="meta-item">
          <i class="fa fa-list" />
          {{ article.category }}
        </span>
        <span class="meta-item">
          <i class="fa fa-user" />
          {{ article.author }}
        </span>
        <span class="meta-item">
          <i class="fa fa-calendar-times-o" />
          {{ formatTime(article.finalUpdateTime, "YYYY-MM-DD HH:mm:ss") }}
        </span>
        <span class="meta-item">
          <i class="fa fa-eye" />
          {{ article.view }} 浏览
        </span>
        <span class="meta-item">
          <i class="fa fa-comment" />
          {{ article.favorite }} 评论
        </span>
      </header>

      <!-- 文章内容部分（与后台编辑器同一渲染管线） -->
      <MdPreview v-if="article.markdownContent" class="detail-content" :modelValue="article.markdownContent"
                 editorId="article-preview" />

      <!-- 文章底部相关标签 -->
      <div class="detail-label" v-if="article.tagList && article.tagList.length">
        <i class="fa fa-tags" />
        <a class="tag-chip" href="javascript:" v-for="(tag, i) in article.tagList" :key="tag.id || i" @click="goTag(tag)">
          <span class="tag-hash">#</span>{{ tag.name }}
        </a>
      </div>
    </div>

    <!--留言区-->
    <div class="comment-card">
      <div class="comment-title">网友评论</div>
      <div id="comment" />
    </div>
  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import {MdCatalog, MdPreview} from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import {useRoute, useRouter} from "vue-router";
import Artalk from "artalk";
import "artalk/dist/Artalk.css";
import {findArticleById} from "@/api/article";
import {ARTALK_SERVER, ARTALK_SITE} from "@/constant/commonConstant";
import {formatTime} from "@/util/format";

const route = useRoute();
const router = useRouter();

function goTag(tag) {
  router.push({path: "/articles", query: {tagId: tag.id, tagName: tag.name}});
}

// 文章详情
const article = ref({
  id: null,
  title: null,
  summary: null,
  markdownContent: null,
  htmlContent: null,
  category: null,
  author: null,
  coverUrl: "",
  view: 0,
  favorite: 0,
  recommend: 0,
  top: 0,
  createType: 1,
  transportInfo: null,
  quoteInfo: null,
  finalUpdateTime: null,
  tagList: []
});

let artalkInstance = null;

// 左侧大纲卡片：定位到文章卡片左侧，屏幕宽度不足时隐藏
const contentMain = ref(null);
const catalogVisible = ref(false);
const catalogLeft = ref(0);
const scrollElement = "html";
const CATALOG_WIDTH = 250;
const CATALOG_GAP = 24;

function updateCatalogPosition() {
  let el = contentMain.value;
  if (!el) {
    return;
  }
  let cardLeft = el.getBoundingClientRect().left;
  let left = cardLeft - CATALOG_GAP - CATALOG_WIDTH;
  catalogVisible.value = left >= 16;
  catalogLeft.value = Math.max(left, 16);
}

// 初始化文章详情数据
function initArticleDetail(articleId) {
  findArticleById(articleId).then(res => {
    article.value = res.data.data;
  });
}

// 初始化评论系统
function initComment(articleId) {
  if (artalkInstance) {
    artalkInstance.destroy();
    artalkInstance = null;
  }
  artalkInstance = Artalk.init({
    el: "#comment",
    pageKey: articleId,
    pageTitle: document.title,
    server: ARTALK_SERVER,
    site: ARTALK_SITE
  });
}

onMounted(() => {
  let articleId = route.params.articleId;
  initArticleDetail(articleId);
  initComment(articleId);
  updateCatalogPosition();
  window.addEventListener("resize", updateCatalogPosition);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateCatalogPosition);
});

// 路由参数变化时重新加载（同组件复用）
watch(() => route.params.articleId, (articleId) => {
  if (articleId) {
    initArticleDetail(articleId);
    initComment(articleId);
  }
});

onBeforeUnmount(() => {
  if (artalkInstance) {
    artalkInstance.destroy();
    artalkInstance = null;
  }
});
</script>

<style scoped lang="scss">
// 左侧悬浮大纲卡片
.catalog-card {
  position: fixed;
  top: 90px;
  width: 250px;
  max-height: calc(100vh - 140px);
  background: var(--bg-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 10;

  .catalog-title {
    flex-shrink: 0;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    padding: 12px 16px;
    border-bottom: 1px solid var(--border-light);
    display: flex;
    align-items: center;
    gap: 6px;

    i.fa {
      color: var(--primary);
      font-size: 13px;
    }
  }

  .catalog-body {
    overflow-y: auto;
    padding: 8px 0;

    :deep(.md-editor-catalog-active) {
      > span {
        color: var(--primary);
        font-weight: 600;
      }

      border-left-color: var(--primary);
    }

    // 注意：:hover 必须写在 :deep() 参数内部，
    // 否则 Vue 会编译成 .catalog-body:hover 导致整列变色
    :deep(.md-editor-catalog-link:hover > span) {
      color: var(--primary);
    }
  }
}

.content-main {
  flex: 1;
  min-width: 0;
  max-width: 850px;

  .article-card {
    background: var(--bg-card);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    padding: 28px 30px 20px;
    margin-bottom: 14px;
  }

  .article-title {
    margin: 0 0 14px;
    font-size: 24px;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.4;
  }

  .detail-header {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 18px;
    padding-bottom: 14px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--border-light);

    .meta-item {
      font-size: 13px;
      color: var(--text-placeholder);
      display: inline-flex;
      align-items: center;
      gap: 5px;

      i.fa {
        color: var(--text-placeholder);
      }

      &:nth-of-type(1),
      &:nth-of-type(2) {
        color: var(--primary);
      }
    }
  }

  // 正文渲染样式（md-editor-v3 预览）
  .detail-content {
    font-size: 15px;
    // 关键：把 md-editor 内部的 z-index（如 code-head 的 10000）锁进本层叠上下文，
    // 让整个预览区域永远处于顶部导航（z-100）之下
    position: relative;
    z-index: 0;

    // 代码块头部吸顶条：博客页直接禁用吸顶，
    // 否则代码块滚出可视区时 sticky 元素会被容器顶上去，仍然会盖住顶部导航
    :deep(.md-editor-code-head) {
      position: relative;
      top: auto;
      z-index: auto;
    }

    :deep(.md-editor) {
      background: transparent;
      color: var(--text-regular);
      font-size: 15px;
    }

    :deep(.md-editor-preview-wrapper) {
      padding: 0;
    }

    :deep(.default-theme) {
      h1, h2, h3, h4, h5, h6 {
        color: var(--text-primary);
      }

      a {
        color: var(--primary);
      }

      img {
        border-radius: var(--radius-sm);
      }

      blockquote {
        color: var(--text-secondary);
        border-left-color: var(--primary);
        background: var(--bg-page);
      }

      table {
        th, td {
          border-color: var(--border);
        }

        th {
          background: var(--bg-page);
          color: var(--text-primary);
        }

        tr:nth-of-type(2n) {
          background: var(--bg-page);
        }
      }

      hr {
        border-top-color: var(--border);
      }

    }
  }

  .detail-label {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    padding-top: 16px;
    margin-top: 20px;
    border-top: 1px dashed var(--border-light);

    i.fa-tags {
      color: var(--text-placeholder);
      margin-right: 2px;
    }

    .tag-chip {
      display: inline-flex;
      align-items: center;
      padding: 4px 12px;
      font-size: 13px;
      line-height: 1.4;
      color: var(--text-regular);
      background: #f4f5f7;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      transition: all 0.2s ease;

      .tag-hash {
        margin-right: 3px;
        font-weight: 600;
        color: var(--primary);
      }

      &:hover {
        color: var(--primary);
        background: var(--primary-light);
        border-color: #c7d2fe;
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(99, 102, 241, 0.16);
      }
    }
  }

  .comment-card {
    background: var(--bg-card);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    padding: 20px 24px;
    margin-bottom: 14px;

    .comment-title {
      font-size: 15px;
      font-weight: 600;
      color: var(--text-primary);
      padding-bottom: 10px;
      margin-bottom: 14px;
      border-bottom: 1px solid var(--border-light);
      position: relative;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -1px;
        width: 32px;
        height: 2px;
        background: var(--primary);
        border-radius: 1px;
      }
    }
  }
}

@media screen and (min-width: 1200px) {
  .content-main {
    max-width: 850px;
  }
}
</style>
