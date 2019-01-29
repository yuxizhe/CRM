import Loadable from 'react-loadable';

const loginPage = Loadable({
  loader: () => import(/* webpackChunkName: "login" */ 'src/pages/Login'),
  loading: () => null,
});

const loginRoutes = [
  {
    path: '/login',
    exact: true,
    component: loginPage,
  },
];

export default loginRoutes;
