// import Home from './Home'
// import Grid from './Grid'
import Loadable from 'react-loadable'
import { fetchPopularRepos } from './api'

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ './pages/Home'),
  loading: () => null
})
const Grid = Loadable({
  loader: () => import(/* webpackChunkName: "grid" */ './pages/Grid'),
  loading: () => null
})
const ImportPage = Loadable({
  loader: () => import(/* webpackChunkName: "grid" */ './pages/ImportPage'),
  loading: () => null
})
const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/import',
    exact: true,
    component: ImportPage
  },
  {
    path: '/:id',
    component: Grid,
    fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop())
  }
]

export default routes
