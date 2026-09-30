import axios from "@/config/axiosConfig";
import {BASE_URL} from "@/constant/commonConstant";

export const FRONTEND_WEBSITE_CONFIG_ACQUIRE_TYPE_ALL = 1;

// 获取前端站点配置
export const findFrontendWebsiteConfig = (acquireType) => {
  return axios.get(BASE_URL + "/websiteConfig/frontendWebsiteConfig?acquireType=" + acquireType);
};
