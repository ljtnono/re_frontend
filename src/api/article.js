import axios from "@/config/axiosConfig";
import {BASE_URL} from "@/constant/commonConstant";

// #################### 前端文章模块相关接口 #################### //
const pageRequestMapping = "/article";

/**
 * 获取文章详情
 */
export const findArticleById = (articleId) => {
  return axios.get(BASE_URL + pageRequestMapping + "/" + articleId);
};

/**
 * 无限滚动获取文章列表
 */
export const findArticleScroll = (pageNum, pageSize) => {
  return axios.get(BASE_URL + pageRequestMapping + "/scroll?pageNum=" + pageNum + "&pageSize=" + pageSize);
};

/**
 * 分页获取文章置顶列表
 */
export const findArticleTopList = (pageNum, pageSize) => {
  return axios.get(BASE_URL + pageRequestMapping + "/topList?pageNum=" + pageNum + "&pageSize=" + pageSize);
};

/**
 * 分页获取文章列表，categoryId / tagId 可选
 */
export const findArticleList = (pageNum, pageSize, categoryId, tagId) => {
  let url = BASE_URL + pageRequestMapping + "/list?pageNum=" + pageNum + "&pageSize=" + pageSize;
  if (categoryId !== undefined && categoryId !== null && categoryId !== "") {
    url += "&categoryId=" + categoryId;
  }
  if (tagId !== undefined && tagId !== null && tagId !== "") {
    url += "&tagId=" + tagId;
  }
  return axios.get(url);
};

/**
 * 搜索文章
 */
export const findArticleSearch = (searchCondition, pageNum, pageSize) => {
  return axios.get(BASE_URL + pageRequestMapping + "/search?searchCondition=" + encodeURIComponent(searchCondition) + "&pageNum=" + pageNum + "&pageSize=" + pageSize);
};
