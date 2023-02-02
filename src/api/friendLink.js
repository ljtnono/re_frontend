import axios from "@/config/axiosConfig";
import {BASE_URL} from "@/constant/commonConstant";

// #################### 前端友情链接模块接口 #################### //
const pageRequestMapping = "/friendLink";

/**
 * 前端获取友情链接列表
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export const findFriendLinkList = () => {
  return axios.get(BASE_URL + pageRequestMapping + "/list");
};
