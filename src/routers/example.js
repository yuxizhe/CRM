import Loadable from 'react-loadable';

const ExampleUserList = Loadable({
  loader: () => import(/* webpackChunkName: "example" */ 'src/pages/Example/List'),
  loading: () => null,
});
const ExampleInfo = Loadable({
  loader: () => import(/* webpackChunkName: "example" */ 'src/pages/Example/Info'),
  loading: () => null,
});
const ExampleChart = Loadable({
  loader: () => import(/* webpackChunkName: "example" */ 'src/pages/Example/Chart'),
  loading: () => null,
});
const ExampleModal = Loadable({
  loader: () => import(/* webpackChunkName: "example" */ 'src/pages/Example/Modal'),
  loading: () => null,
});

const exampleRoutes = [
  {
    path: '/example/list',
    component: ExampleUserList,
  },
  {
    path: '/example/info',
    component: ExampleInfo,
  },
  {
    path: '/example/chart',
    component: ExampleChart,
  },
  {
    path: '/example/modal',
    component: ExampleModal,
  },
];

export default exampleRoutes;
