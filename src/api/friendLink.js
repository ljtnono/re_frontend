import axios from "@/config/axiosConfig";
import {BASE_URL} from "@/constant/commonConstant";

// 获取友情链接列表
export const findFriendLinkList = () => {
  return axios.get(BASE_URL + "/friendLink/list");
};
