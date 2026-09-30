<template>
  <div class="content-main">
    <!-- 置顶文章 -->
    <div class="top-card" v-if="topArticleList.length > 0">
      <div class="side-title">
        <i class="fa fa-thumb-tack" aria-hidden="true" />
        置顶文章
      </div>
      <div class="top-list">
        <div class="top-item" v-for="(article, index) in topArticleList" :key="article.id"
             @click="router.push({path: '/article/' + article.id})">
          <span class="top-rank" :class="'rank-' + (index + 1)">{{ index + 1 }}</span>
          <span class="top-title">{{ article.title }}</span>
          <span class="top-meta">
            <span class="top-favorite"><i class="fa fa-heart" />{{ article.favorite }}</span>
            <span class="top-view"><i class="fa fa-eye" />{{ article.view }}</span>
          </span>
        </div>
      </div>
    </div>

    <!-- 文章列表 -->
    <div class="articles">
      <ArticleItem :articleItem="article" v-for="article of scrollArticleList" :key="article.id" />
      <!-- 加载更多触发点 -->
      <div class="scroll-trigger" ref="scrollTrigger" />
      <div class="load-end" v-if="scrollArticleTotal !== null && scrollArticleList.length >= scrollArticleTotal">
        <span class="end-line" />
        已经到底啦
        <span class="end-line" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import ArticleItem from "@c/ArticleItem.vue";
import {findArticleScroll, findArticleTopList} from "@/api/article";

const router = useRouter();

// 置顶文章
const topArticleList = ref([]);

// 无限滚动文章
const scrollArticlePageNum = ref(1);
const scrollArticlePageSize = ref(10);
const scrollArticleTotal = ref(null);
const scrollArticleList = ref([]);
const scrollLoading = ref(false);
const scrollTrigger = ref(null);

function unique(arr, key) {
  let map = new Map();
  arr.forEach((item) => {
    if (!map.has(item[key])) {
      map.set(item[key], item);
    }
  });
  return [...map.values()];
}

function getTopArticleList() {
  findArticleTopList(1, 10).then(res => {
    topArticleList.value = res.data.data.records || [];
  });
}

function initScrollData() {
  scrollArticleTotal.value = null;
  scrollArticlePageNum.value = 1;
  scrollArticlePageSize.value = 10;
  scrollArticleList.value = [];
}

function getArticleScroll() {
  if (scrollLoading.value) {
    return;
  }
  let total = scrollArticleTotal.value;
  let length = scrollArticleList.value.length;
  if (total !== null && length >= total) {
    return;
  }
  scrollLoading.value = true;
  findArticleScroll(scrollArticlePageNum.value, scrollArticlePageSize.value).then(res => {
    let data = res.data.data;
    scrollArticleList.value = unique([...scrollArticleList.value, ...data.records], "id");
    scrollArticlePageSize.value = data.size;
    scrollArticlePageNum.value = data.current + 1;
    scrollArticleTotal.value = data.total;
  }).finally(() => {
    scrollLoading.value = false;
  });
}

// 滚动接近底部时加载下一页
function onWindowScroll() {
  let el = scrollTrigger.value;
  if (!el) {
    return;
  }
  let rect = el.getBoundingClientRect();
  if (rect.top <= window.innerHeight + 100) {
    getArticleScroll();
  }
}

onMounted(() => {
  getTopArticleList();
  initScrollData();
  getArticleScroll();
  window.addEventListener("scroll", onWindowScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onWindowScroll);
});
</script>

<style scoped lang="scss">
.content-main {
  flex: 1;
  min-width: 0;

  .side-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-primary);
    padding-bottom: 10px;
    margin-bottom: 14px;
    border-bottom: 1px solid var(--border-light);
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;

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

    i.fa {
      color: var(--primary);
      font-size: 14px;
    }
  }

  // 置顶文章
  .top-card {
    display: none;
    background: var(--bg-card);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    padding: 18px;
    margin-bottom: 14px;

    .top-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 24px;

      .top-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 0;
        cursor: pointer;
        border-bottom: 1px dashed var(--border-light);
        font-size: 14px;

        &:nth-last-child(-n + 2) {
          border-bottom: none;
        }

        &:hover .top-title {
          color: var(--primary);
        }

        .top-rank {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          font-size: 12px;
          color: var(--text-secondary);
          background: var(--border-light);
          border-radius: var(--radius-sm);

          &.rank-1 { color: #fff; background: #f53f3f; }
          &.rank-2 { color: #fff; background: #ff7d00; }
          &.rank-3 { color: #fff; background: #ffb400; }
        }

        .top-title {
          flex: 1;
          min-width: 0;
          color: var(--text-regular);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          transition: color 0.2s ease;
        }

        .top-meta {
          flex-shrink: 0;
          display: flex;
          gap: 12px;
          font-size: 12px;
          color: var(--text-placeholder);

          .top-favorite i.fa { color: #f53f3f; margin-right: 3px; }
          .top-view i.fa { margin-right: 3px; }
        }
      }
    }
  }

  // 文章列表
  .articles {
    .load-end {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 24px 0;
      font-size: 13px;
      color: var(--text-placeholder);

      .end-line {
        width: 60px;
        height: 1px;
        background: var(--border);
      }
    }
  }
}

@media screen and (min-width: 1200px) {
  .content-main {
    .top-card {
      display: block;
    }
  }
}
</style>
