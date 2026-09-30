<template>
  <div class="article-item" @click="goDetail">
    <!-- 封面图 -->
    <div class="article-thumb">
      <img :src="articleItem.coverUrl" :alt="articleItem.title" />
      <span class="article-category">{{ articleItem.category }}</span>
    </div>
    <!-- 内容 -->
    <div class="article-content">
      <h3 class="article-title">{{ articleItem.title }}</h3>
      <p class="article-summary">{{ articleItem.summary }}</p>
      <div class="article-meta">
        <span class="meta-item">
          <i class="fa fa-user" aria-hidden="true" />
          {{ articleItem.author }}
        </span>
        <span class="meta-item">
          <i class="fa fa-clock-o" aria-hidden="true" />
          {{ formatTime(articleItem.modifyTime) }}
        </span>
        <span class="meta-item">
          <i class="fa fa-eye" aria-hidden="true" />
          {{ articleItem.view }}
        </span>
        <span class="meta-item">
          <i class="fa fa-comment" aria-hidden="true" />
          {{ articleItem.comment }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {formatTime} from "@/util/format";

const props = defineProps({
  articleItem: {
    type: Object,
    default: () => ({})
  }
});

const router = useRouter();

function goDetail() {
  router.push({path: "/article/" + props.articleItem.id});
}
</script>

<style scoped lang="scss">
.article-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  margin-bottom: 12px;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: box-shadow 0.25s ease, transform 0.25s ease;

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);

    .article-thumb img {
      transform: scale(1.05);
    }

    .article-title {
      color: var(--primary);
    }
  }

  .article-thumb {
    position: relative;
    flex-shrink: 0;
    width: 200px;
    height: 125px;
    border-radius: var(--radius-md);
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.3s ease;
    }

    .article-category {
      position: absolute;
      left: 0;
      top: 0;
      padding: 2px 10px;
      font-size: 12px;
      color: #fff;
      background: rgba(0, 0, 0, 0.55);
      border-radius: 0 0 10px 0;
    }
  }

  .article-content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;

    .article-title {
      margin: 0 0 8px;
      font-size: 17px;
      font-weight: 600;
      color: var(--text-primary);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: color 0.2s ease;
    }

    .article-summary {
      flex: 1;
      margin: 0 0 10px;
      font-size: 13px;
      line-height: 1.7;
      color: var(--text-secondary);
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .article-meta {
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 12px;
      color: var(--text-placeholder);

      .meta-item {
        display: flex;
        align-items: center;
        gap: 4px;

        i.fa {
          font-size: 12px;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .article-item {
    .article-thumb {
      width: 120px;
      height: 80px;
    }

    .article-content {
      .article-summary {
        -webkit-line-clamp: 2;
      }
    }
  }
}
</style>
