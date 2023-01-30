import axios from "@/config/axiosConfig";
import {BASE_URL} from "@/constant/commonConstant";

// #################### 文章相关接口 #################### //

const pageRequestMapping = "/article";

/**
 * 获取文章详情
 *
 * @param articleId 文章id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const findArticleById = (articleId) => {
  return axios.get(BASE_URL + pageRequestMapping + "/" + articleId);
};

/**
 * 无限滚动获取文章列表
 *
 * @param pageNum 获取页数
 * @param pageSize 每页条数
 * @returns {Promise<AxiosResponse<any>>}
 */
export const findArticleScroll = (pageNum, pageSize) => {
  return axios.get(BASE_URL + pageRequestMapping + "/scroll?pageNum=" + pageNum + "&pageSize=" + pageSize);
};

/**
 * 分页获取推荐文章列表
 *
 * @param pageNum 获取页数
 * @param pageSize 每页条数
 * @returns {Promise<AxiosResponse<any>>}
 */
export const findArticleRecommendList = (pageNum, pageSize) => {
  return axios.get(BASE_URL + pageRequestMapping + "/recommendList?pageNum=" + pageNum + "&pageSize=" + pageSize);
};

/**
 * 分页获取文章置顶列表
 *
 * @param pageNum 获取页数
 * @param pageSize 每页条数
 * @returns {Promise<AxiosResponse<any>>}
 */
export const findArticleTopList = (pageNum, pageSize) => {
  return axios.get(BASE_URL + pageRequestMapping + "/topList?pageNum=" + pageNum + "&pageSize=" + pageSize);
};
