<template>
  <div id="app">
    <!-- 头部 -->
    <Header/>
    <!-- 消息通知栏 -->
    <MessageLabel v-if="messageLabelVisibility"/>
    <!-- 主要内容区域 -->
    <div class="content">
      <router-view class="main-view"/>
      <ContentSide v-if="contentSideVisibility" class="side-view"/>
    </div>
    <!-- 底部信息 -->
    <Footer/>
    <!-- 回到顶部 -->
    <ToTop/>
  </div>
</template>

<script setup>
import {computed, onMounted} from "vue";
import Header from "@c/Header.vue";
import Footer from "@c/Footer.vue";
import MessageLabel from "@c/MessageLabel.vue";
import ContentSide from "@c/ContentSide.vue";
import ToTop from "@c/ToTop.vue";
import {useCommonStore} from "@/store";
import {findFrontendWebsiteConfig, FRONTEND_WEBSITE_CONFIG_ACQUIRE_TYPE_ALL} from "@/api/websiteConfig";
import {findHotTagList} from "@/api/tag";
import {findFriendLinkList} from "@/api/friendLink";

const commonStore = useCommonStore();

const isErrorPage = computed(() => {
  let name = commonStore.activeRoute?.name;
  return name === "404" || name === "500";
});

// 右侧栏可见性：关于作者和错误页面不显示
const contentSideVisibility = computed(() => {
  let name = commonStore.activeRoute?.name;
  return name !== "About" && !isErrorPage.value;
});

// 公告栏可见性：错误页面不显示
const messageLabelVisibility = computed(() => !isErrorPage.value);

// 获取站点配置
function saveWebsiteConfig() {
  findFrontendWebsiteConfig(FRONTEND_WEBSITE_CONFIG_ACQUIRE_TYPE_ALL).then((res) => {
    let item = res.data.data.values;
    commonStore.changeAuthor({
      avatar: item["AVATAR_URL"],
      nickName: item["NICK_NAME"],
      email: item["AUTHOR_QQ"] + "@qq.com",
      addr: "北京",
      tagList: ["理想主义者", "技术宅", "天然呆"],
      job: "程序员",
      wechat: item["AUTHOR_WX"],
      qq: item["AUTHOR_QQ"],
      github: item["GITHUB_AUTHOR"],
      wechatQrCodeUrl: item["AUTHOR_WX_QRCODE_URL"],
      githubUsername: item["AUTHOR_GITHUB_USERNAME"],
      wechatPayQrCodeUrl: item["AUTHOR_WX_PAY_QRCODE_URL"],
      about: item["ABOUT_AUTHOR"],
      alipayPayQrCode: item["AUTHOR_ALIPAY_PAY_QRCODE_URL"]
    });
    commonStore.changeWebsiteConfig({
      GITHUB_WEBSITE: item["GITHUB_WEBSITE"],
      FOOTER_ABOUT_WEBSITE: item["FOOTER_ABOUT_WEBSITE"],
      FOOTER_COPYRIGHT: item["FOOTER_COPYRIGHT"],
      WEBSITE_ICP_CODE: item["WEBSITE_ICP_CODE"],
      FOOTER_DRIVER: item["FOOTER_DRIVER"],
      HEADER_LOGO_URL: item["HEADER_LOGO_URL"],
      RSS_URL: "敬请期待",
      SEND_ME_EMAIL: item["SEND_ME_EMAIL"]
    });
  });
}

function saveHotTagList() {
  findHotTagList().then(res => {
    commonStore.changeHotTagList(res.data.data);
  });
}

function saveFriendLinkList() {
  findFriendLinkList().then(res => {
    commonStore.changeFriendLinkList(res.data.data);
  });
}

onMounted(() => {
  saveWebsiteConfig();
  saveHotTagList();
  saveFriendLinkList();
});
</script>

<style scoped lang="scss">
.content {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 14px auto 0;
  padding: 0 20px;
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
}
</style>
