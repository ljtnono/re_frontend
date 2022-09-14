import axios from 'axios'

export const listBlogPage = (page, count) => {
  let p = page || 1;
  let c = count || 10;
  return axios.get('/api/blog/listBlogPage', {
    params: {
      page: p,
      count: c
    }
  });
};

export const getBlogById = (blogId) => {
  let id = parseInt(blogId);
  return axios.get('/api/blog/' + id);
};

export const listHotArticles = () => {
  return axios.get('/api/blog/listHotArticles');
};

export const listGuessYouLike = () => {
  return axios.get('/api/blog/listGuessYouLike');
};

export const listBlogPageByType = (type, pageParam) => {
  return axios.get('/api/blog/listBlogPageByType', {
    params: {
      type: type,
      page: pageParam.page,
      count: pageParam.count
    }
  });
};

export const searchEsPageByCondition = (condition, pageParam) => {
  return axios.get('/api/blog/search/es', {
    params: {
      condition: condition,
      page: pageParam.page,
      count: pageParam.count
    }
  });
};
