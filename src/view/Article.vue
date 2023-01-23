<template>
  <!-- 文章详情部分 -->
  <div class="content-main flex flex-direction-column">
    <div class="content-detail mt15">
      <!-- 文章详情面包屑导航 -->
<!--      <nav class="detail-nav p10">-->
<!--        <a href="/">-->
<!--          <i class="fa fa-home" />-->
<!--        </a>-->
<!--        <i class="fa fa-angle-double-right mr5 ml5" />-->
<!--        <a href="/articles/ALL">-->
<!--          <span>技术文章</span>-->
<!--        </a>-->
<!--        <i class="fa fa-angle-double-right mr5 ml5" />-->
<!--        <a :href="'/articles/' + article.category">-->
<!--          <span>{{ article.category }}</span>-->
<!--        </a>-->
<!--        <i class="fa fa-angle-double-right mr5 ml5" />-->
<!--        <a :href="'/article/' + article.id">-->
<!--          <span>{{ article.title }}</span>-->
<!--        </a>-->
<!--      </nav>-->
      <!-- 文章详情头部 -->
<!--      <header class="detail-header p10">-->
<!--        <a href="javascript:" class="mr5">-->
<!--          <i class="fa fa-list" />-->
<!--          <span>{{ article.category }}</span>-->
<!--        </a>-->
<!--        <a href="javascript:" class="mr5">-->
<!--          <i class="fa fa-user" />-->
<!--          <span>{{ article.author }}</span>-->
<!--        </a>-->
<!--        <a href="javascript:" class="mr5">-->
<!--          <i class="fa fa-calendar-times-o" />-->
<!--          <span>{{ article.finalUpdateTime | timeFormat }}</span>-->
<!--        </a>-->
<!--        <a href="javascript:" class="mr5"><i class="fa fa-eye" />-->
<!--          <span>{{ article.view }}浏览</span>-->
<!--        </a>-->
<!--        <a href="javascript:" class="mr5">-->
<!--          <i class="fa fa-comment" />-->
<!--          <span>{{ article.favorite }}评论</span>-->
<!--        </a>-->
<!--      </header>-->
      <!-- 文章内容部分 -->
      <div class="detail-content" id="detail-content" style="min-height: 1000px">
        <mavon-editor
          ref="md"
          :scroll-style="editorConfig.scrollStyle"
          :box-shadow="editorConfig.boxShadow"
          :transition="editorConfig.transition"
          :subfield="editorConfig.subfield"
          :defaultOpen="editorConfig.defaultOpen"
          :editable="editorConfig.editable"
          :code-style="editorConfig.codeStyle"
          :toolbars-flag="editorConfig.toolbarsFlag"
          :ishljs="editorConfig.ishljs"
          :preview-background="editorConfig.previewBackground"
          :value="article.markdownContent"
          style="width: 100%; height: 100%" />
      </div>
<!--      <div class="detail-label p10">-->
<!--        <i class="fa fa-tag f20"></i>-->
<!--        <a class="label" :href="'/articles/' + article.category">-->
<!--          {{ article.category }}-->
<!--        </a>-->
<!--      </div>-->
      <!--留言区-->
<!--      <div class="title p10">网友评论</div>-->
<!--      <div class="mb20 p10" id="comments" style="background-color: #ffffff">-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
import ContentSide from "@/components/ContentSide";
import {EDITOR_CONFIG} from "@/config/commonConfig";
import {findArticleById} from "@/api/article";

export default {
  name: "Article",
  data() {
    return {
      // 文章详情
      article: {
        id: null,
        title: null,
        summary: null,
        markdownContent: null,
        htmlContent: null,
        category: null,
        author: null,
        coverUrl: "",
        view: 0,
        favorite: 0,
        recommend: 0,
        top: 0,
        createType: 1,
        transportInfo: null,
        quoteInfo: null,
        finalUpdateTime: null,
        tagList: []
      },
      // mavonEditor配置项
      editorConfig: EDITOR_CONFIG
    };
  },
  methods: {
    // 初始化文章详情数据
    initArticleDetail(articleId) {
      findArticleById(articleId).then(res => {
        this.article = res.data.data;
      });
    }
  },
  created() {
  },
  mounted() {
    let articleId = this.$route.params.articleId;
    this.initArticleDetail(articleId);
  },
  components: {
    ContentSide
  }
};
</script>

<style scoped lang="scss">

// 修复部分因base.scss文件中重置样式导致的markdown渲染问题
::v-deep ul, ::v-deep ol {
  list-style: disc;
}

// 主要部分
.content-main {

  width: 100%;

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
    .title {
      background-color: #ffffff;
      color: #00a67c;
      border-bottom: 1px solid #00a67c;
    }
  }
}

// ipad 768px以上
@media screen and (min-width: 768px) {
  .content-main {
    max-width: 100%;
  }
}

// 1200px以上
@media screen and (min-width: 1200px) {
  .content-main {
    max-width: 850px;
  }
}

</style>
