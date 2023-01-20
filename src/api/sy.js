import axios from "@/config/axiosConfig";
import { arrayParamToUrlFormat } from "@/util/paramUtil";
import {BASE_URL} from "@/constant/commonConstant";

// #################### 首页接口 #################### //
const pageRequestMapping = "/sy";

// 获取全部
export const FRONTEND_WEBSITE_CONFIG_ACQUIRE_TYPE_ALL = 1;
// 获取部分
export const FRONTEND_WEBSITE_CONFIG_ACQUIRE_TYPE_MULTIPLE = 2;
// 获取站点配置信息
export const findFrontendWebsiteConfig = (acquireType, acquirekeyList) => {
  if (!acquirekeyList) {
    return axios.get(BASE_URL + pageRequestMapping + "/frontendWebsiteConfig?acquireType=" + acquireType);
  } else {
    return axios.get(BASE_URL + pageRequestMapping + "/frontendWebsiteConfig?acquireType=" + acquireType + "&" + arrayParamToUrlFormat({ acquireKeyList: acquirekeyList })
    );
  }
};

// 获取所有的友情链接列表
export const findFriendLinkList = () => {
  return axios.get(BASE_URL + pageRequestMapping + "/friendLinkList");
};

// 获取新闻消息列表
export const findNoticeList = () => {
  return axios.get(BASE_URL + pageRequestMapping + "/noticeList");
};

// 获取前端封面图
export const findSwiperImageList = () => {
  return axios.get(BASE_URL + pageRequestMapping + "/swiperImageList");
};

// 获取前端swiper轮博图列表
export const getSwiperImageList = () => {
  return axios.get(BASE_URL + pageRequestMapping + "/swiperImageList");
};


