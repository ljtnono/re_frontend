import axios from "@/config/axiosConfig";

export const listBlogPageByType = (type, pageParam) => {
  return axios.get("/api/blog/listBlogPageByType", {
    params: {
      type: type,
      page: pageParam.page,
      count: pageParam.count,
    },
  });
};

export const searchEsPageByCondition = (condition, pageParam) => {
  return axios.get("/api/blog/search/es", {
    params: {
      condition: condition,
      page: pageParam.page,
      count: pageParam.count,
    },
  });
};
