<template>
  <!-- 内容区 -->
  <div class="content-main flex flex-direction-column">
    <!-- 导航路径 -->
    <div class="nav-path mb15 p10 flex">
      <i class="fa fa-home mr5" />
      <span>关键字</span>
      <i class="fa fa-angle-double-right mr5 ml5" />
      <span>{{ condition }}</span>
    </div>
    <!-- 文章列表项 -->
    <div class="articles flex">
      <Loading :show="articlesDefaultFlag" style="top: 20px"></Loading>
      <div v-if="searchArticleList.length === 0 && !articlesDefaultFlag" style="height: 1000px; text-align: center">
        <h1 class="f16">没有数据</h1>
      </div>
      <ArticleItem
        v-else
        :articleItem="article"
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

export default {
  name: "Search",
  computed: {

  },
  methods: {

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
  width: 100%;

  // 文章列表
  .articles {
    font-size: 10px;
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
    }
  }
}

// 1200px以上
@media screen and (min-width: 1200px) {
  .content-main {
    max-width: 850px;
  }
}

</style>
