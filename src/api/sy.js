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

// TODO 获取所有的友情链接列表
export const findFriendLinkAll = () => {
  return axios.get(apiBaseUrl + pageRequestMapping + "/findFriendListAll");
}

// 获取新闻消息列表
export const findNoticeList = () => {
  return axios.get(apiBaseUrl + pageRequestMapping + "/noticeList");
}
