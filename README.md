# CRM 后台框架

react16 + react-router4 + webpack4 + mobx + HMR 热更新 + 代码分割

---

> 演示链接 http://t.dappwind.com:31002/

## 需求

- [x] 开发热更新
- [x] 接口 mock
- [x] 接口代理
- [x] 登录管理
- [x] 用户权限分配 （用户管理 新建用户 修改权限） 接口 mock
- [x] 页面权限管理分组 （新建分组 修改分组权限）接口 mock
- [ ] 基本统计绘图

## install script

- `yarn`

## develop scripts

- `npm run dev`

开发入口 http://localhost:3001/

已支持 hot reload 改动即时生效

取消接口 mock 删除 MOCK_ENV=mock 即可

- `npm run visu`

可视化分析打包后的文件包含哪些内容, 帮助分析资源加载是否合理

![](https://ws1.sinaimg.cn/mw690/6b201a41ly1fxntzvsutmj21hc0ow177.jpg)

## start script 部署脚本

- `npm run build`
- `npm run start` 或者 `pm2`

## 数据 store 配置

分为`全局store` 和 `局部store`

- 全局 store

  在 src 目录下 存储些全局公用的数据状态 由 mobx provider 实现

- 局部 store

  在页面目录下 存储局部数据状态。 可通过直接 import 引入 或者在路由列表上添加 store 即可。 能通过路由区分的 store 均可采用局部 store。 由 react 基础 props 实现

## 引用路径 alias

```js
alias: {
  src: resolve('src'),
  assets: resolve('src/assets'),
  components: resolve('src/components'),
  style: resolve('src/static/style')
}
```

尽量采用 alias 引用 避免出现 `../../` 这种引用路径

## 选型

### UI： antd

antd 3.9 版本以后会把所有的图标文件打包到 js 里 导致包很大（超过 700k）,暂时使用 3.8.2 版本

> https://github.com/ant-design/ant-design/issues/12011#issuecomment-420038579

> https://github.com/ant-design/ant-design/issues/10353

### 中间件

统一放在`src/middleware`
开发模式 和 生产 可以直接使用同样的配置，不用分别配置

目前包括 mock 假数据 和 接口代理

### 接口代理 `http-proxy-middleware`

涉及到的代理添加在 `src/middleware/proxy` 中

```js
const proxyTable = {
  '/xq': {
    target: 'https://api.xueqiu.com/',
    changeOrigin: true,
    pathRewrite: (path, req) => path.replace('/xq', '')
  }
}
```

请求接口封装放在 `src/utils/httpclient` 中

### mock 接口假数据

暂时直接采用 res.json() node 直接返回数据

涉及到的 mock 添加在 `src/middleware/proxy` 中

### 图表： `highchart`

### 路由：`react router`

### 按需加载 `react-loadable`

### hot reload

- webpack-dev-middleware
- webpack-hot-middleware
- react-hot-loader

### 美化

- webpackbar https://www.npmjs.com/package/webpackbar
