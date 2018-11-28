import { observable, action } from "mobx";
import HttpClient from "src/utils/httpclient";
import Cookie from "src/utils/cookie";

export default class NavStore {
  @observable resourcesTree = [];
  @observable userName = window.localStorage.getItem("userName");
  @action getUserResource() {
    HttpClient.get("/xq/report/auth/query.json").then(
      action(res => {
        if (res) {
          this.resourcesTree = this._toTreeData(res.result_data);
        }
      })
    );
  }

  @action logout() {
    HttpClient.post("/xq/report/auth/logout.json").then(
      action(res => {
        if (res) {
          if (process.env.NODE_ENV === "development") {
            Cookie.clear("xq_crm_token");
          }
          window.localStorage.removeItem("is_login");
          window.location.href = "/login";
        }
      })
    );
  }

  _toTreeData(data) {
    const tree = [];
    // 按pid分组和筛选根节点
    const childrens = {};
    data.forEach(item => {
      const pid = item.resource_pid;
      if (pid === 0) {
        tree.push(item);
      } else {
        childrens[pid] = childrens[pid] || [];
        childrens[pid].push(item);
      }
    });
    // 按根节点id取出子节点
    tree.forEach(item => {
      const children = childrens[item.resource_id];
      if (children && children.length) {
        item.children = children;
      }
    });
    return tree;
  }
}
