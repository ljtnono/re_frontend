# re_frontend

根元素博客 - 前端展示站点（Vue 3 重构版）。

基于 **Vite 6 + Vue 3 + Pinia + Vue Router 4 + Element Plus + Artalk** 构建。

## 技术栈

| 依赖 | 说明 |
| --- | --- |
| Vue 3 | 组合式 API + `<script setup>` |
| Vite 6 | 构建与 dev server |
| Pinia 3 | 状态管理（博主信息、站点配置、热门标签、友链等） |
| Vue Router 4 | 路由（history 模式） |
| Element Plus 2.9 | UI 组件 |
| markdown-it | 文章正文 markdown 渲染（后端 `htmlContent` 为空时兜底） |
| Artalk 2.10 | 评论系统 |
| font-awesome 4.7 | 图标 |

## 目录结构

```
src/
├── api/            # 后端接口封装
├── assets/         # 静态资源（头像、logo、scss）
├── components/     # 公共组件（Header / Footer / ContentSide / ArticleItem / MessageLabel / ToTop）
├── config/         # axios 配置（响应拦截、错误提示）
├── constant/       # 常量（接口地址、Artalk 配置，从环境变量读取）
├── router/         # 路由
├── store/          # Pinia store
├── util/           # 工具函数（时间格式化等）
└── view/           # 页面
    ├── Index.vue          # 首页（置顶文章 + 无限滚动文章流）
    ├── Articles.vue       # 博客列表（分页）
    ├── Article.vue        # 文章详情（正文渲染 + Artalk 评论）
    ├── About.vue          # 关于作者
    ├── Search.vue         # 搜索结果
    └── error-page/        # 404 / 500（贪吃蛇小游戏）
```

## 开发

```bash
npm install
npm run dev        # 默认端口 8082
```

后端接口默认走 `http://127.0.0.1:9100/api-frontend`，Artalk 评论走 vite 代理 `/artalk -> 127.0.0.1:30610`（避免跨域，生产环境由 nginx 代理）。

## 环境变量

复制 `.env.example` 为 `.env.development` / `.env.production` 后按需修改：

| 变量 | 说明 |
| --- | --- |
| `VITE_API_BASE_URL` | 后端网关接口前缀 |
| `VITE_ARTALK_SERVER` | Artalk 服务地址（开发环境为 `/artalk`，走代理） |
| `VITE_ARTALK_SITE` | Artalk 站点名（与 docker-compose 中 `ATK_SITE_DEFAULT` 一致） |

## 构建

```bash
npm run build
npm run preview
```
