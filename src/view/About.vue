<template>
  <!-- 关于作者 -->
  <div class="content-author">
    <div class="page-title">
      <i class="fa fa-info-circle" />
      关于作者
    </div>

    <!-- 每日鸡汤 -->
    <div class="soup-card">
      <div class="soup-decoration">
        <i class="fa fa-quote-left quote-icon" />
        <span class="soup-badge">每日一句</span>
      </div>
      <p class="soup-text">{{ todaySoup }}</p>
      <p class="soup-date">{{ todayStr }}</p>
    </div>

    <!-- 个人简介 -->
    <div class="about-card">
        <div class="card-title">个人简介</div>
      <div class="profile">
        <div class="avatar-wrap">
          <img class="avatar" :src="author.avatar || defaultAvatar" :alt="author.nickName" :title="author.nickName" @error="authorAvatarError = true" v-if="!authorAvatarError" />
          <img class="avatar" :src="defaultAvatar" :alt="author.nickName" :title="author.nickName" v-else />
        </div>
        <p class="nick-name">{{ author.nickName }}</p>
        <div class="tag-list" v-if="author.tagList && author.tagList.length > 0">
          <span class="tag-item" v-for="(tag, i) in author.tagList" :key="i">{{ tag }}</span>
        </div>
        <p class="about-line" v-for="(item, index) in author.about.split('\n')" :key="index">{{ item }}</p>

        <div class="stat-row">
          <div class="stat-item">
            <span class="stat-num">{{ siteDays }}</span>
            <span class="stat-label">天</span>
            <span class="stat-name">已运行</span>
          </div>
          <div class="stat-divider" />
          <div class="stat-item">
            <span class="stat-num">∞</span>
            <span class="stat-name">折腾热情</span>
          </div>
          <div class="stat-divider" />
          <div class="stat-item">
            <span class="stat-num">{{ todayIndex + 1 }}</span>
            <span class="stat-name">今日鸡汤序号</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 技能标签云 -->
    <div class="about-card">
      <div class="card-title">技能标签</div>
      <div class="skill-cloud">
        <span class="skill-item" v-for="(skill, i) in skillList" :key="i"
              :style="{ fontSize: skill.size + 'px', opacity: skill.opacity }">{{ skill.name }}</span>
      </div>
    </div>

    <!-- 与我联系 -->
    <div class="about-card">
      <div class="card-title">与我联系</div>
      <div class="contact-icons">
        <el-tooltip effect="dark" :content="websiteConfig.SEND_ME_EMAIL" placement="top">
          <a class="contact-icon mail" :href="websiteConfig.SEND_ME_EMAIL">
            <i class="fa fa-envelope-o" aria-hidden="true" />
          </a>
        </el-tooltip>
        <el-tooltip effect="dark" :content="author.github" placement="top">
          <a class="contact-icon github" :href="author.github">
            <i class="fa fa-github" aria-hidden="true" />
          </a>
        </el-tooltip>
        <el-tooltip effect="dark" :content="websiteConfig.RSS_URL" placement="top">
          <a class="contact-icon rss" :href="websiteConfig.RSS_URL">
            <i class="fa fa-rss" aria-hidden="true" />
          </a>
        </el-tooltip>
      </div>
      <span class="apply-btn">申请友链</span>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

import defaultAvatar from "@a/images/avatar.png";

// 建站日期
const SITE_BIRTHDAY = new Date("2019-10-20");

// 鸡汤语录池
const SOUP_LIST = [
  "种一棵树最好的时间是十年前，其次是现在。",
  "你走过的路，读过的书，爱过的人，都会成为你的一部分。",
  "代码写久了会发现，最难的不是解决问题，而是定义问题。",
  "凡是过往，皆为序章。",
  "保持热爱，奔赴山海。",
  "真正的平静，不是避开车马喧嚣，而是在心中修篱种菊。",
  "不是所有的坚持都有结果，但总有一些坚持，能从冰封的土地里开出花来。",
  "路虽远，行则将至；事虽难，做则必成。",
  "温柔半两，从容一生。",
  "今天翻的书，就是明天数的钱。",
  "愿所得皆所期，所失皆无碍。",
  "世上没有白走的路，每一步都算数。",
  "渔夫出海前并不知道鱼在哪儿，但还是选择了出发。",
  "无人问津的日子，正是登峰造极的好时机。",
  "把喜欢的事情做到极致，做给自己看，也做给怀疑自己的世界看。",
  "生活不止眼前的苟且，还有诗和远方的田野。",
  "最好的状态是未来可期。",
  "星光不问赶路人，时光不负有心人。",
];

// 技能标签云
const SKILLS = [
  {name: "Java", size: 20, opacity: 1},
  {name: "Spring Boot", size: 17, opacity: 0.95},
  {name: "Spring Cloud", size: 15, opacity: 0.9},
  {name: "Vue", size: 18, opacity: 1},
  {name: "MySQL", size: 16, opacity: 0.9},
  {name: "Redis", size: 14, opacity: 0.8},
  {name: "Linux", size: 16, opacity: 0.95},
  {name: "Docker", size: 14, opacity: 0.85},
  {name: "Kubernetes", size: 13, opacity: 0.75},
  {name: "Elasticsearch", size: 12, opacity: 0.7},
  {name: "Python", size: 13, opacity: 0.8},
  {name: "Git", size: 15, opacity: 0.9},
  {name: "Nginx", size: 13, opacity: 0.8},
  {name: "设计模式", size: 12, opacity: 0.7},
  {name: "JVM", size: 12, opacity: 0.75},
];

export default {
  name: "About",
  data() {
    return {
      defaultAvatar,
      authorAvatarError: false,
      skillList: SKILLS
    };
  },
  computed: {
    ...mapState({
      author: state => state.common.author,
      websiteConfig: state => state.common.websiteConfig
    }),
    // 一年中的第几天，作为每日鸡汤的随机种子
    todayIndex() {
      let now = new Date();
      let start = new Date(now.getFullYear(), 0, 0);
      return Math.floor((now - start) / 86400000) % SOUP_LIST.length;
    },
    todaySoup() {
      return SOUP_LIST[this.todayIndex];
    },
    todayStr() {
      let now = new Date();
      return `${now.getFullYear()} 年 ${now.getMonth() + 1} 月 ${now.getDate()} 日`;
    },
    siteDays() {
      return Math.max(1, Math.floor((new Date() - SITE_BIRTHDAY) / 86400000));
    }
  },
};
</script>

<style scoped lang="scss">
.content-author {
  flex: 1;
  min-width: 0;

  .page-title {
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

  // 每日鸡汤
  .soup-card {
    position: relative;
    background: linear-gradient(135deg, #eef2ff 0%, #f5f3ff 60%, #fdf4ff 100%);
    border: 1px solid #e0e7ff;
    border-radius: var(--radius-md);
    padding: 22px 24px 16px;
    margin-bottom: 14px;
    overflow: hidden;

    .soup-decoration {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;

      .quote-icon {
        font-size: 22px;
        color: var(--primary);
        opacity: 0.35;
      }

      .soup-badge {
        font-size: 11px;
        color: var(--primary);
        background: rgba(99, 102, 241, 0.1);
        border: 1px solid rgba(99, 102, 241, 0.25);
        padding: 2px 10px;
        border-radius: 999px;
      }
    }

    .soup-text {
      margin: 0 0 10px;
      font-size: 15px;
      line-height: 1.9;
      color: var(--text-primary);
      letter-spacing: 0.5px;
    }

    .soup-date {
      margin: 0;
      font-size: 12px;
      color: var(--text-placeholder);
      text-align: right;
    }
  }

  .about-card {
    background: var(--bg-card);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    padding: 24px;
    margin-bottom: 14px;
    position: relative;
    overflow: hidden;

    .card-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 20px;
      position: relative;
      padding-bottom: 8px;
      display: inline-block;
      z-index: 1;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 24px;
        height: 2px;
        background: var(--primary);
        border-radius: 1px;
      }
    }
  }

  .profile {
    text-align: center;
    position: relative;
    z-index: 1;

    .avatar-wrap {
      width: 110px;
      height: 110px;
      margin: 6px auto 14px;
      border-radius: 50%;
      padding: 4px;
      border: 3px solid #fff;
      box-shadow: var(--shadow-md);
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.04);

        .avatar {
          transform: scale(1.02);
        }
      }

      .avatar {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
    }

    .nick-name {
      font-size: 20px;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 12px;
    }

    .tag-list {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 18px;

      .tag-item {
        padding: 3px 12px;
        font-size: 12px;
        color: var(--primary);
        background: var(--primary-light);
        border-radius: 999px;
      }
    }

    .about-line {
      margin: 6px 0;
      font-size: 14px;
      line-height: 1.8;
      color: var(--text-regular);
    }

    // 统计行
    .stat-row {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 28px;
      margin-top: 22px;
      padding: 16px 0 4px;
      border-top: 1px dashed var(--border);

      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;

        .stat-num {
          font-size: 22px;
          font-weight: 700;
          color: var(--primary);
          line-height: 1.2;
        }

        .stat-label {
          display: none;
        }

        .stat-name {
          font-size: 12px;
          color: var(--text-placeholder);
        }
      }

      .stat-divider {
        width: 1px;
        height: 32px;
        background: var(--border);
      }
    }
  }

  // 技能标签云
  .skill-cloud {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 10px 18px;
    padding: 8px 0;

    .skill-item {
      color: var(--text-regular);
      cursor: default;
      transition: color 0.2s ease, transform 0.2s ease;

      &:hover {
        color: var(--primary);
        transform: translateY(-2px);
      }
    }
  }

  // 与我联系
  .contact-icons {
    display: flex;
    justify-content: center;
    gap: 24px;
    padding: 16px 0 8px;

    .contact-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      color: #fff;
      font-size: 24px;
      transition: transform 0.25s ease, box-shadow 0.25s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-md);
      }

      &.mail { background: #f56c6c; }
      &.github { background: #24292f; }
      &.rss { background: #ff7c49; }
    }
  }

  .apply-btn {
    display: block;
    width: 220px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    background: var(--primary);
    border-radius: var(--radius-md);
    margin: 18px auto 4px;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: var(--primary-dark);
    }
  }
}
</style>
