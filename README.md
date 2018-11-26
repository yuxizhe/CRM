# CRM后台框架

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

## 需求

- 登录管理
- 页面权限管理
- 用户权限分组
- 基本统计绘图
- 接口代理

## 选型

### UI： antd 

### 图表： highchart

### 路由：`react router`

### 按需加载 `react-loadable`

> 服务端渲染配置 https://github.com/jamiebuilds/react-loadable

### hot reload

- webpack-dev-middleware
- webpack-hot-middleware
- react-hot-loader

### 美化

- webpackbar https://www.npmjs.com/package/webpackbar
