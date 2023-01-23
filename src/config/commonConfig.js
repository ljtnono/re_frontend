const baseUrlMinio = "http://f.lingjiatong.cn:30090/rootelement";

const indexSliderList = [
  baseUrlMinio + "/sys/slider1.jpg",
  baseUrlMinio + "/sys/slider2.jpg",
  baseUrlMinio + "/sys/slider3.jpg",
  baseUrlMinio + "/sys/slider4.jpg",
];

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
    disableOnInteraction: true,
  },
  effect: "slide",
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    hideOnClick: true,
    clickable: true,
    bulletClass: "swiper-pagination-bullet",
    bulletActiveClass: "swiper-pagination-bullet-active",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
};

const valineConfig = {
  el: "#comments",
  appId: "iyTC528gHvHe09Qg8b5HPrvj-gzGzoHsz",
  appKey: "8ndLNYwjGS7FPLKdzgRKCfeL",
  notify: false,
  verify: false,
  avatar: "wavatar",
  placeholder: "评论请留下您的邮箱和昵称....",
};

// markdown编辑器配置
const EDITOR_CONFIG = {
  // 开启滚动条样式(暂时仅支持chrome)
  scrollStyle: true,
  // 开启边框阴影
  boxShadow: false,
  // 是否开启过渡动画
  transition: true,
  // 工具栏背景颜色
  toolbarsBackground: "#ffffff",
  // 预览框背景颜色
  previewBackground: "#ffffff",
  // true： 双栏(编辑预览同屏)， false： 单栏(编辑预览分屏)
  subfield: false,
  // 在单栏（subfield=false）时默认展示区域 edit： 默认展示编辑区域，preview： 默认展示预览区域 其他 = edit
  defaultOpen: "preview",
  // 是否允许编辑
  editable: false,
  // code-github	markdown样式： 默认github, 可选配色方案
  codeStyle: "atom-one-dark-reasonable",
  // 工具栏是否显示
  toolbarsFlag: false,
  // 代码高亮
  ishljs: true
};


module.exports = {
  baseUrlMinio,
  swiperOption: swiperOption,
  valineConfig,
  EDITOR_CONFIG,
  indexSliderList
};
