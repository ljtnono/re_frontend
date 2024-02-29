import axios from "@/config/axiosConfig";
import {BASE_URL} from "@/constant/commonConstant";

// #################### 前端菜单相关接口 #################### //

const pageRequestMapping = "/menu";

/**
 * 获取菜单接口
 *
 */
export const findFrontendMenu = () => {
  return axios.get(BASE_URL + pageRequestMapping);
}
