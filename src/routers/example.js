import Loadable from "react-loadable";
const ExampleUserList = Loadable({
  loader: () =>
    import(/* webpackChunkName: "example" */ "src/pages/Example/List"),
  loading: () => null
});

const exampleRoutes = [
  {
    path: "/example/list",
    component: ExampleUserList
  }
];

export default exampleRoutes;
