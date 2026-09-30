import {defineStore} from "pinia";

// #################### 前端通用状态 #################### //

export const useCommonStore = defineStore("common", {
  state: () => ({
    // 当前激活路由
    activeRoute: {},
    // 博主信息
    author: {
      avatar: "",
      nickName: "",
      email: "",
      addr: "北京",
      tagList: [],
      job: "程序员",
      wechat: "",
      qq: "",
      github: "",
      wechatQrCodeUrl: "",
      githubUsername: "",
      wechatPayQrCodeUrl: "",
      about: "",
      alipayPayQrCode: ""
    },
    // 站点配置
    websiteConfig: {
      GITHUB_WEBSITE: "",
      FOOTER_ABOUT_WEBSITE: "",
      FOOTER_COPYRIGHT: "",
      WEBSITE_ICP_CODE: "",
      FOOTER_DRIVER: "",
      HEADER_LOGO_URL: "",
      RSS_URL: "敬请期待",
      SEND_ME_EMAIL: ""
    },
    // 热门标签
    hotTagList: [],
    // 友情链接
    friendLinkList: []
  }),
  actions: {
    changeActiveRoute(route) {
      this.activeRoute = route;
    },
    changeAuthor(author) {
      this.author = author;
    },
    changeWebsiteConfig(config) {
      this.websiteConfig = config;
    },
    changeHotTagList(list) {
      this.hotTagList = list;
    },
    changeFriendLinkList(list) {
      this.friendLinkList = list;
    }
  }
});
