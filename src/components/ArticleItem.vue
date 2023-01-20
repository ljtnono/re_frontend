<template>
  <div class="article-item mb10 flex flex-direction-column">
    <!-- 标题部分 -->
    <div class="article-item-header mb10">
      <a class="mr5" :href="'/articles/' + articleItem.category">
        {{ articleItem.category }}
      </a>
      <a class="article-item-title f14" href="javascript:" @click="$router.push({path: '/article/' + articleItem.id})">
        {{ articleItem.title }}
      </a>
    </div>
    <!-- 内容部分 -->
    <div class="article-item-body flex flex-direction-row flex-justify-content-space-between" @click="$router.push({path: '/article/' + articleItem.id})">
      <!-- 缩略图 -->
      <div class="article-item-thumb cursor-pointer mr5 flex" >
        <img :src="articleItem.coverUrl" :alt="articleItem.title" :title="articleItem.title"/>
      </div>
      <!-- 详情 -->
      <div class="article-item-detail flex flex1">
        <div class="article-item-summary">
          <!-- 简介 -->
          <p>{{ articleItem.summary }}</p>
          <!-- 文章数据信息 -->
          <div class="article-item-info" >
            <a href="#" class="pr5">
              <i class="fa fa-user pr5" aria-hidden="true"></i>
              <span style="color: #00a67c">{{ articleItem.author }}</span>
            </a>
            <a href="#" class="pr5">
              <i class="fa fa-clock-o pr5" aria-hidden="true"></i>
              <span>{{ articleItem.modifyTime | timeFormat }}</span>
            </a>
            <a href="#" class="pr5">
              <i class="fa fa-eye pr5" aria-hidden="true"></i>
              <span>{{ articleItem.view }}浏览</span>
            </a>
            <a href="#" class="pr5">
              <i class="fa fa-comment pr5" aria-hidden="true"></i>
              <span>{{ articleItem.comment }}评论</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    articleItem: Object
  }
};
</script>

<style scoped lang="scss">
.article-item {
  height: 115px;
  width: 100%;
  padding: 10px 10px 0;
  background-color: #ffffff;
  box-sizing: border-box;

  .article-item-header {

    .article-item-title {
      vertical-align: middle;
      color: #00a67c;

    }
  }

  .article-item-body {
    height: 100%;

    .article-item-thumb {
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

    .article-item-detail {

      .article-item-summary {
        height: 60px;
        overflow: hidden;

        p {
          overflow: hidden;
          display: inline-block !important;
          color: #00a67c;
          cursor: pointer;

          &:hover {
            text-decoration: underline;
            text-underline: #00a67c;
          }
        }

        .article-item-info {
          height: 18px;
          a, span {
            color: #999999;
          }
        }
      }
    }
  }
}

// ipad 768px以上
@media screen and (min-width: 768px) {
  .article-item {
    height: 170px;

    .article-item-body {

      .article-item-thumb {
        width: 180px;
        height: 120px;
      }

      .article-item-detail {
        height: 120px;

        .article-item-summary {
          height: 120px;
          position: relative;

          p {
            height: 80px;
            line-height: 16px;
          }

          .article-item-info {
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

// 1200px以上
@media screen and (min-width: 1200px) {
  .article-item {

    .article-item-body {

      .article-item-thumb {
        width: 180px;
        height: 120px;
      }
    }
  }
}
</style>
