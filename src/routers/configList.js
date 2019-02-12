import Loadable from "react-loadable";

const DataDockConfigList = Loadable({
    loader: () =>
      import(/* webpackChunkName: "datadock_configList" */ "src/pages/DataDock/ConfigList"),
    loading: () => null
  });

  const configListRoutes = [
    {
        path: "/realtime/platform/configList",
        component: DataDockConfigList
      },
  ]

  export default configListRoutes