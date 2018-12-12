import Loadable from "react-loadable";

const Example = Loadable({
  loader: () => import(/* webpackChunkName: "example" */ "src/pages/Example"),
  loading: () => null
});
const ImportPage = Loadable({
  loader: () => import(/* webpackChunkName: "import" */ "src/pages/ImportPage"),
  loading: () => null
});
const loginPage = Loadable({
  loader: () => import(/* webpackChunkName: "login" */ "src/pages/Login"),
  loading: () => null
});
const userManage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "user-manage" */ "src/pages/UserManage"),
  loading: () => null
});
const RolesManage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "role-manage" */ "src/pages/RolesManage"),
  loading: () => null
});
const ResourceManage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "resource-manage" */ "src/pages/ResourceManage"),
  loading: () => null
});
const ExampleUserList = Loadable({
  loader: () =>
    import(/* webpackChunkName: "example" */ "src/pages/Example/List"),
  loading: () => null
});

import store from "src/pages/Example/store.js";

const routes = [
  {
    path: "/example",
    exact: true,
    component: Example,
    // 局部数据store
    store: store
  },
  {
    path: "/example/list",
    component: ExampleUserList
  },
  {
    path: "/import",
    exact: true,
    component: ImportPage
  },
  {
    path: "/login",
    exact: true,
    component: loginPage
  },
  {
    path: "/user-manage",
    exact: true,
    component: userManage
  },
  {
    path: "/role-manage",
    exact: true,
    component: RolesManage
  },
  {
    path: "/resource-manage",
    exact: true,
    component: ResourceManage
  }
];

export default routes;
