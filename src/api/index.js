import axios from "axios"
import {apiBaseUrl} from "../config/config"

// #################### 首页接口Mock数据 #################### //

const pageRequestMapping = "/index";
// 获取站点配置信息
export const frontendWebsiteConfig = (acquireType, acquirekeyList) => {
  return axios.get(apiBaseUrl + pageRequestMapping + "/frontendWebsiteConfig?acquireType=" + acquireType);
}


