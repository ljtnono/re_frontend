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
            <a class="top-title f14" :href="'/article/' + article.id">{{ article.title }}</a>
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
      <ul class="infinite-list" v-infinite-scroll="getArticleScroll"  infinite-scroll-delay="200" infinite-scroll-distance="50" infinite-scroll-immediate="true">
        <ArticleItem :articleItem="article" v-for="article of scrollArticleList" :key="article.id"/>
      </ul>
    </div>
  </div>
</template>

<script>
import ContentSide from "../components/ContentSide";
import "swiper/dist/css/swiper.css";
import ArticleItem from "../components/ArticleItem";
import {findArticleScroll, findArticleTopList} from "@/api/article";

export default {
  name: "Index",
  data() {
    return {
      hotDefaultFlag: true,
      articlesDefaultFlag: true,
      swiperOption: this.$config.swiperOption,
      count: 10,
      page: 1,
      articles: [],
      totalPages: 1,
      totalCount: 1,
      slides: [],
      swiperImageList: [],
      // 置顶文章当前页码
      topArticleListPageNum: 1,
      // 置顶文章每页条数
      topArticleListPageSize: 10,
      // 置顶文章列表
      topArticleList: [],
      // 无限滚动文章当前页码
      scrollArticlePageNum: 1,
      // 无限滚动文章每页条数
      scrollArticlePageSize: 10,
      scrollArticleTotal: null,
      scrollArticleList: [],
    };
  },
  computed: {
  },
  components: {
    ContentSide,
    ArticleItem
  },
  methods: {
    // 去重
    unique(arr, key) {
      let map = new Map()
      arr.forEach((item, index) => {
        if (!map.has(item[key])) {
          map.set(item[key], item);
        }
      })
      return [...map.values()];
    },
    // 获取置顶文章列表
    getTopArticleList() {
      let pageNum = this.topArticleListPageNum;
      let pageSize = this.topArticleListPageSize;
      findArticleTopList(pageNum, pageSize).then(res => {
        let data = res.data.data;
        this.topArticleList = data.records;
      });
    },
    // 初始化无限滚动
    initScrollData() {
      this.scrollArticleTotal = null;
      this.scrollArticlePageNum = 1;
      this.scrollArticlePageSize = 10;
      this.scrollArticleList = [];
    },
    // 无限滚动获取文章列表
    getArticleScroll() {
      let pageNum = this.scrollArticlePageNum;
      let pageSize = this.scrollArticlePageSize;
      // 判断是否发送请求
      let total = this.scrollArticleTotal;
      let length = this.scrollArticleList.length;
      let scrollArticleList = [...this.scrollArticleList];
      if (length < total || total === null) {
        findArticleScroll(pageNum, pageSize).then(res => {
          let data = res.data.data;
          let records = data.records;
          // 去重
          scrollArticleList.push(...records);
          this.scrollArticleList = this.unique(scrollArticleList, "id");
          this.scrollArticlePageSize = data.size;
          this.scrollArticlePageNum = data.current + 1;
          this.scrollArticleTotal = data.total;
        });
      }
    },
  },
  mounted() {
    // 获取置顶文章列表
    this.getTopArticleList();
    // 初始化无限滚动
    this.initScrollData();
  }
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

  // 置顶文章
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
