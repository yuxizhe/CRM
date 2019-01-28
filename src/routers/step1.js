import Loadable from "react-loadable";

const DataDockInfoEntry = Loadable({
  loader: () =>
    import(/* webpackChunkName: "step1_infoEntry" */ "src/pages/DataDock/Step1/InfoEntry"),
  loading: () => null
});

const DataDockConfigPage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "step1_configPage" */ "src/pages/DataDock/Step1/ConfigPage"),
  loading: () => null
});

const DataDockDestColumns = Loadable({
  loader: () =>
    import(/* webpackChunkName: "step1_destColumns" */ "src/pages/DataDock/Step1/DestColumns"),
  loading: () => null
});

const DataDockTimeColumn = Loadable({
  loader: () =>
    import(/* webpackChunkName: "step1_timeColumn" */ "src/pages/DataDock/Step1/TimeColumn"),
  loading: () => null
});

const DataDockMoreInfo = Loadable({
  loader: () =>
    import(/* webpackChunkName: "step1_moreInfo" */ "src/pages/DataDock/Step1/MoreInfo"),
  loading: () => null
});

const DataDockSummary = Loadable({
  loader: () =>
    import(/* webpackChunkName: "step1_summary" */ "src/pages/DataDock/Step1/Summary"),
  loading: () => null
});


const step1Routes = [  
  {
    path: "/datadock/step1/infoEntry",
    component: DataDockInfoEntry
  },  
  {
    path: "/datadock/step1/configPage",
    component: DataDockConfigPage
  },
  {
    path: "/datadock/step1/destColumns",
    component: DataDockDestColumns
  },
  {
    path: "/datadock/step1/timeColumn",
    component: DataDockTimeColumn
  },
  {
    path: "/datadock/step1/moreInfo",
    component: DataDockMoreInfo
  },
  {
    path: "/datadock/step1/summary",
    component: DataDockSummary
  },
];

export default step1Routes
