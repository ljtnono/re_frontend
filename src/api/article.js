import axios from "axios"
import {apiBaseUrl} from "../config/config"

// #################### 文章页接口 #################### //
const pageRequestMapping = "/article";

// 获取文章信息
export const findArticleById = (articleId) => {
  return axios.get(apiBaseUrl + pageRequestMapping + "/" + articleId)
}
