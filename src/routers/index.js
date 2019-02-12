
import loginRoutes from "./login";
import newConfigRoutes from "./newConfig";
import configListRoutes from "./configList";
import jobListRoutes from "./jobList";
import warningPageRoutes from "./warningPage";

let routes = [];
routes = routes.concat(loginRoutes,newConfigRoutes,configListRoutes,jobListRoutes,warningPageRoutes);
export default routes;
