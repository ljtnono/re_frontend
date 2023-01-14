import Mock from "mockjs";

// #################### 关于作者接口Mock数据 #################### //

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

// 获取作者技能打分列表
Mock.mock("/api-frontend/about/skillList", "get", {
  code: 0,
  "data|8-20": [
    {
      name: "@randomArticleTag()",
      percent: "@natural(1, 100)",
    },
  ],
});
