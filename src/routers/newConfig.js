import Loadable from "react-loadable";

const DataDockInfoEntry = Loadable({
  loader: () =>
    import(/* webpackChunkName: "newConfig_infoEntry" */ "src/pages/DataDock/NewConfig/InfoEntry"),
  loading: () => null
});

const DataDockConfigPage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "newConfig_configPage" */ "src/pages/DataDock/NewConfig/ConfigPage"),
  loading: () => null
});

const DataDockDestColumns = Loadable({
  loader: () =>
    import(/* webpackChunkName: "newConfig_destColumns" */ "src/pages/DataDock/NewConfig/DestColumns"),
  loading: () => null
});

const DataDockTimeColumn = Loadable({
  loader: () =>
    import(/* webpackChunkName: "newConfig_timeColumn" */ "src/pages/DataDock/NewConfig/TimeColumn"),
  loading: () => null
});

const DataDockMoreInfo = Loadable({
  loader: () =>
    import(/* webpackChunkName: "newConfig_moreInfo" */ "src/pages/DataDock/NewConfig/MoreInfo"),
  loading: () => null
});

const DataDockSummary = Loadable({
  loader: () =>
    import(/* webpackChunkName: "newConfig_summary" */ "src/pages/DataDock/NewConfig/Summary"),
  loading: () => null
});


const newConfigRoutes = [  
  {
    path: "/realtime/platform/newConfig/infoEntry",
    component: DataDockInfoEntry
  },  
  {
    path: "/realtime/platform/newConfig/configPage",
    component: DataDockConfigPage
  },
  {
    path: "/realtime/platform/newConfig/destColumns",
    component: DataDockDestColumns
  },
  {
    path: "/realtime/platform/newConfig/timeColumn",
    component: DataDockTimeColumn
  },
  {
    path: "/realtime/platform/newConfig/moreInfo",
    component: DataDockMoreInfo
  },
  {
    path: "/realtime/platform/newConfig/summary",
    component: DataDockSummary
  },
];

export default newConfigRoutes
