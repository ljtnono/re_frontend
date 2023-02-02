import axios from "@/config/axiosConfig";
import {BASE_URL} from "@/constant/commonConstant";

// #################### 前端新闻消息模块接口 #################### //
const pageRequestMapping = "/notice";

/**
 * 前端获取新闻消息列表
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export const findNoticeList = () => {
  return axios.get(BASE_URL + pageRequestMapping + "/list");
};
