<template>
  <article class="article mb10 p10" v-if="article.status === 1">
    <header class="article-header mb10">
      <a :href="'/articles/' + article.type" class="mr5">
        <span class="article-label f12 mr5">{{ article.type }}<i class="label-arrow" /></span>
      </a>
      <a :href="'/article/' + article.id">
        <span class="article-title f14">{{ article.title }}</span>
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
            <span style="color: #00A67C;">{{ article.author }}</span>
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
    article: Object
  }
}
</script>

<style scoped lang="scss">

</style>
