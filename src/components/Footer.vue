<template>
  <div>
    <!-- 回到顶部 -->
    <vueToTop style="z-index: 10000"
              type=4
              size=50
              color="#2189AE"
              bottom=100
              top=0>
    </vueToTop>
    <!-- footer部分 -->
    <footer id="footer" class="mt30 pr">
      <div class="footer-main flex flex-direction-row pr">
        <div class="footer-main-item">
          <header class="item-title">
            <a href="javascript:">版权声明</a>
          </header>
          <p class="mt20" style="text-align: left">
            {{ footerCopyRight }}
          </p>
        </div>
        <div class="footer-main-item">
          <header class="item-title">
            <a href="javascript:">网站驱动</a>
          </header>
          <div class="logo-container mt20 flex flex-direction-column">
            <div class="logo-container-row flex flex-direction-row">
              <img :src="footerHuaweiCloudImage" alt="华为云"><br>
              <img :src="footerAliCloudImage" alt="阿里云"><br>
            </div>
            <div class="logo-container-row flex flex-direction-row">
              <img :src="footerMysqlImage" alt="mysql"><br>
              <img :src="footerRedisImage" alt="redis"><br>
            </div>
            <div class="logo-container-row flex flex-direction-row">
              <img :src="footerNginxImage" alt="nginx"><br>
              <img :src="footerTomcatImage" alt="tomcat"><br>
            </div>
          </div>
        </div>
        <div class="footer-main-item">
          <header class="item-title">
            <a href="javascript:">站长微信</a>
          </header>
          <div class="site-wechat mt20">
            <img :src="authorWxQrcodeUrl" alt="加我微信">
          </div>
        </div>
        <div class="footer-main-item">
          <header class="item-title">
            <a href="javascript:">关于本站</a>
          </header>
          <div class="site-rss mt20">
            <div class="site-rss-info flex flex-direction-row flex-justify-content-space-between">
              <img :src="authorAvatar" :alt="authorNickName" :title="authorNickName">
              <p style="width:120px; text-align: left;">
                {{ footerAboutWebsite }}
              </p>
            </div>
            <div class="site-rss-email mt20 flex flex-direction-row flex-justify-content-space-between">
              <input type="email" placeholder="输入邮箱订阅本站"/>
              <button><i class="fa fa-rss"/>订阅</button>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-info"
           style="border-top: 1px solid #03A9F4;background-image: url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAUAAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgICAgICAgICAgMCAgIDBAMCAgMEBQQEBAQEBQYFBQUFBQUGBgcHCAcHBgkJCgoJCQwMDAwMDAwMDAwMDAwMDAEDAwMFBAUJBgYJDQsJCw0PDg4ODg8PDAwMDAwPDwwMDAwMDA8MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAAgAKAwERAAIRAQMRAf/EAEwAAQEAAAAAAAAAAAAAAAAAAAAJAQEAAAAAAAAAAAAAAAAAAAAAEAEBAAAAAAAAAAAAAAAAAAAAlREBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Ah7DAhg//2Q==');background-repeat: repeat;">
        <p>
          <span class="author">
            copyright
            <i class="fa fa-copyright" aria-hidden="true"></i>
            {{ authorNickName }}
          </span>
          <i class="fa">|</i>
          <span>
            版权所有 参考
            <a href="https://gitcafe.net/">
              GitCafe
            </a>
            和
            <a href="https://yusi123.com/">欲思主题</a>
            创建
          </span>
        </p>
        <p>基于JAVA构建 2019-10-20至 {{ now }} </p>
        <p class="mr10"><a href="javascript:">{{ footerICPCode }}</a></p>
        <p class="mr10">本项目github地址：<a :href="footerGithubWebsiteAddr">{{ footerGithubWebsiteAddr }}</a></p>
      </div>
    </footer>
  </div>
</template>

<script>
import moment from "moment";
import vueToTop from 'vue-totop'
import {
  DEFAULT_AUTHOR_AVATAR,
  DEFAULT_AUTHOR_NICKNAME,
  DEFAULT_AUTHOR_WX_QRCODE_URL,
  DEFAULT_FOOTER_ABOUT_WEBSITE,
  DEFAULT_FOOTER_COPYRIGHT,
  DEFAULT_GITHUB_WEBSITE_ADDR,
  DEFAULT_IMAGE_ALI_CLOUD,
  DEFAULT_IMAGE_HUAWEI_CLOUD,
  DEFAULT_IMAGE_MYSQL,
  DEFAULT_IMAGE_NGINX,
  DEFAULT_IMAGE_REDIS,
  DEFAULT_IMAGE_TOMCAT,
  DEFAULT_WEBSITE_ICP_CODE
} from "@/constant/commonConstant";

export default {
  name: "Footer",
  components: {
    vueToTop
  },
  data() {
    return {
      now: moment(new Date()).format("YYYY-MM-DD"),
      // 前端站点配置相关数据
      footerCopyRight: "",
      footerICPCode: "",
      footerHuaweiCloudImage: "",
      footerAliCloudImage: "",
      footerMysqlImage: "",
      footerRedisImage: "",
      footerNginxImage: "",
      footerTomcatImage: "",
      authorWxQrcodeUrl: "",
      authorAvatar: "",
      authorNickName: "",
      footerAboutWebsite: "",
      footerGithubWebsiteAddr: ""
    }
  },
  methods: {
    // 设置前端站点配置
    setFrontendWebsiteConfig() {
      // 首先从localStorage中获取必要字段，如果不存在，那么使用默认配置
      let config = JSON.parse(localStorage.getItem("FrontendWebsiteConfig"));
      if (config === null || config === undefined) {
        this.footerCopyRight = DEFAULT_FOOTER_COPYRIGHT;
        this.footerICPCode = DEFAULT_WEBSITE_ICP_CODE;
        this.footerHuaweiCloudImage = DEFAULT_IMAGE_HUAWEI_CLOUD;
        this.footerAliCloudImage = DEFAULT_IMAGE_ALI_CLOUD;
        this.footerMysqlImage = DEFAULT_IMAGE_MYSQL;
        this.footerRedisImage = DEFAULT_IMAGE_REDIS;
        this.footerNginxImage = DEFAULT_IMAGE_NGINX;
        this.footerTomcatImage = DEFAULT_IMAGE_TOMCAT;
        // 默认微信
        this.authorWxQrcodeUrl = DEFAULT_AUTHOR_WX_QRCODE_URL;
        this.authorAvatar = DEFAULT_AUTHOR_AVATAR;
        this.authorNickName = DEFAULT_AUTHOR_NICKNAME;
        this.footerAboutWebsite = DEFAULT_FOOTER_ABOUT_WEBSITE;
        this.footerGithubWebsiteAddr = DEFAULT_GITHUB_WEBSITE_ADDR;
      } else {
        this.footerCopyRight = config["FOOTER_COPYRIGHT"] ? config["FOOTER_COPYRIGHT"] : DEFAULT_FOOTER_COPYRIGHT;
        this.footerICPCode = config["WEBSITE_ICP_CODE"] ? config["WEBSITE_ICP_CODE"] : DEFAULT_WEBSITE_ICP_CODE;
        if (config["FOOTER_DRIVER"]) {
          let driverImages = config["FOOTER_DRIVER"].split(",");
          this.footerHuaweiCloudImage = driverImages[0];
          this.footerAliCloudImage = driverImages[1];
          this.footerMysqlImage = driverImages[2];
          this.footerRedisImage = driverImages[3];
          this.footerNginxImage = driverImages[4];
          this.footerTomcatImage = driverImages[5];
        } else {
          this.footerHuaweiCloudImage = DEFAULT_IMAGE_HUAWEI_CLOUD;
          this.footerAliCloudImage = DEFAULT_IMAGE_ALI_CLOUD;
          this.footerMysqlImage = DEFAULT_IMAGE_MYSQL;
          this.footerRedisImage = DEFAULT_IMAGE_REDIS;
          this.footerNginxImage = DEFAULT_IMAGE_NGINX;
          this.footerTomcatImage = DEFAULT_IMAGE_TOMCAT;
        }
        // 默认微信
        this.authorWxQrcodeUrl = config["AUTHOR_WX_QRCODE_URL"] ? config["AUTHOR_WX_QRCODE_URL"] : DEFAULT_AUTHOR_WX_QRCODE_URL;
        this.authorAvatar = config["AVATAR_URL"] ? config["AVATAR_URL"] : DEFAULT_AUTHOR_AVATAR;
        this.authorNickName = config["NICK_NAME"] ? config["NICK_NAME"] : DEFAULT_AUTHOR_NICKNAME;
        this.footerAboutWebsite = config["FOOTER_ABOUT_WEBSITE"] ? config["FOOTER_ABOUT_WEBSITE"] : DEFAULT_FOOTER_ABOUT_WEBSITE;
        this.footerGithubWebsiteAddr = config["GITHUB_WEBSITE"] ? config["GITHUB_WEBSITE"] : DEFAULT_GITHUB_WEBSITE_ADDR;
      }
    }
  },
  mounted() {
    this.setFrontendWebsiteConfig();
  }
}
</script>

<style scoped lang="scss">
.v-top {

}

/* footer部分 */
#footer {
  background-color: #31353a;
  background-image: -webkit-linear-gradient(top, #31353a, #2f3337);
  text-align: center;
  color: #707070;
  overflow: hidden;
  font-size: 12px;
  z-index: 1000;
  border-top: 2px solid #8E44AD;

  .footer-main {
    margin: 0 auto;
    height: 245px;
    width: 960px;
    display: none;

    .footer-main-item {
      width: 240px;
      height: auto;
      margin-right: 50px;

      &:nth-of-type(2) {
        .item-title {
          background-color: #00b274;
          background-image: -webkit-linear-gradient(top, #00b274, #00a46b);
        }
      }

      &:nth-of-type(3) {
        .item-title {
          background-color: #d75ba2;
          background-image: -webkit-linear-gradient(top, #d75ba2, #c75496);
        }
      }

      &:nth-of-type(4) {
        .item-title {
          background-color: #e9ac40;
          background-image: -webkit-linear-gradient(top, #e9ac40, #d89f3b);
        }
      }

      .item-title {
        background-color: #0096d6;
        background-image: -webkit-linear-gradient(top, #0096d6, #008ac6);
        text-align: center;
        padding: 9px 0;
        text-transform: uppercase;
        box-shadow: 0 0 3px rgba(0, 0, 0, .3);
        text-shadow: 0 1px rgba(0, 0, 0, .1);
        font-weight: 700;
        font-size: .875rem;
        line-height: 1.125rem;
        opacity: .9;

        a {
          color: #ffffff;
          line-height: 100%;
        }
      }

      .logo-container {
        width: 100%;
        height: auto;

        .logo-container-row {
          img {
            width: 50%;
            height: auto;
            max-height: 32px;
          }
        }
      }

      .site-rss {
        width: 100%;
        height: auto;

        .site-rss-info {
          height: auto;

          img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            margin-right: 10px;
          }
        }

        .site-rss-email {
          text-align: left;

          input[type="email"] {
            padding: 5px;
            font-size: 12px;
            color: #777777;
            border: none;
            width: 120px;
          }

          button {
            width: 55px;
            height: 30px;
            background-color: #0096d6;
            border: none;
            border-radius: 4px;
            color: #ffffff;
          }
        }
      }

      .site-wechat {
        width: 100%;
        height: auto;

        img {
          width: 100%;
        }
      }
    }
  }

  .footer-info {
    position: relative;
    padding: 10px;
    font-size: 14px;

    p {
      display: inline;
    }
  }
}

/* ipad 768px以上 */
@media screen and (min-width: 768px) {

}

/* web 1200px以上 */
@media screen and (min-width: 1200px) {
  #footer {
    .footer-main {
      display: flex;
    }
  }
}

</style>
