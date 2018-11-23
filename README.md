# react ssr start

react16 + react-router4 + webpack4 + mobx + SSR 服务端渲染 + HMR 热更新 + 代码分割

---

> 测试链接 http://t.dappwind.com:31001/

## install script

- `yarn`

## develop scripts

- `npm run dev-all`

  同时启动客户端&服务端开发模式

  服务端运行在 3000 端口，获取的 js,css 资源来自 3001

  实现统一的 hot reload 开发

  开发入口 http://localhost:3000/

  ps. 由于采用了 css-hot-loader , 所以开发模式下服务端渲染后页面会闪一下，生产模式不会有这个问题

- `npm run dev`

  只客户端渲染 启动在 3001

  开发入口 http://localhost:3001/

  已支持 hot reload 改动即时生效

- `npm run dev-ssr`

  只服务端渲染 启动在 http://localhost:3000/

  采用 webpack watch  即时编译 server 代码，刷新生效（暂时无客户端代码）

## start script 部署脚本

- `npm run build`
- `node server.js` 或者 `pm2`

## 需求

- 增加服务端渲染   提高页面渲染速度，
- 按需加载   减少额外资源请求
- 开发方便 支持热更新与手机端调试
- 追求页面性能  lighthouse 评分越高越好，
- 按需配置 PWA 增加缓存控制。
- 脚手架可升级。
- 可配置性强 , webpack 配置文件外置
- 与业务代码完全分开，升级无冲突
- 参考的项目 github star >500 最近更新时间 < 1m

## 选型

### 路由：`react router`

> 服务端渲染配置 https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/server-rendering.md

### 按需加载 `react-loadable`

> 服务端渲染配置 https://github.com/jamiebuilds/react-loadable

### hot reload

- webpack-dev-middleware
- webpack-hot-middleware
- react-hot-loader

- webpack -w

> 参考 razzle https://github.com/jaredpalmer/razzle#how-razzle-works-the-secret-sauce

2 configs, 2 ports, 2 webpack instances, both watching and hot reloading the same filesystem, in parallel during development and a little webpack.output.publicPath magic.

In development mode (razzle start), Razzle bundles both your client and server code using two different webpack instances running with Hot Module Replacement in parallel. While your server is bundled and run on whatever port you specify in src/index.js (3000 is the default), the client bundle (i.e. entry point at src/client.js) is served via webpack-dev-server on a different port (3001 by default) with its publicPath explicitly set to localhost:3001 (and not / like many other setups do). Then the server's html template just points to the absolute url of the client JS: localhost:3001/static/js/client.js. Since both webpack instances watch the same files, whenever you make edits, they hot reload at exactly the same time. Best of all, because they use the same code, the same webpack loaders, and the same babel transformations, you never run into a React checksum mismatch error.

### 美化

- webpackbar https://www.npmjs.com/package/webpackbar
