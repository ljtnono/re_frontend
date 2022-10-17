import axios from "axios"
import {apiBaseUrl} from "../config/config"
import {arrayParamToUrlFormat} from "@/util/paramUtil";

// #################### 首页接口 #################### //
const pageRequestMapping = "/sy";

// 获取全部
export const FRONTEND_WEBSITE_CONFIG_ACQUIRE_TYPE_ALL = 1;
// 获取部分
export const FRONTEND_WEBSITE_CONFIG_ACQUIRE_TYPE_MULTIPLE = 2;
// 获取站点配置信息
export const findFrontendWebsiteConfig = (acquireType, acquirekeyList) => {
  if (!acquirekeyList) {
    return axios.get(apiBaseUrl + pageRequestMapping + "/frontendWebsiteConfig?acquireType=" + acquireType);
  } else {
    return axios.get(apiBaseUrl + pageRequestMapping + "/frontendWebsiteConfig?acquireType=" + acquireType + "&" + arrayParamToUrlFormat({"acquireKeyList": acquirekeyList}));
  }
}

// 获取所有的友情链接列表
export const findFriendLinkList = () => {
  return axios.get(apiBaseUrl + pageRequestMapping + "/friendLinkList");
}

// 获取新闻消息列表
export const findNoticeList = () => {
  return axios.get(apiBaseUrl + pageRequestMapping + "/noticeList");
}

// 获取前端封面图
export const findSwiperImageList = () => {
  return axios.get(apiBaseUrl + pageRequestMapping + "/swiperImageList");
}

// 获取前端swiper轮博图列表
export const getSwiperImageList = () => {
  return axios.get(apiBaseUrl + pageRequestMapping + "/getSwiperImageList")
}