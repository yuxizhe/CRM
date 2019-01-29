import Loadable from "react-loadable";

const DataDockStep4 = Loadable({
    loader: () =>
      import(/* webpackChunkName: "datadock_step4" */ "src/pages/DataDock/Step4"),
    loading: () => null
  });

  const step4Routes = [
    {
        path: "/datadock/step4",
        component: DataDockStep4
      },
  ]

  export default step4Routes