import axios from "@/config/axiosConfig";
import {BASE_URL} from "@/constant/commonConstant";

// #################### 标签相关接口 #################### //

const pageRequestMapping = "/tag";

/**
 * 获取热门标签列表
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export const findHotTagList = () => {
  return axios.get(BASE_URL + pageRequestMapping + "/hotTagList");
};
