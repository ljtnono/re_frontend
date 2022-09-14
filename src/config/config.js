const imgDefault = "https://ftp.ljtnono.cn/re/images/default_img.jpg";
const imgQrCodeWeChat = "http://192.168.31.132:30090/rootelement/sys/author_wx_qrcode.jpeg";
const githubAddr = "https://github.com/ljtnono/re";
const recordNum = "鄂ICP备18013706号";
const author = "最后的疼爱";
const authorAddr = "湖北-武汉";
const email = "935188400@qq.com";
const imgHuaWeiYun = "https://res.hc-cdn.com/cnpm-header-and-footer/2.0.6/base/header-china/components/images/logo.svg";
const imgAliYun = "https://img.alicdn.com/tfs/TB13DzOjXP7gK0jSZFjXXc5aXXa-212-48.png";
const imgMysql = "https://labs.mysql.com/common/logos/mysql-logo.svg?v2";
const imgRedis = "https://redis.com/wp-content/themes/wpx/assets/images/icon-redis.svg";
const imgNginx = "https://nginx.org/nginx.png";
const imgTomcat = "https://tomcat.apache.org/res/images/tomcat.png";
const imgAvatar = "http://192.168.31.132:30090/rootelement/sys/avatar.png";
const imgLogoWord = "http://192.168.31.132:30090/rootelement/sys/header_logo.png";
const imgQrCodeWeChatSk = "http://192.168.31.132:30090/rootelement/sys/wx_pay_qrcode.jpeg";
const imgQrCodeZfb = "http://192.168.31.132:30090/rootelement/sys/alipay_pay_qrcode.jpeg";
const swiperOption = {
  speed: 800,
  loop: true,
  grabCursor: true,
  init: true,
  zoom: false,
  autoplay: {
    autoplay: true,
    delay: 3000,
    stopOnLastSlide: false,
    disableOnInteraction: true
  },
  effect: "slide",
  pagination: {
    el: '.swiper-pagination',
    type: "bullets",
    hideOnClick: true,
    clickable: true,
    bulletClass: "swiper-pagination-bullet",
    bulletActiveClass: "swiper-pagination-bullet-active"
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
};

const valineConfig = {
  el: '#comments',
  appId: 'iyTC528gHvHe09Qg8b5HPrvj-gzGzoHsz',
  appKey: '8ndLNYwjGS7FPLKdzgRKCfeL',
  notify: false,
  verify: false,
  avatar: 'wavatar',
  placeholder: '评论请留下您的邮箱和昵称....'
};
module.exports = {
  imgDefault: imgDefault,
  imgQrCodeWeChat: imgQrCodeWeChat,
  githubAddr: githubAddr,
  recordNum: recordNum,
  author: author,
  imgHuaWeiYun: imgHuaWeiYun,
  imgAliYun: imgAliYun,
  imgMysql: imgMysql,
  imgRedis: imgRedis,
  imgNginx: imgNginx,
  imgTomcat: imgTomcat,
  imgAvatar: imgAvatar,
  imgLogoWord: imgLogoWord,
  imgQrCodeWeChatSk: imgQrCodeWeChatSk,
  imgQrCodeZfb: imgQrCodeZfb,
  swiperOption: swiperOption,
  valineConfig: valineConfig,
  authorAddr,
  email
};
