<template>
  <div id="app">
    <!-- 头部 -->
    <Header/>
    <!-- 消息通知栏 -->
    <MessageLabel v-if="messageLabelVisibility"/>
    <!-- 主要内容区域 -->
    <div class="content flex flex-direction-row flex-justify-content-space-between">
      <router-view class="main-view"/>
      <content-side v-if="contentSideVisiablity" class="side-view" />
    </div>
    <!-- 底部信息 -->
    <Footer/>
    <!-- 回到顶部 -->
    <ToTop/>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import MessageLabel from "@c/MessageLabel.vue";
import ContentSide from "@c/ContentSide.vue";
import ToTop from "@c/ToTop.vue";
import {findFrontendWebsiteConfig, FRONTEND_WEBSITE_CONFIG_ACQUIRE_TYPE_ALL,} from "@/api/websiteConfig";
import {mapState} from "vuex";
import {findHotTagList} from "@/api/tag";
import {findFriendLinkList} from "@/api/friendLink";
import {findFrontendMenu} from "@/api/menu";

export default {
  name: "App",
  components: {
    ContentSide,
    Header,
    Footer,
    MessageLabel,
    ToTop
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      // 右侧栏可见性
      messageLabelVisibility: state => {
        let route = state.common.activeRoute;
        return route.name !== "404" && route.name !== "500";
      },
      contentSideVisiablity: state => {
        let route = state.common.activeRoute;
        if (route.name === "About" || route.name === "404" || route.name === "500") {
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
    },
    saveMenu() {
      findFrontendMenu().then(res => {
        let data = res.data.data;
        this.$store.commit("common/changeMenu", data);
      });
    }
  },
  mounted() {
    // 每次页面刷新都请求一下保存前端站点配置
    this.saveWebsiteConfig();
    this.saveHotTagList();
    this.saveFriendLinkList();
    this.saveMenu();
  },
};
</script>

<style scoped lang="scss">
#app {
  width: 100%;
  min-height: 100%;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.content {
  height: auto;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;

  .main-view {
    flex: 1;
    min-width: 0;
  }


  .side-view {
    flex-shrink: 0;
    width: 300px;
  }
  max-width: 1200px;
  margin: 14px auto 0;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 998;
  font: 14px Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;
}
</style>
