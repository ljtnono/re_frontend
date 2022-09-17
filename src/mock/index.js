import Mock from 'mockjs'
import {indeSliderList} from "@/config/config";

// #################### 首页接口Mock数据 #################### //

// 自定义随机文章标签
Mock.Random.extend({
  randomArticleTag: function() {
    return this.pick(['JAVA', 'Python', 'Mybatis', 'Linux', 'MySQL', 'Spring', 'SpringBoot', '数据结构'])
  }
});

// 自定义随机轮播图片地址
Mock.Random.extend({
  randomArticleTag: function() {
    return this.pick(['JAVA', 'Python', 'Mybatis', 'Linux', 'MySQL', 'Spring', 'SpringBoot', '数据结构'])
  }
});


// 首页获取推荐热门文章接口
Mock.mock('/api-frontend/index/hotArticleList', 'get', {
  code: 0,
  'data|5-10': [{
    "id": "@increment(1)",
    "title": "@cword(10, 20)",
    "view": "@increment(200)",
    "comment": "@increment(200)"
  }]
});

// 首页获取文章列表接口
Mock.mock('/api-frontend/index/articleList', 'get', {
  code: 0,
  totalPages: 10,
  totalCount: 200,
  'data|10-20': [{
    "id": "@increment(1)",
    "title": "@cword(10, 20)",
    "view": "@increment(200)",
    "comment": "@increment(200)",
    "status": 1,
    "type": "@randomArticleTag()",
    "coverImage": "@dataImage(180x120)",
    "summary": "@cword(200, 300)",
    "author": "最后的疼爱",
    "modifyTime": "@date(yyyy-MM-dd)"
  }]
});

// 首页获取轮播图片接口
Mock.mock("/api-frontend/index/sliderList", 'get', {
  code: 0,
  'data': indeSliderList
});
