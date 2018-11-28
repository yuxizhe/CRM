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
    import(/* webpackChunkName: "user-manage" */ 'src/pages/UserManage'),
  loading: () => null
})
const RolesManage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "role-manage" */ 'src/pages/RolesManage'),
  loading: () => null
})
const ResourceManage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "resource-manage" */ 'src/pages/ResourceManage'),
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
  },
  {
    path: '/role-manage',
    exact: true,
    component: RolesManage
  },
  {
    path: '/resource-manage',
    exact: true,
    component: ResourceManage
  }
]

export default routes
