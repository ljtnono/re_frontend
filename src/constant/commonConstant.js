// #################### 通用常量 #################### //

// 接口基础地址，通过 .env / .env.[mode] 中的 VITE_API_BASE_URL 配置
export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.MODE === "production"
    ? "http://api.lingjiatong.cn:30152/api-frontend"
    : "http://127.0.0.1:9100/api-frontend");

// Artalk 评论系统服务地址
export const ARTALK_SERVER =
  import.meta.env.VITE_ARTALK_SERVER || "http://127.0.0.1:30610";

// Artalk 评论系统站点名
export const ARTALK_SITE = import.meta.env.VITE_ARTALK_SITE || "re_frontend";

// 接口响应成功代码
export const HTTP_RESULT_SUCCESS_CODE = 0;
// 接口响应成功消息
export const HTTP_RESULT_SUCCESS_MESSAGE = "success";
