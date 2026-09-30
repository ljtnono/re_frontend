import axios from "@/config/axiosConfig";
import {BASE_URL} from "@/constant/commonConstant";

// 前端获取新闻消息列表
export const findNoticeList = () => {
  return axios.get(BASE_URL + "/notice/list");
};
