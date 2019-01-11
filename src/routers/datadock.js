import Loadable from "react-loadable";
const DataDockStep1 = Loadable({
  loader: () =>
    import(/* webpackChunkName: "datadock_step1" */ "src/pages/DataDock/Step1"),
  loading: () => null
});




export default [
  {
    path: "/datadock/step1",
    component: DataDockStep1
  },
  
  
];
