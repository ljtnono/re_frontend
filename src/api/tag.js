import axios from "@/config/axiosConfig";
import {BASE_URL} from "@/constant/commonConstant";

// 获取热门标签列表
export const findHotTagList = () => {
  return axios.get(BASE_URL + "/tag/hotTagList");
};
