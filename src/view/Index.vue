<template>
  <!-- 内容区 -->
  <div class="content pr">
    <div class="content-main">
      <swiper :options="swiperOption" id="swiper">
        <!-- slides -->
        <swiper-slide v-for="image in swiperImageList" :key="image.src">
          <img :src="image" style="width: 100%; height: 100%;" />
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
      <!-- hot -->
      <div class="hot f16">
        <div class="title f14">热门文章</div>
        <div class="hot-content">
          <Loading :show="hotDefaultFlag" style="height: 182px;"></Loading>
          <ul class="hot-list">
            <li class="hot-item mb10" v-for="(blog, index) in hotArticles" :key="blog.id">
              <span class="hot-label mr5">{{ index + 1 }}</span>
              <a class="hot-title f14" :href="'/article/' + blog.id">{{ blog.title }}</a>
              <span class="hot-comment fr">
                <i class="fa fa-comment" style="color: #FF8E8E">&nbsp;{{ blog.comment }}评论</i>
              </span>
              <span class="hot-view mr15 fr">
                <i class="fa fa-eye" style="color: #3DB1AD">&nbsp;{{ blog.view }}浏览</i>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 文章列表项 -->
      <div class="articles">
        <Loading :show="articlesDefaultFlag" style="top: 20px;"></Loading>
        <ArticleItem :article="article" v-for="article in articles" :key="article.id"></ArticleItem>
      </div>
      <!-- 分页导航 -->
      <div class="mt-3" v-if="articles.length !== 0">
        <BPagination
          :total-rows="totalCount"
          :per-page="count"
          :value="page"
          first-text="首页"
          prev-text="上一页"
          next-text="下一页"
          last-text="尾页"
          limit="5"
          @change="loadData"
          align="center">
        </BPagination>
      </div>
    </div>
    <ContentSide />
  </div>
</template>

<script>
import ContentSide from "../components/ContentSide";
import Loading from "../components/Loading";
import 'swiper/dist/css/swiper.css'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import ArticleItem from "../components/ArticleItem";
import '../mock/index'
import {getSwiperImageList} from "../api/sy"
import {API_SUCCESS_CODE, API_SUCCESS_MESSAGE} from '../constant/commonConstant'

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
      swiperImageList: []
    }
  },
  components: {
    ContentSide,
    swiper,
    swiperSlide,
    ArticleItem,
    Loading
  },
  methods: {
    // 获取swiper轮播图列表
    getSwiperImageList() {
      getSwiperImageList().then(res =>{
        let outerData = res.data;
        if (API_SUCCESS_CODE === outerData.code && API_SUCCESS_MESSAGE === outerData.message) {
          let innerData = outerData.data;
          this.swiperImageList = innerData;
        }
      });
    },

    loadData(page) {
      this.articles = [];
      this.articleList(page, this.count);
    },
    articleList(page, count) {
      this.articlesDefaultFlag = true;
      this.axios.get("/api-frontend/index/articleList").then(res => {
        if (res.data.code === 0) {
          this.articles = res.data.data;
          this.page = page;
          this.count = count;
          this.totalPages = res.data.totalPages;
          this.totalCount = res.data.totalCount;
        }
        this.articlesDefaultFlag = false;
      }).catch(() => {
        this.articlesDefaultFlag = false;
      });
    },
    hotArticleList() {
      this.hotDefaultFlag = true;
      this.axios.get("/api-frontend/index/hotArticleList").then(res => {
        if (res.data.code === 0) {
          this.hotArticles = res.data.data;
        }
        this.hotDefaultFlag = false;
      }).catch(() => {
        this.hotDefaultFlag = false;
      });
    },
    sliderList() {
      this.axios.get("/api-frontend/index/sliderList").then(res => {
        if (res.data.code === 0) {
          this.slides = res.data.data;
        }
      });
    }
  },
  mounted() {
    this.articleList(this.page, this.count);
    this.hotArticleList();
    this.sliderList();
    this.getSwiperImageList();
  }
}
</script>

<style scoped lang="scss">
.ivu-scroll-wrapper {
  ::-webkit-scrollbar {
    display: none
  }
}
</style>
