<template>
  <!-- 首页侧边栏部分 -->
  <div class="content-side flex flex-direction-column">
    <!-- 联系方式 -->
    <div class="social p10 mb15 flex flex-direction-row flex-justify-content-space-between">
      <el-tooltip effect="dark" :content="author.wechat" placement="top">
        <a href="javascript:" style="background-color: #6fc299">
          <i class="fa fa-wechat" />
        </a>
      </el-tooltip>
      <el-tooltip effect="dark" :content="author.qq" placement="top">
        <a href="javascript:" style="background-color: #e74c3c">
          <i class="fa fa-qq" />
        </a>
      </el-tooltip>
      <el-tooltip effect="dark" :content="author.githubUsername" placement="top">
        <a :href="author.github" style="background-color: #27ccc0">
          <i class="fa fa-github" />
        </a>
      </el-tooltip>
      <!-- rss订阅 -->
      <el-tooltip effect="dark" :content="websiteConfig.RSS_URL" placement="top">
        <a href="javascript:" style="background-color: #ff7c49">
          <i class="fa fa-rss" />
        </a>
      </el-tooltip>
    </div>
    <!-- 博主信息 -->
    <div class="author-info mb15">
      <div class="title mb15">博主信息</div>
      <div class="description mb15">
        <a href="javascript:" class="avatar mr15">
          <img :src="author.avatar" :alt="author.nickName" :title="author.nickName" />
        </a>
        <div class="description-text">
          <p class="mb5 f14">网名：{{ author.nickName }}</p>
          <p class="mb5 f14">职业：{{ author.job }}</p>
          <p class="mb5 f14">现居：{{ author.addr }}</p>
          <p class="mb5 f14">Email：{{ author.email }}</p>
        </div>
      </div>
      <div class="author-tags flex flex-justify-content-space-between">
        <a href="javascript:" class="author-tag">{{ author.tagList[0] }}</a>
        <a href="javascript:" class="author-tag">{{ author.tagList[1] }}</a>
        <a href="javascript:" class="author-tag">{{ author.tagList[2] }}</a>
      </div>
    </div>
<!--    &lt;!&ndash; 推荐文章列表 &ndash;&gt;-->
<!--    <div class="guess mb15">-->
<!--      <div class="title mb15">猜你喜欢</div>-->
<!--      <div class="guess-item pb10 mb10" v-for="blog in guessYouLikeList" :key="blog.id">-->
<!--        <a :href="'/article/' + blog.id" class="thumb mr5 flex">-->
<!--          <img :src="blog.coverImage" :alt="blog.title" />-->
<!--        </a>-->
<!--        <div class="guess-text pr">-->
<!--          <a class="guess-title pa" :href="'/article/' + blog.id">-->
<!--            {{ blog.title }}-->
<!--          </a>-->
<!--          <a class="guess-info pa">-->
<!--            <span class="mr5">{{ blog.modifyTime | timeFormat }}</span>-->
<!--            <span>{{ blog.comment }}评论</span>-->
<!--          </a>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <!-- 热门标签 -->
    <div class="tags mb15">
      <div class="title mb15">热门标签</div>
        <a href="javascript:" class="tag" v-for="tag in hotTagList" :key="tag.id">
          {{ tag.name }} ({{ tag.articleCount }})
        </a>
    </div>
    <!-- 友情链接 -->
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
import "../mock/side";
import {mapState} from "vuex";

export default {
  name: "ContentSide",
  data() {
    return {
      // guessDefaultFlag: true,
      // tagDefaultFlag: true,
      // guessYouLikeList: [],
    };
  },
  computed: {
    ...mapState({
      hotTagList: state => state.common.hotTagList,
      author: state => state.common.author,
      friendLinkList: state => state.common.friendLinkList,
      websiteConfig: state => state.common.websiteConfig
    })
  },
  components: {
    Loading,
  },
  methods: {
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
// 标签的颜色
$tag-color-1: #15a287;
$tag-color-2: #5cb85c;
$tag-color-3: #d9534f;
$tag-color-4: #567e95;
$tag-color-5: #b433ff;
$tag-color-6: #00a67c;
$tag-color-7: #b37333;
$tag-color-8: #f60;
$tag-color-9: #4a4a4a;

.content-side {
  width: 316px;
  height: auto;
  display: none;
  right: 0;
  top: 0;

  .author-info {
    background-color: #ffffff;
    padding: 10px 18px;
    color: #c35bff;

    .title {
      width: 100%;
      height: 26px;
      color: #c35bff;
      border-bottom: 1px solid #c35bff;
    }

    .author-tags {
      height: auto;

      .author-tag {
        padding: 5px;
        color: #ffffff;
        text-align: center;

        &:nth-of-type(1) {
          background-color: #3fb8af;
        }

        &:nth-of-type(2) {
          background-color: #eb6841;
        }

        &:nth-of-type(3) {
          background-color: #fc9d9a;
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
          transition: all ease-in-out 0.5s;
          -webkit-transition: all ease-in-out 0.5s;
          -moz-transition: all ease-in-out 0.5s;
        }
      }

      .description-text {
        display: inline-block;
      }
    }
  }

  .social {
    width: auto;
    background-color: #ffffff;

    a {
      width: 45px;
      height: 45px;
      display: block;
      text-align: center;
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
      color: #03a9f4;
      border-bottom: 1px solid #03a9f4;
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
          transition: all ease-in-out 0.5s;
          -webkit-transition: all ease-in-out 0.5s;
          -moz-transition: all ease-in-out 0.5s;
        }
      }

      .guess-text {
        width: 168px;
        height: 64px;
        display: inline-block;
        font-size: 12px;

        .guess-title {
          color: #00a67c;
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
      color: #d37088;
      border-bottom: 1px solid #d37088;
    }

    .tag {
      width: 44%;
      opacity: 0.7;
      filter: alpha(opacity=80);
      color: #ffffff;
      background-color: #00a67c;
      display: inline-block;
      padding: 2px 6px;
      line-height: 21px;

      &:hover {
        opacity: 1;
        filter: alpha(opacity=100);
      }

      &:nth-of-type(9n + 1) {
        background-color: $tag-color-1;
      }

      &:nth-of-type(9n + 2) {
        background-color: $tag-color-2;
      }

      &:nth-of-type(9n + 3) {
        background-color: $tag-color-3;
      }

      &:nth-of-type(9n + 4) {
        background-color: $tag-color-4;
      }

      &:nth-of-type(9n + 5) {
        background-color: $tag-color-5;
      }

      &:nth-of-type(9n + 6) {
        background-color: $tag-color-6;
      }

      &:nth-of-type(9n + 7) {
        background-color: $tag-color-7;
      }

      &:nth-of-type(9n + 8) {
        background-color: $tag-color-8;
      }

      &:nth-of-type(9n) {
        background-color: $tag-color-9;
      }
    }
  }

  .links {
    background-color: #ffffff;
    padding: 10px 18px;

    .title {
      width: auto;
      height: 26px;
      color: #7266ba;
      border-bottom: 1px solid #7266ba;
    }

    .link {
      background-color: #ffffff;
      padding: 5px 8px;
      display: inline-block;
      width: 44%;
      text-align: center;
      color: #00a67c;
      border-bottom: 1px solid #f0f0f0;

      &:focus,
      &:hover {
        color: #007046;
        text-decoration: none;
      }
    }
  }
}

// ipad 768px以上
@media screen and (min-width: 768px) {
  .content-side {
    display: none;
  }
}

// web 1200px以上
@media screen and (min-width: 1200px) {
  .content-side {
    display: block;
  }
}
</style>
