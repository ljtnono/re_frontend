<template>
  <!-- 内容区 -->
  <div class="content-main flex flex-direction-column">
    <!-- TODO 轮播图 -->
    <!-- 置顶文章 -->
    <div class="top f16 flex">
      <div class="title f14">置顶文章</div>
      <div class="top-content">
        <ul class="top-list">
          <li class="top-item mb10" v-for="(article, index) in topArticleList" :key="article.id">
            <span class="top-label mr5">{{ index + 1 }}</span>
            <a class="top-title f14" :href="'/article/' + article.id">{{article.title }}</a>
            <span class="top-view mr15 fr" style="color: #3db1ad">
              <span>{{ article.view }} 浏览</span>
            </span>
            <span class="top-favorite mr15 fr" style="color: #ff8e8e">
              <span>{{ article.favorite }} 喜欢</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 无限滚动文章列表项 -->
    <div class="articles flex flex-direction-column">
      <ul class="infinite-list" v-infinite-scroll="load">
        <ArticleItem :articleItem="article" v-for="article in articles" :key="article.id" />
      </ul>
    </div>
  </div>
</template>

<script>
import ContentSide from "../components/ContentSide";
import "swiper/dist/css/swiper.css";
import ArticleItem from "../components/ArticleItem";
import "../mock/index";
import {getSwiperImageList} from "@/api/sy";
import {HTTP_RESULT_SUCCESS_CODE, HTTP_RESULT_SUCCESS_MESSAGE,} from "@/constant/commonConstant";

export default {
  name: "Index",
  data() {
    return {
      hotDefaultFlag: true,
      articlesDefaultFlag: true,
      swiperOption: this.$config.swiperOption,
      topArticleList: [],
      count: 10,
      page: 1,
      articles: [],
      totalPages: 1,
      totalCount: 1,
      slides: [],
      swiperImageList: [],
    };
  },
  components: {
    ContentSide,
    ArticleItem
  },
  methods: {
    load () {
      this.articlesDefaultFlag = true;
      this.$http.get("/api-frontend/index/articleList").then((res) => {
        let outData = res.data;
        if (outData.code === 0) {
          let articles = outData.data;
          this.totalPages = outData.totalPages;
          this.totalCount = outData.totalCount;
          for (let i of articles) {
            this.articles.push(i);
          }
        }
        this.articlesDefaultFlag = false;
      }).catch(() => {
        this.articlesDefaultFlag = false;
      });
    },
    // 获取swiper轮播图列表
    getSwiperImageList() {
      getSwiperImageList().then((res) => {
        let outerData = res.data;
        if (
          HTTP_RESULT_SUCCESS_CODE === outerData.code &&
          HTTP_RESULT_SUCCESS_MESSAGE === outerData.message
        ) {
          this.swiperImageList = outerData.data;
        }
      });
    },
    loadData(page) {
      this.articles = [];
      this.articleList(page, this.count);
    },
    articleList(page, count) {
      this.articlesDefaultFlag = true;
      this.$http
        .get("/api-frontend/index/articleList")
        .then((res) => {
          if (res.data.code === 0) {
            this.articles = res.data.data;
            this.page = page;
            this.count = count;
            this.totalPages = res.data.totalPages;
            this.totalCount = res.data.totalCount;
          }
          this.articlesDefaultFlag = false;
        })
        .catch(() => {
          this.articlesDefaultFlag = false;
        });
    },
    hotArticleList() {
      this.hotDefaultFlag = true;
      this.$http
        .get("/api-frontend/index/topArticleList")
        .then((res) => {
          if (res.data.code === 0) {
            this.topArticleList = res.data.data;
          }
          this.hotDefaultFlag = false;
        })
        .catch(() => {
          this.hotDefaultFlag = false;
        });
    },
    sliderList() {
      this.$http.get("/api-frontend/index/sliderList").then((res) => {
        if (res.data.code === 0) {
          this.slides = res.data.data;
        }
      });
    },
  },
  mounted() {
    this.articleList(this.page, this.count);
    this.hotArticleList();
    this.sliderList();
    this.getSwiperImageList();
  },
};
</script>

<style scoped lang="scss">
.ivu-scroll-wrapper {
  ::-webkit-scrollbar {
    display: none;
  }
}

// 主要部分
.content-main {
  min-height: 1870px;

  // 热门文章
  .top {
    background-color: #ffffff;
    padding: 10px 20px;
    display: none;

    .title {
      width: 100%;
      height: 26px;
      color: #1abc9c;
      border-bottom: 1px solid #1abc9c;
    }

    .top-content {
      width: 100%;
      margin-top: 2px;

      .top-list {
        width: 100%;
        height: auto;

        .top-item {
          &:nth-of-type(1) {
            .top-label {
              background-color: #ff858e;
            }
          }

          &:nth-of-type(2) {
            .top-label {
              background-color: #6fc299;
            }
          }

          &:nth-of-type(3) {
            .top-label {
              background-color: #81c1f2;
            }
          }

          span {
            display: inline-block;
            font-size: 14px;
          }

          .top-label {
            width: 20px;
            height: 20px;
            color: #ffffff;
            display: inline-block;
            background-color: #999999;
            font-size: 14px;
            text-align: center;
          }

          .top-title {
            color: #00a67c;

            &:hover {
              text-decoration: underline;
            }
          }

          .top-view,
          .top-favorite,
          .top-comment {
            color: #666666;
          }
        }
      }
    }
  }

  // 文章列表
  .articles {
    font-size: 10px;
  }

  // 轮播图
  .swiper-slide {
    img {
      width: 100%;
      height: auto;
    }
  }
}

// ipad 768px以上
@media screen and (min-width: 768px) {
  .content-main {
    max-width: 100%;
    .articles {
      font-size: 14px;
    }
  }
}

// 1200px以上
@media screen and (min-width: 1200px) {
  .content-main {
    max-width: 850px;

    .top {
      margin-top: 15px;
      margin-bottom: 15px;
      display: block;
    }
  }
}
</style>
