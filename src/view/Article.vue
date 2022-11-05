<template>
  <!-- 内容区 -->
  <div class="content pr">
    <!-- 文章详情部分 -->
    <div class="content-main">
      <section class="content-detail mt15">
        <nav class="detail-nav p10">
          <a href="/">
            <i class="fa fa-home" />
          </a>
          <i class="fa fa-angle-double-right mr5 ml5" />
          <a href="/articles/ALL">
            <span>技术文章</span>
          </a>
          <i class="fa fa-angle-double-right mr5 ml5" />
          <a :href="'/articles/' + article.category">
            <span>{{ article.category }}</span>
          </a>
          <i class="fa fa-angle-double-right mr5 ml5" />
          <a :href="'/article/' + article.id">
            <span>{{ article.title }}</span>
          </a>
        </nav>
        <header class="detail-header p10">
          <a href="javascript:" class="mr5"><i class="fa fa-list"></i><span>{{ article.category }}</span></a>
          <a href="javascript:" class="mr5"><i class="fa fa-user"></i><span>{{ article.author }}</span></a>
          <a href="javascript:" class="mr5">
            <i class="fa fa-calendar-times-o"></i><span>{{ article.finalUpdateTime | timeFormat }}</span>
          </a>
          <a href="javascript:" class="mr5"><i class="fa fa-eye"></i><span>{{ article.view }}浏览</span></a>
          <a href="javascript:" class="mr5"><i class="fa fa-comment"></i><span>{{ article.favorite }}评论</span></a>
        </header>
        <section class="detail-content" id="detail-content" style="min-height: 1000px">
          <mavon-editor
            class="md"
            :value="article.markdownContent"
            :subfield="false"
            :defaultOpen="'preview'"
            :toolbarsFlag="false"
            :editable="false"
            :scrollStyle="true"
            :boxShadow="false"
            :transition="true"
            :previewBackground="'#ffffff'"
            :ishljs="true" style="border: none;padding: 0;">
          </mavon-editor>
        </section>
        <section class="detail-label p10">
          <i class="fa fa-tag f20"></i>
          <a class="label" :href="'/articles/' + article.category">
            {{ article.category }}
          </a>
        </section>
        <!--        <section class="detail-pre-next p10 flex flex-justify-content-space-between">-->
        <!--          <div class="pre" v-if="blog.prev != null">-->
        <!--            <a th:href="'/article/' + ${prev.id}" th:inline="text"><i class="fa fa-angle-double-left"></i>{{blog.prev.title}}</a>-->
        <!--          </div>-->
        <!--          <div class="next" v-if="blog.next != null">-->
        <!--            <a th:href="'/article/' + ${next.id}" th:inline="text">[[${next.title}]]<i class="fa fa-angle-double-right"></i></a>-->
        <!--          </div>-->
        <!--        </section>-->
        <!--        <section class="detail-hot-list p10">-->
        <!--          <ul>-->
        <!--            <li class="mb10 mr10" th:each="blog : ${application.guessYouLikeList}"><i class="fa fa-minus"></i><a th:href="'/article/' + ${blog.id}" class="ml5" th:text="${blog.title}">[Python3 网络爬虫开发实战]9.5-使用代理爬取微信</a></li>-->
        <!--          </ul>-->
        <!--        </section>-->
        <!--留言区-->
        <div class="title p10">网友评论</div>
        <section class="mb20 p10" id="comments" style="background-color:#FFFFFF;"></section>

      </section>
    </div>
    <ContentSide />
  </div>
</template>

<script>
import ContentSide from "../components/ContentSide";
import {findArticleById} from "@/api/article";
import {API_SUCCESS_CODE, API_SUCCESS_MESSAGE} from "@/constant/commonConstant";

export default {
  name: "Article",
  data() {
    return {
      article: {
        id: null,
        title: "",
        summary: "",
        markdownContent: "",
        htmlContent: "",
        category: "",
        author: "",
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
      }
    }
  },
  methods: {
    findArticleById(articleId) {
      findArticleById(articleId).then(res => {
        let outerData = res.data;
        if (API_SUCCESS_CODE === outerData.code && API_SUCCESS_MESSAGE === outerData.message) {
          let innerData = outerData.data;
          this.article = innerData;
        }
      });
    }
  },
  mounted() {
    this.findArticleById(5);
  },
  components: {
    ContentSide
  },
  props: {
    articleId: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style scoped lang="scss">

</style>
