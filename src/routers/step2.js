import Loadable from "react-loadable";

const DataDockStep2 = Loadable({
    loader: () =>
      import(/* webpackChunkName: "datadock_step2" */ "src/pages/DataDock/Step2"),
    loading: () => null
  });

  const step2Routes = [
    {
        path: "/datadock/step2",
        component: DataDockStep2
      },
  ]

  export default step2Routes