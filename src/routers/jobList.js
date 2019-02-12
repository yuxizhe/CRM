import Loadable from "react-loadable";

const DataDockJobList = Loadable({
    loader: () =>
      import(/* webpackChunkName: "datadock_jobList" */ "src/pages/DataDock/JobList"),
    loading: () => null
  });

  const jobListRoutes = [
    {
        path: "/realtime/platform/jobList",
        component: DataDockJobList
      },
  ]

  export default jobListRoutes