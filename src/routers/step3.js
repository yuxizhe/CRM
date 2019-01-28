import Loadable from "react-loadable";

const DataDockStep3 = Loadable({
    loader: () =>
      import(/* webpackChunkName: "datadock_step3" */ "src/pages/DataDock/Step3"),
    loading: () => null
  });

  const step3Routes = [
    {
        path: "/datadock/step3",
        component: DataDockStep3
      },
  ]

  export default step3Routes