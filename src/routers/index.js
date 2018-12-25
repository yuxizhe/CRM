import exampleRoutes from './example';
import loginRoutes from './login';
import manageRoutes from './manage';

let route = [];
route = route.concat(exampleRoutes, loginRoutes, manageRoutes);

const routes = route;
export default routes;
