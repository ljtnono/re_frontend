<template>
  <div id="app">
    <!-- 头部 -->
    <Header/>
    <!-- 消息通知栏 -->
    <MessageLabel/>
    <!-- 主要内容区域 -->
    <div class="content flex flex-direction-row flex-justify-content-space-between">
      <router-view class="flex"/>
      <content-side v-if="contentSideVisiablity" class="flex" />
    </div>
    <!-- 底部信息 -->
    <Footer/>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import MessageLabel from "@c/MessageLabel.vue";
import ContentSide from "@c/ContentSide.vue";
import {
  findFrontendWebsiteConfig,
  FRONTEND_WEBSITE_CONFIG_ACQUIRE_TYPE_ALL,
} from "@/api/sy";
import {
  HTTP_RESULT_SUCCESS_CODE,
  HTTP_RESULT_SUCCESS_MESSAGE,
} from "./constant/commonConstant";
import {mapState} from "vuex";

export default {
  name: "App",
  components: {
    ContentSide,
    Header,
    Footer,
    MessageLabel
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      contentSideVisiablity: state => {
        let route = state.common.activeRoute;
        if (route.name === "Support" || route.name === "About") {
          return false;
        }
        return true;
      }
    })
  },
  methods: {
    // 保存前端站点配置
    saveFrontendWebsiteConfig() {
      findFrontendWebsiteConfig(FRONTEND_WEBSITE_CONFIG_ACQUIRE_TYPE_ALL).then((res) => {
        let data = res.data;
        if (
          data.code === HTTP_RESULT_SUCCESS_CODE &&
          data.message === HTTP_RESULT_SUCCESS_MESSAGE
        ) {
          let item = data.data.values;
          localStorage.setItem("FrontendWebsiteConfig", JSON.stringify(item));
        } else {
          // TODO 使用本地默认图片代替
          console.log("==========获取站点信息失败！");
        }
      }).catch((e) => {
        // TODO 使用本地默认图片代替，考虑定时任务刷新
        console.log("==========接口调用失败！", e);
      });
    },
  },
  mounted() {
    // 每次页面刷新都请求一下保存前端站点配置
    this.saveFrontendWebsiteConfig();
  },
};
</script>

<style scoped lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  margin: 0;
  padding: 0;
}

body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.content {
  height: auto;
  width: auto;
  max-width: 1200px;
  margin: 15px auto 0;
  z-index: 998;
  font: 14px Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;
}
</style>
