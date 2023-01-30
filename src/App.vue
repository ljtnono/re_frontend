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
  findFriendLinkList,
  findFrontendWebsiteConfig,
  FRONTEND_WEBSITE_CONFIG_ACQUIRE_TYPE_ALL,
} from "@/api/sy";
import {
  HTTP_RESULT_SUCCESS_CODE,
  HTTP_RESULT_SUCCESS_MESSAGE,
} from "./constant/commonConstant";
import {mapMutations, mapState} from "vuex";
import {findHotTagList} from "@/api/tag";

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
      // 右侧栏可见性
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
    // 获取热门标签列表
    saveHotTagList() {
      findHotTagList().then(res => {
        let data = res.data.data;
        this.$store.commit("common/changeHotTagList", data);
      });
    },
    // 获取友情连接列表
    saveFriendLinkList() {
      findFriendLinkList().then(res => {
        let data = res.data.data;
        this.$store.commit("common/changeFriendLinkList", data);
      });
    },
    // 获取站点配置
    saveWebsiteConfig() {
      findFrontendWebsiteConfig(FRONTEND_WEBSITE_CONFIG_ACQUIRE_TYPE_ALL).then((res) => {
        let data = res.data;
        let item = data.data.values;
        // 设置相关数据
        let author = {
          // 头像地址
          avatar: item["AVATAR_URL"],
          // 博主网名
          nickName: item["NICK_NAME"],
          // 博主邮箱
          email: item["AUTHOR_QQ"] + "@qq.com",
          // 博主地址
          addr: "北京",
          // 自己给自己贴标签
          tagList: ["理想主义者", "技术宅", "天然呆"],
          // 职业
          job: "程序员",
          // 微信
          wechat: item["AUTHOR_WX"],
          // QQ
          qq: item["AUTHOR_QQ"],
          // github
          github: item["GITHUB_AUTHOR"],
          // 微信二维码地址
          wechatQrCodeUrl: item["AUTHOR_WX_QRCODE_URL"],
          // github用户名
          githubUsername: item["AUTHOR_GITHUB_USERNAME"],
          // 微信支付二维码地址
          wechatPayQrCodeUrl: item["AUTHOR_WX_PAY_QRCODE_URL"],
          // 关于作者信息
          about: item["ABOUT_AUTHOR"],
          // 支付宝支付二维码地址
          alipayPayQrCode: item["AUTHOR_ALIPAY_PAY_QRCODE_URL"]
        };
        let websiteConfig = {
          // 博客的github地址
          GITHUB_WEBSITE: item["GITHUB_WEBSITE"],
          // 博客footer部分关于相关信息
          FOOTER_ABOUT_WEBSITE: item["FOOTER_ABOUT_WEBSITE"],
          // 博客版权信息
          FOOTER_COPYRIGHT: item["FOOTER_COPYRIGHT"],
          // 博客备案号
          WEBSITE_ICP_CODE: item["WEBSITE_ICP_CODE"],
          // footer网站驱动信息
          FOOTER_DRIVER: item["FOOTER_DRIVER"],
          // 博客头部的LOGO地址
          HEADER_LOGO_URL: item["HEADER_LOGO_URL"],
          // TODO rss订阅地址，暂时没有该功能
          RSS_URL: "敬请期待",
          // 发送邮件给我
          SEND_ME_EMAIL: item["SEND_ME_EMAIL"],
        };
        this.$store.commit("common/changeAuthor", author);
        this.$store.commit("common/changeWebsiteConfig", websiteConfig);
      });
    }
  },
  mounted() {
    // 每次页面刷新都请求一下保存前端站点配置
    this.saveWebsiteConfig();
    this.saveHotTagList();
    this.saveFriendLinkList();
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
