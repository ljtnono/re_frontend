<template>
  <!-- footer部分 -->
  <footer id="footer">
    <div class="footer-main">
      <!-- 关于本站 -->
      <div class="footer-item footer-about">
        <div class="item-title">关于本站</div>
        <div class="about-body">
          <img class="about-avatar" :src="author.avatar || defaultAvatar" :alt="author.nickName" @error="authorAvatarError = true" v-if="!authorAvatarError" />
          <img class="about-avatar" :src="defaultAvatar" :alt="author.nickName" v-else />
          <p class="about-text">{{ websiteConfig.FOOTER_ABOUT_WEBSITE }}</p>
        </div>
        <a v-if="websiteConfig.GITHUB_WEBSITE" class="about-github" :href="websiteConfig.GITHUB_WEBSITE" target="_blank">
          <i class="fa fa-github" />
          GitHub 仓库
        </a>
      </div>

      <!-- 版权声明 -->
      <div class="footer-item">
        <div class="item-title">版权声明</div>
        <p class="copyright-text">{{ websiteConfig.FOOTER_COPYRIGHT }}</p>
        <p class="copyright-sub">
          基于 JAVA 构建 · 2019-10-20 至 {{ new Date() | timeFormat("YYYY-MM-DD") }}
        </p>
      </div>

      <!-- 订阅本站 -->
      <div class="footer-item">
        <div class="item-title">订阅本站</div>
        <p class="subscribe-tip">输入邮箱，获取最新文章推送</p>
        <div class="subscribe-box">
          <input type="email" placeholder="your@email.com" />
          <button>
            <i class="fa fa-rss" />
            订阅
          </button>
        </div>
        <div class="wechat-qr" v-if="author.wechatQrCodeUrl">
          <img :src="author.wechatQrCodeUrl" alt="站长微信" />
          <span>扫码加我微信</span>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <div class="footer-bar-inner">
        <span>
          <i class="fa fa-copyright" />
          {{ author.nickName }} · 版权所有
        </span>
        <span class="divider">|</span>
        <span>参考 <a href="https://gitcafe.net/" target="_blank">GitCafe</a> 与 <a href="https://yusi123.com/" target="_blank">欲思主题</a> 创建</span>
        <span class="divider">|</span>
        <a href="javascript:">{{ websiteConfig.WEBSITE_ICP_CODE }}</a>
      </div>
    </div>
  </footer>
</template>

<script>
import {mapState} from "vuex";

import defaultAvatar from "@a/images/avatar.png";

export default {
  name: "Footer",
  data() {
    return { defaultAvatar, authorAvatarError: false };
  },
  computed: {
    ...mapState({
      websiteConfig: state => state.common.websiteConfig,
      author: state => state.common.author
    })
  },
};
</script>

<style scoped lang="scss">
#footer {
  margin-top: 30px;
  background: var(--bg-card);
  border-top: 1px solid var(--border);
  font-size: 13px;
  color: var(--text-secondary);
}

.footer-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 36px 20px 28px;
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 40px;

  .footer-item {
    min-width: 0;
  }

  .item-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 16px;
    position: relative;
    padding-bottom: 8px;

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

  // 关于本站
  .footer-about {
    .about-body {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 12px;
    }

    .about-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
    }

    .about-text {
      margin: 0;
      line-height: 1.7;
      color: var(--text-regular);
    }

    .about-github {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: var(--text-regular);
      padding: 5px 12px;
      border: 1px solid var(--border);
      border-radius: 999px;
      transition: all 0.2s ease;

      &:hover {
        color: var(--primary);
        border-color: #c7d2fe;
        background: var(--primary-light);
      }
    }
  }

  // 版权声明
  .copyright-text {
    margin: 0 0 8px;
    line-height: 1.7;
    color: var(--text-regular);
  }

  .copyright-sub {
    margin: 0;
    font-size: 12px;
    color: var(--text-placeholder);
  }

  // 订阅
  .subscribe-tip {
    margin: 0 0 10px;
    color: var(--text-regular);
  }

  .subscribe-box {
    display: flex;
    gap: 8px;

    input {
      flex: 1;
      min-width: 0;
      height: 34px;
      padding: 0 12px;
      font-size: 13px;
      color: var(--text-primary);
      background: var(--bg-page);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      outline: none;
      transition: border-color 0.2s ease;

      &:focus {
        border-color: var(--primary);
      }

      &::placeholder {
        color: var(--text-placeholder);
      }
    }

    button {
      height: 34px;
      padding: 0 14px;
      font-size: 13px;
      color: #fff;
      background: var(--primary);
      border: none;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: background 0.2s ease;

      &:hover {
        background: var(--primary-dark);
      }
    }
  }

  .wechat-qr {
    margin-top: 14px;
    display: flex;
    align-items: center;
    gap: 10px;

    img {
      width: 72px;
      height: 72px;
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      object-fit: cover;
    }

    span {
      font-size: 12px;
      color: var(--text-placeholder);
    }
  }
}

.footer-bar {
  border-top: 1px solid var(--border-light);
  padding: 14px 20px;

  .footer-bar-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 12px;
    color: var(--text-placeholder);

    a {
      color: var(--text-secondary);

      &:hover {
        color: var(--primary);
      }
    }

    .divider {
      color: var(--border);
    }
  }
}

@media screen and (max-width: 768px) {
  .footer-main {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
</style>
