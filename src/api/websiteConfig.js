import axios from "@/config/axiosConfig";
import {BASE_URL} from "@/constant/commonConstant";
import {arrayParamToUrlFormat} from "@/util/paramUtil";

// #################### 前端站点配置模块相关接口 #################### //

const pageRequestMapping = "/websiteConfig";

// 获取全部
export const FRONTEND_WEBSITE_CONFIG_ACQUIRE_TYPE_ALL = 1;
// 获取部分
export const FRONTEND_WEBSITE_CONFIG_ACQUIRE_TYPE_MULTIPLE = 2;

/**
 * 获取站点配置信息
 *
 * @param acquireType 获取类型
 * @param acquirekeyList 获取键列表
 * @returns {Promise<AxiosResponse<any>>}
 */
export const findFrontendWebsiteConfig = (acquireType, acquirekeyList) => {
  if (!acquirekeyList) {
    return axios.get(BASE_URL + pageRequestMapping + "/frontendWebsiteConfig?acquireType=" + acquireType);
  } else {
    return axios.get(BASE_URL + pageRequestMapping + "/frontendWebsiteConfig?acquireType=" + acquireType + "&" + arrayParamToUrlFormat({ acquireKeyList: acquirekeyList })
    );
  }
};

/**
 * 获取前端封面图
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export const findSwiperImageList = () => {
  return axios.get(BASE_URL + pageRequestMapping + "/swiperImageList");
};
