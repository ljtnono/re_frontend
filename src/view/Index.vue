<template>
  <!-- 内容区 -->
  <div class="content-main flex flex-direction-column">
<!--    <div class="swiper-container flex">-->
<!--      <swiper :options="swiperOption" id="swiper">-->
<!--        &lt;!&ndash; slides &ndash;&gt;-->
<!--        <swiper-slide v-for="image in swiperImageList" :key="image.src">-->
<!--          <img :src="image" style="width: 100%; height: 100%" />-->
<!--        </swiper-slide>-->
<!--        &lt;!&ndash; Optional controls &ndash;&gt;-->
<!--        <div class="swiper-pagination" slot="pagination" />-->
<!--        <div class="swiper-button-prev" slot="button-prev" />-->
<!--        <div class="swiper-button-next" slot="button-next" />-->
<!--      </swiper>-->
<!--    </div>-->
    <!-- hot -->
    <div class="hot f16 flex">
      <div class="title f14">热门文章</div>
      <div class="hot-content">
        <Loading :show="hotDefaultFlag" style="height: 182px"></Loading>
        <ul class="hot-list">
          <li class="hot-item mb10" v-for="(blog, index) in hotArticles" :key="blog.id">
            <span class="hot-label mr5">{{ index + 1 }}</span>
            <a class="hot-title f14" :href="'/article/' + blog.id">{{blog.title }}</a>
            <span class="hot-comment fr">
                <i class="fa fa-comment" style="color: #ff8e8e">
                  &nbsp;{{ blog.comment }}评论
                </i>
              </span>
            <span class="hot-view mr15 fr">
                <i class="fa fa-eye" style="color: #3db1ad">
                  &nbsp;{{ blog.view }}浏览
                </i>
              </span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 文章列表项 -->
    <div class="articles flex flex-direction-column">
      <ArticleItem
        :article="article"
        v-for="article in articles"
        :key="article.id">
      </ArticleItem>
    </div>
    <!-- 分页导航 -->
    <div></div>
  </div>
</template>

<script>
import ContentSide from "../components/ContentSide";
import Loading from "../components/Loading";
import "swiper/dist/css/swiper.css";
import {swiper, swiperSlide} from "vue-awesome-swiper";
import ArticleItem from "../components/ArticleItem";
import "../mock/index";
import {getSwiperImageList} from "@/api/sy";
import {API_SUCCESS_CODE, API_SUCCESS_MESSAGE,} from "@/constant/commonConstant";

export default {
  name: "Index",
  data() {
    return {
      hotDefaultFlag: true,
      articlesDefaultFlag: true,
      swiperOption: this.$config.swiperOption,
      hotArticles: [],
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
    swiper,
    swiperSlide,
    ArticleItem,
    Loading,
  },
  methods: {
    // 获取swiper轮播图列表
    getSwiperImageList() {
      getSwiperImageList().then((res) => {
        let outerData = res.data;
        if (
          API_SUCCESS_CODE === outerData.code &&
          API_SUCCESS_MESSAGE === outerData.message
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
      this.axios
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
      this.axios
        .get("/api-frontend/index/hotArticleList")
        .then((res) => {
          if (res.data.code === 0) {
            this.hotArticles = res.data.data;
          }
          this.hotDefaultFlag = false;
        })
        .catch(() => {
          this.hotDefaultFlag = false;
        });
    },
    sliderList() {
      this.axios.get("/api-frontend/index/sliderList").then((res) => {
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
  .hot {
    background-color: #ffffff;
    padding: 10px 20px;
    display: none;

    .title {
      width: 100%;
      height: 26px;
      color: #1abc9c;
      border-bottom: 1px solid #1abc9c;
    }

    .hot-content {
      width: 100%;
      margin-top: 2px;

      .hot-list {
        width: 100%;
        height: auto;

        .hot-item {
          &:nth-of-type(1) {
            .hot-label {
              background-color: #ff858e;
            }
          }

          &:nth-of-type(2) {
            .hot-label {
              background-color: #6fc299;
            }
          }

          &:nth-of-type(3) {
            .hot-label {
              background-color: #81c1f2;
            }
          }

          span {
            display: inline-block;
            font-size: 14px;
          }

          .hot-label {
            width: 20px;
            height: 20px;
            color: #ffffff;
            display: inline-block;
            background-color: #999999;
            font-size: 14px;
            text-align: center;
          }

          .hot-title {
            color: #00a67c;

            &:hover {
              text-decoration: underline;
            }
          }

          .hot-view,
          .hot-comment {
            color: #666666;
          }
        }
      }
    }
  }

  // 文章列表
  .articles {
    font-size: 10px;

    .article {
      background-color: #ffffff;
      height: 115px;

      .article-header {
        .article-title {
          vertical-align: middle;
          color: #00a67c;
        }
      }

      .article-detail {
        a {
          text-decoration: none;
          display: inline-block !important;
          overflow: hidden;
        }

        .article-thumb {
          overflow: hidden;
          width: 90px;
          height: 60px;

          &:hover {
            img {
              transform: scale(1.2);
              -webkit-transform: scale(1.2);
              -moz-transform: scale(1.2);
            }
          }

          img {
            width: 100%;
            height: 100%;
            display: block;
            transition: all ease-in-out 0.8s;
            -webkit-transition: all ease-in-out 0.8s;
            -moz-transition: all ease-in-out 0.8s;
          }
        }

        .article-summary {
          overflow: hidden;
          height: 60px;
          flex: 1;

          a {
            color: #00a67c;
            line-height: 14px;
            overflow: hidden;

            &:hover {
              text-decoration: underline;
              text-underline: #00a67c;
            }
          }

          .article-info {
            height: 18px;

            a,
            span {
              color: #999999;
            }
          }
        }
      }
    }
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

      .article {
        height: 170px;

        .article-detail {
          height: 120px;

          .article-thumb {
            width: 180px;
            height: 120px;
          }

          .article-summary {
            height: 120px;

            a {
              height: 80px;
              line-height: 16px;
            }

            .article-info {
              height: 20px;

              a {
                height: 20px;
                line-height: 20px;
              }
            }
          }
        }
      }
    }
  }
}

// 1200px以上
@media screen and (min-width: 1200px) {
  .content-main {
    max-width: 850px;

    .hot {
      margin-top: 15px;
      margin-bottom: 15px;
      display: block;
    }

    .articles {
      .article {
        .article-detail {
          .article-thumb {
            width: 180px;
            height: 120px;
          }
        }
      }
    }
  }
}
</style>
