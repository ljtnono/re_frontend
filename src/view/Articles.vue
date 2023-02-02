<template>
  <div class="content-main flex flex-direction-column">
<!--    &lt;!&ndash; 导航路径 &ndash;&gt;-->
<!--    <div class="nav-path mb15 p10 flex">-->
<!--      <i class="fa fa-home mr5" />-->
<!--      <span>技术文章</span>-->
<!--      <i class="fa fa-angle-double-right mr5 ml5" />-->
<!--      <span>{{ type }}</span>-->
<!--    </div>-->
    <!-- 文章列表项 -->
    <div class="articles flex">
      <div v-if="articles.length === 0 && !articlesDefaultFlag" style="height: 1000px; text-align: center">
        <h1 class="f16">没有数据</h1>
      </div>
      <ArticleItem v-else :articleItem="article" v-for="article in articles" :key="article.id" />
    </div>
  </div>
</template>

<script>
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
      type: "ALL"
    };
  },
  methods: {

  },
  mounted() {
  },
  components: {
    ContentSide,
    ArticleItem,
    BPagination,
    Loading
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
