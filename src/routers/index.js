import exampleRoutes from "./example";
import loginRoutes from "./login";
import manageRoutes from "./manage";

let routes = [];
routes = routes.concat(exampleRoutes, loginRoutes, manageRoutes);
export default routes;
