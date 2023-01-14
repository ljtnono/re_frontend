<template>
  <!-- 内容区 -->
  <div class="content-main">
    <!-- 导航路径 -->
    <div class="nav-path mb15 mt15 p10">
      <i class="fa fa-home mr5" />
      <span>关键字</span>
      <i class="fa fa-angle-double-right mr5 ml5" />
      <span>{{ condition }}</span>
    </div>
    <!-- 文章列表项 -->
    <div class="articles">
      <Loading :show="articlesDefaultFlag" style="top: 20px"></Loading>
      <div v-if="searchArticleList.length === 0 && !articlesDefaultFlag" style="height: 1000px; text-align: center">
        <h1 class="f16">没有数据</h1>
      </div>
      <ArticleItem
        v-else
        :article="article"
        v-for="article in searchArticleList"
        :key="article.id">
      </ArticleItem>
    </div>
    <!-- 分页导航 -->
    <div></div>
  </div>
</template>

<script>
import ContentSide from "../components/ContentSide";
import ArticleItem from "../components/ArticleItem";
import { BPagination } from "bootstrap-vue";
import Loading from "../components/Loading";
import { mapState, mapActions } from "vuex";

export default {
  name: "Search",
  computed: {
    ...mapState({
      totalPages: (state) => state.search.totalPages,
      totalCount: (state) => state.search.totalCount,
      count: (state) => state.search.count,
      page: (state) => state.search.page,
      condition: (state) => state.search.condition,
      searchArticleList: (state) => state.search.searchArticleList,
      articlesDefaultFlag: (state) => state.search.articlesDefaultFlag,
    }),
  },
  methods: {
    ...mapActions(["loadData"]),
  },
  components: {
    ContentSide,
    ArticleItem,
    BPagination,
    Loading,
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
// 主要部分
.content-main {
  min-height: 1870px;

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

  // 导航路径
  .nav-path {
    background-color: #ffffff;

    span,
    i {
      font-size: 15px;
      color: #797979;
      cursor: pointer;

      &:hover {
        color: #00a46b;
      }
    }

    i.fa-home {
      font-size: 15px !important;
    }
  }

  .content-detail {
    .detail-nav {
      background-color: #ffffff;
      margin-bottom: 2px;

      i {
        color: #bbbbbb;
      }

      a {
        i.fa-home {
          color: #00a67c;
          font-size: 16px;
        }

        span {
          color: #00a67c;
          font-size: 14px;
        }
      }
    }

    .detail-header {
      background-color: #fff;
      margin-bottom: 2px;

      .article-title {
        color: #000000;
      }

      a {
        &:nth-of-type(1),
        &:nth-of-type(2) {
          span {
            color: #00a67c;
          }
        }

        i.fa {
          color: #999999;
          margin-right: 2px;
        }

        color: #999999;
      }
    }

    .detail-content {
      background-color: #ffffff;
      margin-bottom: 2px;
    }

    .detail-label {
      background-color: #ffffff;

      i {
        color: #999999;
      }

      .label {
        width: 70px;
        height: auto;
        position: relative;
        color: #ffffff;
        display: inline-block !important;
        background-color: #d9534f;
        text-align: center;
        border-radius: 0;
      }
    }

    .detail-pre-next {
      background-color: #fbfbfb;
      margin-bottom: 2px;

      .pre,
      .next {
        a {
          color: #00a67c;
        }
      }
    }

    .title {
      background-color: #ffffff;
      width: 100%;
      color: #00a67c;
      border-bottom: 1px solid #00a67c;
    }

    .detail-hot-list {
      background-color: #ffffff;
      margin-bottom: 2px;

      ul {
        li {
          height: 30px;
          overflow: hidden;
          line-height: 30px;
          color: #bbb;

          i {
            vertical-align: middle;
          }

          a {
            color: #00a67c;
          }
        }
      }
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
