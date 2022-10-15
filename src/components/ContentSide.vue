<template>
  <!-- 首页侧边栏部分 -->
  <div class="content-side pa">
    <!-- 联系方式 -->
    <div class="social p10 mb15">
      <!-- TODO 此组件已失效，替换为其他组件 -->
      <Poptip word-wrap content="微信号：a935188400" :trigger="trigger">
        <a href="javascript:" class="fl" style="background-color: #6FC299;">
          <i class="fa fa-wechat"/>
        </a>
      </Poptip>
      <Poptip word-wrap content="微博：最后d疼爱" :trigger="trigger">
        <a href="javascript:" class="fl" style="background-color: #F78585;">
          <i class="fa fa-weibo"/>
        </a>
      </Poptip>
      <Poptip word-wrap content="qq：935188400" :trigger="trigger">
        <a href="javascript:" class="fl" style="background-color: #E74C3C;">
          <i class="fa fa-qq"/>
        </a>
      </Poptip>
      <Poptip word-wrap content="github：ljtnono" :trigger="trigger">
        <a href="javascript:" class="fl" style="background-color: #27CCC0;">
          <i class="fa fa-github"/>
        </a>
      </Poptip>
      <Poptip word-wrap content="点击按钮订阅本站" :trigger="trigger">
        <a href="javascript:" class="fl" style="background-color: #FF7C49;">
          <i class="fa fa-rss"/>
        </a>
      </Poptip>
    </div>
    <!-- 博主信息 -->
    <div class="author-info mb15">
      <div class="title mb15">博主信息</div>
      <div class="description mb15">
        <a href="javascript:" class="avatar mr15">
          <img :src="authorAvatar" :alt="authorNickName" :title="authorNickName">
        </a>
        <div class="description-text">
          <p class="mb5 f14">网名：{{ authorNickName }}</p>
          <p class="mb5 f14">职业：程序员</p>
          <p class="mb5 f14">现居：{{ authorAddr }}</p>
          <p class="mb5 f14">Email：{{ authorEmail }}</p>
        </div>
      </div>
      <div class="author-tags flex flex-justify-content-space-between">
        <a href="javascript:" class="author-tag">理想主义者</a>
        <a href="javascript:" class="author-tag">技术宅</a>
        <a href="javascript:" class="author-tag">天然呆</a>
      </div>
    </div>
    <!-- 猜你喜欢 -->
    <div class="guess mb15">
      <div class="title mb15">猜你喜欢</div>
      <Loading :show="guessDefaultFlag" style="height: 300px;"></Loading>
      <div class="guess-item pb10 mb10" v-for="blog in guessYouLikeList" :key="blog.id">
        <a :href="'/article/' + blog.id" class="thumb mr5">
          <img :src="blog.coverImage" :alt="blog.title">
        </a>
        <div class="guess-text pr">
          <a class="guess-title pa" :href="'/article/' + blog.id">
            {{ blog.title }}
          </a>
          <a class="guess-info pa">
            <span class="mr5">{{ blog.modifyTime | timeFormat }}</span>
            <span>{{ blog.comment }}评论</span>
          </a>
        </div>
      </div>
    </div>
    <div class="tags mb15">
      <div class="title mb15">热门标签</div>
      <Loading :show="tagDefaultFlag" style="height: 300px;"></Loading>
      <a :href="'/articles/' + articleTag.name" class="tag" v-for="articleTag in articleTags" :key="articleTag.id"
         v-show="articleTag.status === 1">
        {{ articleTag.name }}
      </a>
    </div>
    <div class="links mb15">
      <div class="title">友情链接</div>
      <a :href="link.url" target="_blank" class="link" v-for="link in friendLinkList" :key="link.url" :alt="link.name">
        {{ link.name }}
        <i class="fa fa-home" />
      </a>
    </div>
  </div>
</template>

<script>
import Loading from "./Loading";
import axios from "axios";
import "../mock/side";
import {findFriendLinkList} from "../api/sy"

import {
  DEFAULT_AUTHOR_NICKNAME,
  DEFAULT_AUTHOR_ADDR,
  DEFAULT_AUTHOR_EMAIL,
  DEFAULT_AUTHOR_AVATAR, API_SUCCESS_CODE, API_SUCCESS_MESSAGE
} from "@/constant/commonConstant";

export default {
  name: "ContentSide",
  data() {
    return {
      trigger: "hover",
      guessDefaultFlag: true,
      tagDefaultFlag: true,
      articleTags: [],
      friendLinkList: [],
      guessYouLikeList: [],
      // 站点配置相关数据
      authorAvatar: "",
      authorNickName: "",
      authorAddr: "",
      authorEmail: ""
    }
  },
  components: {
    Loading
  },
  methods: {
    // 设置前端网站配置
    setFrontendWebsiteConfig() {
      // 首先从localStorage中获取必要字段，如果不存在，那么使用默认配置
      let config = JSON.parse(localStorage.getItem("FrontendWebsiteConfig"));
      if (config === null || config === undefined) {
        this.authorAvatar = DEFAULT_AUTHOR_AVATAR;
        this.authorNickName = DEFAULT_AUTHOR_NICKNAME;
        this.authorAddr = DEFAULT_AUTHOR_ADDR;
        this.authorEmail = DEFAULT_AUTHOR_EMAIL;
      } else {
        this.authorNickName = config["NICK_NAME"] ? config["NICK_NAME"] : DEFAULT_AUTHOR_NICKNAME;
        this.authorAddr = config[""] ? config[""] : DEFAULT_AUTHOR_ADDR;
        this.authorAvatar = config["AVATAR_URL"] ? config["AVATAR_URL"] : DEFAULT_AUTHOR_AVATAR;
        this.authorEmail = config["AUTHOR_EMAIL"] ? config["AUTHOR_EMAIL"] : DEFAULT_AUTHOR_EMAIL;
      }
    },
    articleTagList() {
      this.tagDefaultFlag = true;
      axios.get("/api-frontend/side/articleTagList").then(res => {
        if (res.data.code === 0) {
          this.articleTags = res.data.data;
        }
        this.tagDefaultFlag = false;
      }).catch(() => {
        this.tagDefaultFlag = false;
      });
    },
    findFriendLinkList() {
      findFriendLinkList().then(res => {
        let outerData = res.data;
        if (API_SUCCESS_CODE === outerData.code && API_SUCCESS_MESSAGE === outerData.message) {
          let innerData = outerData.data;
          console.log(innerData);
          this.friendLinkList = innerData;
        }
      });
    },
    guessYouLike() {
      this.guessDefaultFlag = true;
      axios.get('/api-frontend/side/guessYouLike').then(res => {
        if (res.data.code === 0) {
          this.guessYouLikeList = res.data.data;
        }
        this.guessDefaultFlag = false;
      }).catch(() => {
        this.guessDefaultFlag = false;
      });
    }
  },
  mounted() {
    this.articleTagList();
    this.findFriendLinkList();
    this.guessYouLike();
    this.setFrontendWebsiteConfig();
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/common";

.content {
  height: auto;
  width: auto;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 998;

  .content-side {
    width: 316px;
    height: auto;
    display: none;
    right: 0;
    top: 0;

    .author-info {
      background-color: #ffffff;
      padding: 10px 18px;
      color: #C35BFF;

      .title {
        width: 100%;
        height: 26px;
        color: #C35BFF;
        border-bottom: 1px solid #C35BFF;
      }

      .author-tags {
        height: auto;

        .author-tag {
          padding: 5px;
          color: #ffffff;
          text-align: center;

          &:nth-of-type(1) {
            background-color: #3FB8AF;
          }

          &:nth-of-type(2) {
            background-color: #EB6841;
          }

          &:nth-of-type(3) {
            background-color: #FC9D9A;
          }
        }
      }

      .description {

        .avatar {
          display: inline-block;
          vertical-align: top;
          width: 64px;
          height: 64px;
          overflow: hidden;
          border-radius: 50%;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;

          &:hover {
            img {
              transform: scale(1.2);
              -webkit-transform: scale(1.2);
              -moz-transform: scale(1.2);
            }
          }

          img {
            display: block;
            width: 100%;
            height: 100%;
            transition: all ease-in-out .5s;
            -webkit-transition: all ease-in-out .5s;
            -moz-transition: all ease-in-out .5s;
          }
        }

        .description-text {
          display: inline-block;
        }
      }
    }

    .social {
      width: auto;
      height: 65px;
      background-color: #ffffff;

      a {
        width: 45px;
        height: 45px;
        display: block;
        text-align: center;
        margin-right: 12px;
        border-radius: 6px;

        i {
          font-size: 35px;
          display: block;
          line-height: 45px;
          color: #ffffff;
        }
      }
    }

    .guess {
      width: auto;
      height: auto;
      background-color: #ffffff;
      padding: 10px 18px;

      .title {
        width: 100%;
        height: 26px;
        color: #03A9F4;
        border-bottom: 1px solid #03A9F4;
      }

      .guess-item {
        border-bottom: 1px solid #eeeeee;

        .thumb {
          width: 100px;
          height: 64px;
          overflow: hidden;
          display: inline-block;
          vertical-align: top;

          &:hover {
            img {
              transform: scale(1.2);
              -webkit-transform: scale(1.2);
              -moz-transform: scale(1.2);
            }
          }

          img {
            display: block;
            width: 100%;
            height: 100%;
            transition: all ease-in-out .5s;
            -webkit-transition: all ease-in-out .5s;
            -moz-transition: all ease-in-out .5s;
          }
        }

        .guess-text {
          width: 168px;
          height: 64px;
          display: inline-block;
          font-size: 12px;

          .guess-title {
            color: #00A67C;
            display: block;
            top: 0;
          }

          .guess-info {
            display: block;
            bottom: 0;
          }
        }
      }
    }

    .tags {
      width: auto;
      height: auto;
      background-color: #ffffff;
      padding: 10px 18px;

      .title {
        width: 100%;
        height: 26px;
        color: #D37088;
        border-bottom: 1px solid #D37088;
      }


      .tag {
        width: 44%;
        opacity: .7;
        filter: alpha(opacity=80);
        color: #ffffff;
        background-color: #00a67c;
        display: inline-block;
        margin: 0 5px 5px 0;
        padding: 2px 6px;
        line-height: 21px;

        &:hover {
          opacity: 1;
          filter: alpha(opacity=100);
        }

        &:nth-of-type(9n+1) {
          background-color: $tag-color-1;
        }

        &:nth-of-type(9n+2) {
          background-color: $tag-color-2;
        }

        &:nth-of-type(9n+3) {
          background-color: $tag-color-3;
        }

        &:nth-of-type(9n+4) {
          background-color: $tag-color-4;
        }

        &:nth-of-type(9n+5) {
          background-color: $tag-color-5;
        }

        &:nth-of-type(9n+6) {
          background-color: $tag-color-6;
        }

        &:nth-of-type(9n+7) {
          background-color: $tag-color-7;
        }

        &:nth-of-type(9n+8) {
          background-color: $tag-color-8;
        }

        &:nth-of-type(9n) {
          background-color: $tag-color-9;
        }

      }
    }

    .links {
      background-color: #FFFFFF;
      padding: 10px 18px;

      .title {
        width: auto;
        height: 26px;
        color: #7266BA;
        border-bottom: 1px solid #7266BA;
      }


      .link {
        background-color: #ffffff;
        padding: 5px 8px;
        display: inline-block;
        width: 44%;
        text-align: center;
        color: #00a67c;
        border-bottom: 1px solid #f0f0f0;

        &:focus, &:hover {
          color: #007046;
          text-decoration: none;
        }

      }
    }

    .wechat {
      background-color: #FFFFFF;
      width: auto;
      height: auto;
      padding: 10px 18px;

      .title {
        width: auto;
        height: 26px;
        color: #03A9F4;
        border-bottom: 1px solid #03A9F4;
      }

      a {
        img {
          display: inline-block;
          width: 100%;
        }
      }
    }
  }
}

/* ipad 768px以上 */
@media screen and (min-width: 768px) {

}

/* web 1200px以上 */
@media screen and (min-width: 1200px) {
  .content {
    .content-side {
      display: block;
    }
  }
}

</style>
