import axios from "axios";
import {ElMessage} from "element-plus";
import {
  HTTP_RESULT_SUCCESS_CODE,
  HTTP_RESULT_SUCCESS_MESSAGE
} from "@/constant/commonConstant";

const INSTANCE = axios.create();

// 添加响应拦截器
INSTANCE.interceptors.response.use((response) => {
  let contentType = response.headers["content-type"];
  if (contentType !== undefined && contentType.indexOf("application/json") !== -1) {
    let code = response.data.code;
    let message = response.data.message;
    if (HTTP_RESULT_SUCCESS_CODE === code && HTTP_RESULT_SUCCESS_MESSAGE === message) {
      return response;
    }
    ElMessage.error({message: message, duration: 2000, center: false});
    return Promise.reject(response);
  }
  return response;
}, (error) => {
  let message = error.message || "";
  if (message.indexOf("status code 503") !== -1) {
    ElMessage.error({message: "后台服务异常，请联系管理员！", duration: 2000});
  } else if (message.indexOf("Network Error") !== -1) {
    ElMessage.error({message: "操作失败！请检查网络", duration: 2000});
  } else {
    ElMessage.error({message: "未知异常", duration: 2000});
  }
  return Promise.reject(error);
});

export default INSTANCE;
