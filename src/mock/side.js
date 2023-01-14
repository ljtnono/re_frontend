import Mock from "mockjs";

// #################### 侧边栏接口Mock数据 #################### //

// 自定义随机文章标签
Mock.Random.extend({
  randomArticleTag: function () {
    return this.pick([
      "JAVA",
      "Python",
      "Mybatis",
      "Linux",
      "MySQL",
      "Spring",
      "SpringBoot",
      "数据结构",
    ]);
  },
});

// 自定义随机友情链接
Mock.Random.extend({
  randomFriendLinkName: function () {
    return this.pick([
      "JAVA",
      "Python",
      "Mybatis",
      "Linux",
      "MySQL",
      "Spring",
      "SpringBoot",
      "数据结构",
    ]);
  },
  randomFriendLinkUrl: function () {
    return this.pick(["https://www.baidu.com", "https://www.lingjiatong.cn"]);
  },
});

// 侧边栏猜你喜欢接口
Mock.mock("/api-frontend/side/guessYouLike", "get", {
  code: 0,
  "data|5-10": [
    {
      "id|+1": 1,
      coverImage: "@dataImage(100x64)",
      title: "@cword(20, 30)",
      modifyTime: "@date(yyyy-MM-dd)",
      comment: "@increment(20)",
    },
  ],
});

// 侧边栏热门标签接口
Mock.mock("/api-frontend/side/articleTagList", "get", {
  code: 0,
  "data|10-20": [
    {
      "id|+1": 1,
      name: "@randomArticleTag()",
      status: 1,
    },
  ],
});

// 侧边栏热门标签接口
Mock.mock("/api-frontend/side/friendLinkList", "get", {
  code: 0,
  "data|5-10": [
    {
      "id|+1": 1,
      name: "@randomFriendLinkName()",
      url: "@randomFriendLinkUrl()",
      status: 1,
    },
  ],
});
