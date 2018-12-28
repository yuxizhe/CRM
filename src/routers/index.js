import exampleRoutes from './example';
import loginRoutes from './login';
import manageRoutes from './manage';
import snowfireRoutes from './snowfire';

let route = [];
route = route.concat(exampleRoutes, loginRoutes, manageRoutes, snowfireRoutes);

const routes = route;
export default routes;
