<template>
  <div class="content-main flex flex-direction-column">
    <!-- 导航路径 -->
    <div class="nav-path mb15 p10">
      <i class="fa fa-home mr5" />
      <span>技术文章</span>
      <i class="fa fa-angle-double-right mr5 ml5" />
      <span>{{ type }}</span>
    </div>
    <!-- 文章列表项 -->
    <div class="articles">
      <Loading :show="articlesDefaultFlag" style="top: 20px" />
      <div v-if="articles.length === 0 && !articlesDefaultFlag" style="height: 1000px; text-align: center">
        <h1 class="f16">没有数据</h1>
      </div>
      <ArticleItem v-else :article="article" v-for="article in articles" :key="article.id" />
    </div>
    <!-- 分页导航 -->
    <div></div>
  </div>
</template>

<script>
import { listBlogPageByType } from "@/api/blog";
import ContentSide from "../components/ContentSide";
import ArticleItem from "../components/ArticleItem";
import Loading from "../components/Loading";
import { BPagination } from "bootstrap-vue";

export default {
  name: "Articles",
  data() {
    return {
      articlesDefaultFlag: true,
      articles: [],
      totalPages: 1,
      totalCount: 1,
      count: 10,
      page: 1,
      type: "ALL",
    };
  },
  methods: {
    loadData(page) {
      let pageParam = {
        page: page,
        count: this.count,
      };
      this.articles = [];
      this.listBlogPageByType(this.type, pageParam);
    },
    listBlogPageByType(type, pageParam) {
      this.articlesDefaultFlag = true;
      listBlogPageByType(type, pageParam)
        .then((res) => {
          if (res.data.request === "success" && res.data.status === 200) {
            let data = res.data.data;
            this.articles = data;
            this.page = pageParam.page;
            this.count = pageParam.count;
            this.totalPages = parseInt(res.data.fields.totalPages);
            this.totalCount = parseInt(res.data.fields.totalCount);
          }
          this.articlesDefaultFlag = false;
        })
        .catch(() => {
          this.articlesDefaultFlag = false;
        });
    },
  },
  mounted() {
    let pageParam = {
      page: 1,
      count: this.count,
    };
    this.type = this.$route.params.type || "ALL";
    this.listBlogPageByType(this.type, pageParam);
  },
  components: {
    ContentSide,
    ArticleItem,
    BPagination,
    Loading,
  },
};
</script>

<style scoped lang="scss">
// 主要部分
.content-main {
  min-height: 1870px;
  width: 100%;

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

    span, i {
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
