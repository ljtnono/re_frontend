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
            本站的文章和资源来自互联网或者站长
            的原创，按照 CC BY -NC -SA 3.0 CN
            协议发布和共享，转载或引用本站文章
            应遵循相同协议。如果有侵犯版权的资
            源请尽快联系站长，我们会在24h内删
            除有争议的资源。
          </p>
        </div>
        <div class="footer-main-item">
          <header class="item-title">
            <a href="javascript:">网站驱动</a>
          </header>
          <div class="logo-container mt20 flex flex-direction-column">
            <div class="logo-container-row flex flex-direction-row">
              <img :src="this.$config.imgHuaWeiYun" alt="华为云"><br>
              <img :src="this.$config.imgAliYun" alt="阿里云"><br>
            </div>
            <div class="logo-container-row flex flex-direction-row">
              <img :src="this.$config.imgMysql" alt="mysql"><br>
              <img :src="this.$config.imgRedis" alt="redis"><br>
            </div>
            <div class="logo-container-row flex flex-direction-row">
              <img :src="this.$config.imgNginx" alt="nginx"><br>
              <img :src="this.$config.imgTomcat" alt="tomcat"><br>
            </div>
          </div>
        </div>
        <div class="footer-main-item">
          <header class="item-title">
            <a href="javascript:">站长微信</a>
          </header>
          <div class="site-wechat mt20">
            <img :src="this.$config.imgQrCodeWeChat" alt="加我微信">
          </div>
        </div>
        <div class="footer-main-item">
          <header class="item-title">
            <a href="javascript:">关于本站</a>
          </header>
          <div class="site-rss mt20">
            <div class="site-rss-info flex flex-direction-row flex-justify-content-space-between">
              <img :src="this.$config.imgAvatar" :alt="this.$config.author" :title="this.$config.author">
              <p style="width:120px; text-align: left;">
                根元素,Java,css,html,爬虫,网络,IT,技术,博客 Talk is cheap, show me the code
              </p>
            </div>
            <div class="site-rss-email mt20 flex flex-direction-row flex-justify-content-space-between">
              <input type="email" placeholder="输入邮箱订阅本站"/>
              <button><i class="fa fa-rss" />订阅</button>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-info" style="border-top: 1px solid #03A9F4;background-image: url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAUAAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgICAgICAgICAgMCAgIDBAMCAgMEBQQEBAQEBQYFBQUFBQUGBgcHCAcHBgkJCgoJCQwMDAwMDAwMDAwMDAwMDAEDAwMFBAUJBgYJDQsJCw0PDg4ODg8PDAwMDAwPDwwMDAwMDA8MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAAgAKAwERAAIRAQMRAf/EAEwAAQEAAAAAAAAAAAAAAAAAAAAJAQEAAAAAAAAAAAAAAAAAAAAAEAEBAAAAAAAAAAAAAAAAAAAAlREBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Ah7DAhg//2Q==');background-repeat: repeat;">
        <p>
          <span class="author">
            copyright
            <i class="fa fa-copyright" aria-hidden="true"></i>
            {{ $config.author }}
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
        <p>基于JAVA构建 2019-10-20至{{ now }} </p>
        <p class="mr10"><a href="javascript:">{{ this.$config.recordNum }}</a></p>
        <p class="mr10">本项目github地址：<a :href="this.$config.githubAddr">{{ this.$config.githubAddr }}</a></p>
      </div>
    </footer>
  </div>
</template>

<script>
import moment from "moment";
import vueToTop from 'vue-totop'

export default {
  name: "Footer",
  components: {
    vueToTop
  },
  data() {
    return {
      now: moment(new Date()).format("YYYY-MM-DD")
    }
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
