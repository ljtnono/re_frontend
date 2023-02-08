export default {
  namespaced: true,
  state: () => ({
    // 当前路由对象，每次路由改变时都会实时更改
    activeRoute: null,
    //########## 侧边栏相关数据 ##########//
    // 热门标签列表
    hotTagList: null,
    // 友情链接列表
    friendLinkList: null,
    // 菜单列表
    menus: null,
    // 博主相关信息
    author: {
      // 头像地址
      avatar: "",
      // 博主网名
      nickName: "",
      // 博主邮箱
      email: "",
      // 博主地址
      addr: "",
      // 自己给自己贴标签
      tagList: ["理想主义者", "技术宅", "天然呆"],
      // 职业
      job: "程序员",
      // 微信
      wechat: "",
      // QQ
      qq: "",
      // github
      github: "",
      // 微信二维码地址
      wechatQrCodeUrl: "",
      // github用户名
      githubUsername: "",
      // 微信支付二维码地址
      wechatPayQrCodeUrl: "",
      // 关于作者信息
      about: "",
      // 支付宝支付二维码地址
      alipayPayQrCode: ""
    },
    // 网站相关配置
    websiteConfig: {
      // 博客的github地址
      GITHUB_WEBSITE: "",
      // 博客footer部分关于相关信息
      FOOTER_ABOUT_WEBSITE: "",
      // 博客版权信息
      FOOTER_COPYRIGHT: "",
      // 博客备案号
      WEBSITE_ICP_CODE: "",
      // footer网站驱动信息
      FOOTER_DRIVER: "",
      // 博客头部的LOGO地址
      HEADER_LOGO_URL: "",
      // TODO rss订阅地址，暂时没有该功能
      RSS_URL: "",
      // 发送邮件给我
      SEND_ME_EMAIL: ""
    }
  }),
  getters: {},
  mutations: {
    // 修改当前路由
    changeActiveRoute(state, activeRoute) {
      state.activeRoute = activeRoute;
    },
    // 修改热门标签列表
    changeHotTagList(state, hotTagList) {
      state.hotTagList = hotTagList;
    },
    // 修改友情链接列表
    changeFriendLinkList(state, friendLinkList) {
      state.friendLinkList = friendLinkList;
    },
    // 修改博主信息
    changeAuthor(state, author) {
      state.author = author;
    },
    // 修改网站设置
    changeWebsiteConfig(state, websiteConfig) {
      state.websiteConfig = websiteConfig;
    },
    // 修改菜单
    changeMenu(state, menus) {
      state.menu = menus;
    }
  },
  actions: {},
  modules: {},
};
