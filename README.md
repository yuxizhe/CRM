![](https://xqimg.imedao.com/16ac547ed843e073feefb926.jpg)

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
- [x] 规范接口 规范数据格式
- [x] 通用组件需求收集并给出例子
- [ ] 基本统计绘图

## 目录结构

```
├── Dockerfile
├── README.md
├── app.js                node 启动入口
├── index.html            开发html模板
├── index.prod.html       生产html模板
├── package.json          包管理
├── public                打包生成目录
├── middlewares           中间件,node服务端接口都写在这里
│   ├── index.js
│   ├── mock.js           mock接口数据
│   └── proxy.js          接口代理
├── script                开发&生产 脚本
│   ├── dev.js
│   └── prod-build.js
├── src                   主源码
│   ├── App.js            react App
│   ├── index.js          webpack 打包入口
│   ├── components        通用模块
│   │   ├── SideBar
│   │   │   ├── index.js
│   │   │   └── style.scss
│   │   └── webSelect
│   │       └── index.js
│   ├── pages             页面组件
│   │   ├── Home          代码&store&样式都放在一个目录下
│   │   │   ├── index.js
│   │   │   ├── store.js
│   │   │   └── style.scss
│   ├── routers           路由
│   │   └── index.js
│   ├── static            通用资源
│   │   └── style
│   │       └── var.scss
│   ├── stores            全局store
│   │   ├── index.js
│   │   ├── login.js
│   │   └── sideBar.js
│   └── utils             通用库
│       ├── cookie.js
│       └── httpclient.js
├── webpack.config.js     webpack 开发配置
├── webpack.prod.js       webpack 生产配置
```

## install script

- `yarn`

## develop scripts

- `npm run dev`

开发入口 http://localhost:7878/

webpack打包部分 已支持 hot reload 改动即时生效

node 服务端部分 采用nodemon

取消接口 mock 删除 MOCK_ENV=mock 即可

### 进程

开发模式会启动两个进程 4001 和 7878

webpack打包部分  启动在4001
node 服务端 启动在7878 代理4001内容

实现改动服务端部分时 只nodemon重启,不重新打包; 改动web端部分能热更新

- `npm run visu`

可视化分析打包后的文件包含哪些内容, 帮助分析资源加载是否合理


## start script 部署脚本

- `npm run build`
- `npm run start` 或者 `pm2`

## node 调试

采用vscode debug模式
选择“启动prod调试” 即可启动调试, 打断点等
入口 http://localhost:7878/

node服务部分采用require语法 也是为了方便debug调试

## 组件

采用 ant design 组件

> https://ant.design/docs/react/introduce-cn

## 页面 UI

UI 风格参考 AntDesignPro

> 文档 https://pro.ant.design/index-cn

> 示例 https://preview.pro.ant.design/dashboard/analysis

## 页面编写参考

参考 pages 中的 manage 和 example 目录。react+mobx 的形式。

## 左边栏增加

采用读后端接口，有权限的才显示，所以开发阶段新增页面时，想在左边栏可以在 mock.js 接口中新增数据。

## CRM 后台接口规范

> http://docs.snowballfinance.com/pages/viewpage.action?pageId=38803598

## 数据 store 配置

分为`全局store` 和 `局部store`

- 全局 store

  在 src 目录下 存储些全局公用的数据状态 由 mobx provider 实现

- 局部 store

  在页面目录下 存储局部数据状态。 可通过直接 import 引入 或者在路由列表上添加 store 即可。 能通过路由区分的 store 均可采用局部 store。 由 react 基础 props 实现

## 外部引用

 通用资源直接引用 cdn，避免开发  中无用重复打包，提高打包速度

```js
externals: {
  react: 'React',
  'react-dom': 'ReactDOM',
  mobx: 'mobx',
  'mobx-react': 'mobxReact',
  axios: 'axios'
}
```

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
  "/xq": {
    target: "https://api.xueqiu.com/",
    changeOrigin: true,
    pathRewrite: (path, req) => path.replace("/xq", "")
  }
};
```

请求接口封装放在 `src/utils/httpclient` 中

### mock 接口假数据

暂时直接采用 res.json() node 直接返回数据

涉及到的 mock 添加在 `src/middleware/proxy` 中

### 图表： `highchart`

### 路由：`react router`

### 按需加载： `react-loadable`

### hot reload

- webpack-dev-middleware
- webpack-hot-middleware
- react-hot-loader

### 美化

- webpackbar https://www.npmjs.com/package/webpackbar

![](https://ws1.sinaimg.cn/mw690/6b201a41gy1fxnuw4fe2ng20eq05m0w9.gif)


## For SRE

``` bash
# build
npm install
npm run build
# start
pm2 start process.json
# stop
pm2 stop process.json

# restart 
pm2 restart process.json
```
