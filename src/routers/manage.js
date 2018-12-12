import Loadable from "react-loadable";
const userManage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "manage" */ "src/pages/Manage/UserManage"),
  loading: () => null
});
const RolesManage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "manage" */ "src/pages/Manage/RolesManage"),
  loading: () => null
});
const ResourceManage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "manage" */ "src/pages/Manage/ResourceManage"),
  loading: () => null
});

const manageRoutes = [
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

export default manageRoutes;
