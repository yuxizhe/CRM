import Loadable from "react-loadable";

const DataDockWarningPage = Loadable({
    loader: () =>
      import(/* webpackChunkName: "datadock_warningPage" */ "src/pages/DataDock/WarningPage"),
    loading: () => null
  });

  const warningPageRoutes = [
    {
        path: "/realtime/platform/warningPage",
        component: DataDockWarningPage
      },
  ]

  export default warningPageRoutes