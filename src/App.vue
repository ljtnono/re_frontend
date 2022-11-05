<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import {findFrontendWebsiteConfig, FRONTEND_WEBSITE_CONFIG_ACQUIRE_TYPE_ALL} from "@/api/sy";
import {API_SUCCESS_CODE, API_SUCCESS_MESSAGE} from './constant/commonConstant'
import {findArticleById} from "@/api/article"

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  methods: {
    // 保存前端站点配置
    saveFrontendWebsiteConfig() {
      findFrontendWebsiteConfig(FRONTEND_WEBSITE_CONFIG_ACQUIRE_TYPE_ALL).then(res => {
        let data = res.data;
        if (data.code === API_SUCCESS_CODE && data.message === API_SUCCESS_MESSAGE) {
          let item = data.data.values;
          localStorage.setItem("FrontendWebsiteConfig", JSON.stringify(item));
        } else {
          // TODO 使用本地默认图片代替
          console.log("==========获取站点信息失败！");
        }
      }).catch(e => {
        // TODO 使用本地默认图片代替，考虑定时任务刷新
        console.log("==========接口调用失败！", e);
      })
    }
  },
  mounted() {
    // 每次页面刷新都请求一下保存前端站点配置
    this.saveFrontendWebsiteConfig();
    console.log(findArticleById(5));
  }
}
</script>

<style scoped lang="scss">

</style>
