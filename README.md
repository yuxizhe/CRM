# CRM 后台框架

react16 + react-router4 + webpack4 + mobx + HMR 热更新 + 代码分割

---

> 测试链接 http://t.dappwind.com:31002/

## install script

- `yarn`

## develop scripts

- `npm run dev`

开发入口 http://localhost:3001/

已支持 hot reload 改动即时生效

## start script 部署脚本

- `npm run build`
- `node index.js` 或者 `pm2`

## 数据 store 配置

分为`全局store` 和 `局部store`

- 全局 store

  在 src 目录下 存储些全局公用的数据状态 由 mobx provider 实现

- 局部 store

  在页面目录下 存储局部数据状态。 在路由列表上添加 store 即可。 能通过路由区分的 store 均可采用局部 store。 由 react 基础 props 实现

## 需求

- [x] 开发热更新
- [x] 接口 mock
- [x] 接口代理
- [x] 登录管理
- 页面权限管理
- 用户权限分组
- 基本统计绘图

## 选型

### UI： antd

antd 3.9 版本以后会把所有的图标文件打包到 js 里 导致包很大（超过 700k）,暂时使用 3.8.2 版本

> https://github.com/ant-design/ant-design/issues/12011#issuecomment-420038579

> https://github.com/ant-design/ant-design/issues/10353

### 图表： highchart

### 路由：`react router`

### 按需加载 `react-loadable`

### hot reload

- webpack-dev-middleware
- webpack-hot-middleware
- react-hot-loader

### 美化

- webpackbar https://www.npmjs.com/package/webpackbar
