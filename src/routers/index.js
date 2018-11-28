import Loadable from 'react-loadable'

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ 'src/pages/Home'),
  loading: () => null
})
const ImportPage = Loadable({
  loader: () => import(/* webpackChunkName: "import" */ 'src/pages/ImportPage'),
  loading: () => null
})
const loginPage = Loadable({
  loader: () => import(/* webpackChunkName: "login" */ 'src/pages/Login'),
  loading: () => null
})
const userManage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "usermanage" */ 'src/pages/UserManage'),
  loading: () => null
})

import store from 'src/pages/Home/store.js'

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    // 局部数据store
    store: store
  },
  {
    path: '/import',
    exact: true,
    component: ImportPage
  },
  {
    path: '/login',
    exact: true,
    component: loginPage
  },
  {
    path: '/user-manage',
    exact: true,
    component: userManage
  }
]

export default routes
