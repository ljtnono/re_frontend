import Mock from 'mockjs'

// #################### 页面公共部分Mock数据 #################### //

// 获取消息列表mock接口
Mock.mock('/api-frontend/header/messages', 'get', {
  code: 0,
  data: [
    "看到网上新闻美国的贴吧将成为中国公司",
    "主题更新一下，修复了头像挂掉的问题",
    "后期更新网站文章可能不会那么闲了",
    "不得不说，美国贴吧的界面真是难看到死",
    "推送试试",
    "发现了一个非常不错的插件",
    "国庆快乐，放假三天",
    "准备增加一个免登录支付功能",
    "微信扫码登录功能已经 ok 了",
    "睡觉之前测试一下"
  ]
});
