import Loadable from 'react-loadable'

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ 'src/pages/Home'),
  loading: () => null
})
const ImportPage = Loadable({
  loader: () => import(/* webpackChunkName: "grid" */ 'src/pages/ImportPage'),
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
  }
]

export default routes
