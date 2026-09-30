<template>
  <aside class="content-side">
    <!-- 博主信息 -->
    <div class="side-card author-card">
      <div class="author-header">
        <img class="author-avatar" :src="author.avatar || defaultAvatar" :alt="author.nickName" @error="authorAvatarError = true" v-if="!authorAvatarError" />
        <img class="author-avatar" :src="defaultAvatar" :alt="author.nickName" v-else />
        <div class="author-name">{{ author.nickName }}</div>
        <div class="author-tags">
          <span class="author-tag" v-for="(tag, i) in author.tagList.slice(0, 3)" :key="i">{{ tag }}</span>
        </div>
      </div>
      <div class="author-detail">
        <p><i class="fa fa-briefcase" />{{ author.job }}</p>
        <p><i class="fa fa-map-marker" />{{ author.addr }}</p>
        <p><i class="fa fa-envelope" />{{ author.email }}</p>
      </div>
      <!-- 社交链接 -->
      <div class="social">
        <el-tooltip effect="dark" :content="author.wechat" placement="top">
          <a href="javascript:" class="social-item wechat"><i class="fa fa-wechat" /></a>
        </el-tooltip>
        <el-tooltip effect="dark" :content="author.qq" placement="top">
          <a href="javascript:" class="social-item qq"><i class="fa fa-qq" /></a>
        </el-tooltip>
        <el-tooltip effect="dark" :content="author.githubUsername" placement="top">
          <a :href="author.github" target="_blank" class="social-item github"><i class="fa fa-github" /></a>
        </el-tooltip>
        <el-tooltip effect="dark" :content="websiteConfig.RSS_URL" placement="top">
          <a href="javascript:" class="social-item rss"><i class="fa fa-rss" /></a>
        </el-tooltip>
      </div>
    </div>

    <!-- 热门标签 -->
    <div class="side-card">
      <div class="side-title">热门标签</div>
      <div class="tag-list">
        <a href="javascript:" class="tag-item" v-for="tag in hotTagList" :key="tag.id">
          {{ tag.name }}
          <span class="tag-count">{{ tag.articleCount }}</span>
        </a>
      </div>
    </div>

    <!-- 友情链接 -->
    <div class="side-card">
      <div class="side-title">友情链接</div>
      <div class="link-list">
        <a :href="link.url" target="_blank" class="link-item" v-for="link in friendLinkList" :key="link.url">
          <i class="fa fa-link" />
          {{ link.name }}
        </a>
      </div>
    </div>
  </aside>
</template>

<script>
import {mapState} from "vuex";

import defaultAvatar from "@a/images/avatar.png";

export default {
  name: "ContentSide",
  data() {
    return { defaultAvatar, authorAvatarError: false };
  },
  computed: {
    ...mapState({
      hotTagList: state => state.common.hotTagList,
      author: state => state.common.author,
      friendLinkList: state => state.common.friendLinkList,
      websiteConfig: state => state.common.websiteConfig
    })
  },
};
</script>

<style scoped lang="scss">
.content-side {
  width: 300px;
  flex-shrink: 0;
  display: none;

  .side-card {
    background: var(--bg-card);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    padding: 18px;
    margin-bottom: 14px;
  }

  .side-title {
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

  // 博主信息卡
  .author-card {
    text-align: center;

    .author-header {
      .author-avatar {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid var(--primary-light);
      }

      .author-name {
        margin-top: 10px;
        font-size: 16px;
        font-weight: 600;
        color: var(--text-primary);
      }

      .author-tags {
        margin-top: 8px;
        display: flex;
        justify-content: center;
        gap: 6px;

        .author-tag {
          padding: 2px 10px;
          font-size: 12px;
          color: var(--primary);
          background: var(--primary-light);
          border-radius: 10px;
        }
      }
    }

    .author-detail {
      margin-top: 14px;
      text-align: left;

      p {
        margin: 6px 0;
        font-size: 13px;
        color: var(--text-secondary);
        display: flex;
        align-items: center;
        gap: 8px;

        i.fa {
          width: 14px;
          text-align: center;
          color: var(--text-placeholder);
        }
      }
    }

    .social {
      margin-top: 14px;
      padding-top: 14px;
      border-top: 1px solid var(--border-light);
      display: flex;
      justify-content: center;
      gap: 12px;

      .social-item {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        color: #fff;
        font-size: 16px;
        transition: transform 0.2s ease, opacity 0.2s ease;

        &:hover {
          transform: translateY(-2px);
          opacity: 0.85;
        }

        &.wechat { background: #07c160; }
        &.qq { background: #12b7f5; }
        &.github { background: #24292f; }
        &.rss { background: #ff7c49; }
      }
    }
  }

  // 标签
  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .tag-item {
      padding: 4px 12px;
      font-size: 13px;
      color: var(--text-regular);
      background: #f4f5f7;
      border: 1px solid var(--border);
      border-radius: 999px;
      transition: all 0.2s ease;

      &:hover {
        color: var(--primary);
        background: var(--primary-light);
        border-color: #c7d2fe;
      }

      .tag-count {
        margin-left: 4px;
        font-size: 12px;
        color: var(--text-placeholder);
      }
    }
  }

  // 友链
  .link-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;

    .link-item {
      padding: 8px 10px;
      font-size: 13px;
      color: var(--text-regular);
      background: #f4f5f7;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      i.fa {
        font-size: 11px;
        color: var(--text-placeholder);
      }

      &:hover {
        color: var(--primary);
        background: var(--primary-light);
        border-color: #c7d2fe;
      }
    }
  }
}

@media screen and (min-width: 1200px) {
  .content-side {
    display: block;
  }
}
</style>
