
import loginRoutes from "./login";
import step1Routes from "./step1";
import step2Routes from "./step2";
import step3Routes from "./step3"

let routes = [];
routes = routes.concat(loginRoutes,step1Routes,step2Routes,step3Routes);
export default routes;
