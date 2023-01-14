<template>
  <article class="article mb10 p10 flex flex-direction-column" >
    <header class="article-header mb10 flex">
      <a :href="'/articles/' + article.type" class="mr5">
        <span class="article-label f12 mr5">
          {{ article.type }}
          <i class="label-arrow"/>
        </span>
      </a>
      <a :href="'/article/' + article.id">
        <span class="article-title f14">
          {{ article.title }}
        </span>
      </a>
    </header>
    <section class="article-detail flex">
      <div class="mr10 article-thumb cursor-pointer">
        <img :src="article.coverImage" :alt="article.title" :title="article.title"/>
      </div>
      <div class="article-summary flex flex-direction-column flex-justify-content-space-between">
        <a :href="'/article/' + article.id">{{ article.summary }}</a>
        <div class="article-info">
          <a href="#" class="pr5">
            <i class="fa fa-user pr5" aria-hidden="true"></i>
            <span style="color: #00a67c">{{ article.author }}</span>
          </a>
          <a href="#" class="pr5">
            <i class="fa fa-clock-o pr5" aria-hidden="true"></i>
            <span>{{ article.modifyTime | timeFormat }}</span>
          </a>
          <a href="#" class="pr5">
            <i class="fa fa-eye pr5" aria-hidden="true"></i>
            <span>{{ article.view }}浏览</span>
          </a>
          <a href="#" class="pr5">
            <i class="fa fa-comment pr5" aria-hidden="true"></i>
            <span>{{ article.comment }}评论</span>
          </a>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    article: Object,
  }
};
</script>

<style scoped lang="scss">
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

// ipad 768px以上
@media screen and (min-width: 768px) {
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

// 1200px以上
@media screen and (min-width: 1200px) {
  .article {
    .article-detail {
      .article-thumb {
        width: 180px;
        height: 120px;
      }
    }
  }
}
</style>
