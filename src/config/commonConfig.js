// const apiBaseUrl = "http://127.0.0.1:8152/api-frontend";
const apiBaseUrl = process.env.NODE_ENV === "production" ? "http://api.lingjiatong.cn:30152/api-frontend" : "http://127.0.0.1:8152/api-frontend";
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

module.exports = {
  baseUrlMinio,
  apiBaseUrl,
  swiperOption: swiperOption,
  valineConfig,
  indexSliderList
};
