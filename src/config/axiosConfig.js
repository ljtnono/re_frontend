import axios from "axios";
import {
  HTTP_RESULT_SUCCESS_CODE,
  HTTP_RESULT_SUCCESS_MESSAGE
} from "@/constant/commonConstant";
import ElementUI from "element-ui";

const INSTANCE = axios.create();
// 添加响应拦截器
INSTANCE.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  let contentType = response.headers["content-type"];
  // TODO contentType 会存在为undefined的情况
  if (contentType !== undefined && contentType.indexOf("application/json") !== -1) {
    let code = response.data.code;
    let message = response.data.message;
    if (HTTP_RESULT_SUCCESS_CODE === code && HTTP_RESULT_SUCCESS_MESSAGE === message) {
      return response;
    } else {
      // 在这里处理自定义异常，这里处理完之后，如果调用axios时有自定义的catch也会进行处理
      // 弹出错误消息
      ElementUI.Message.error({
        message: message,
        duration: 2000,
        center: false
      });
      return Promise.reject(response);
    }
  }
  return response;
}, error => {
  let message = error.message;
  if (message.indexOf("status code 503") !== -1) {
    // 这里处理HTTP非200的情况，这里处理完之后，如果axios有自定义的catch也会进行处理
    ElementUI.Message.error({
      message: "后台服务异常，请联系管理员！",
      duration: 2000,
      center: false
    });
  } else if (message.indexOf("Network Error") !== -1) {
    ElementUI.Message.error({
      message: "操作失败！请检查网络",
      duration: 2000,
      center: false
    });
  } else {
    console.log(error);
    ElementUI.Message.error({
      message: "未知异常",
      duration: 2000,
      center: false
    });
  }
});

export default INSTANCE;
