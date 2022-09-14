<template>
  <!-- 首页侧边栏部分 -->
  <div class="content-side pa">
    <!-- 联系方式 -->
    <div class="social p10 mb15">
      <Poptip word-wrap content="微信号：a935188400" :trigger="trigger">
        <a href="javascript:" class="fl" style="background-color: #6FC299;">
          <i class="fa fa-wechat"></i>
        </a>
      </Poptip>
      <Poptip word-wrap content="微博：最后d疼爱" :trigger="trigger">
        <a href="javascript:" class="fl" style="background-color: #F78585;">
          <i class="fa fa-weibo"></i>
        </a>
      </Poptip>
      <Poptip word-wrap content="qq：935188400" :trigger="trigger">
        <a href="javascript:" class="fl" style="background-color: #E74C3C;">
          <i class="fa fa-qq"></i>
        </a>
      </Poptip>
      <Poptip word-wrap content="github：ljtnono" :trigger="trigger">
        <a href="javascript:" class="fl" style="background-color: #27CCC0;">
          <i class="fa fa-github"></i>
        </a>
      </Poptip>
      <Poptip word-wrap content="点击按钮订阅本站" :trigger="trigger">
        <a href="javascript:" class="fl" style="background-color: #FF7C49;">
          <i class="fa fa-rss"></i>
        </a>
      </Poptip>
    </div>
    <!-- 博主信息 -->
    <div class="author-info mb15">
      <div class="title mb15">博主信息</div>
      <div class="description mb15">
        <a href="javascript:" class="avatar mr15">
          <img :src="this.$config.imgAvatar" :alt="this.$config.author" :title="this.$config.author">
        </a>
        <div class="description-text">
          <p class="mb5 f14">网名：{{ this.$config.author }}</p>
          <p class="mb5 f14">职业：程序员</p>
          <p class="mb5 f14">现居：{{ this.$config.authorAddr }}</p>
          <p class="mb5 f14">Email：{{ this.$config.email }}</p>
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
      <Loading :show="linkDefaultFlag" style="height: 300px;"></Loading>
      <a :href="link.url" target="_blank" class="link" v-show="link.status === 1" v-for="link in friendLinks" :key="link.id">
        {{ link.name }}
      </a>
    </div>
  </div>
</template>

<script>
import Loading from "./Loading";
import '../mock/side'
import axios from "axios";

export default {
  name: "ContentSide",
  data() {
    return {
      trigger: "hover",
      guessDefaultFlag: true,
      linkDefaultFlag: true,
      tagDefaultFlag: true,
      articleTags: [],
      friendLinks: [],
      guessYouLikeList: []
    }
  },
  components: {
    Loading
  },
  methods: {
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
    friendLinkList() {
      this.linkDefaultFlag = true;
      axios.get("/api-frontend/side/friendLinkList").then(res => {
        if (res.data.code === 0) {
          this.friendLinks = res.data.data;
        }
        this.linkDefaultFlag = false;
      }).catch(() => {
        this.linkDefaultFlag = false;
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
    this.friendLinkList();
    this.guessYouLike();
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
