import axios from "@/config/axiosConfig";
import {BASE_URL} from "@/constant/commonConstant";

// 获取前端菜单
export const findFrontendMenu = () => {
  return axios.get(BASE_URL + "/menu");
};
