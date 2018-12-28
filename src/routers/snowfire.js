import Loadable from 'react-loadable';

const snowfire = Loadable({
  loader: () => import(/* webpackChunkName: "login" */ 'src/pages/Snowfire'),
  loading: () => null,
});

const snowfireRouter = [{
  path: '/snowfire',
  exact: true,
  component: snowfire,
}];

export default snowfireRouter;
