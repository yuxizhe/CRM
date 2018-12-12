import { observable, computed, action, toJS } from "mobx";
import HttpClient from "src/utils/httpclient";
import moment from "moment";
import { message } from "antd";

class RolesManageStore {
  @observable roles = [];
  @observable resources = [];
  @observable resourcesTree = [];
  @observable createDialogVisible = false;
  @observable distributeDialogVisible = false;
  @observable currentSelectRole = {};
  @observable expandedKeys = ["0-0"];
  @observable checkedKeys = [];
  @observable autoExpandParent = true;

  @observable form = {
    name: ""
  };

  @computed get filteredRoles() {
    const roles = toJS(this.roles);
    return roles.map(item => {
      item.update_time = moment(item.update_time).format("YYYY-MM-DD HH:mm:ss");
      item.create_time = moment(item.create_time).format("YYYY-MM-DD HH:mm:ss");
      return item;
    });
  }

  getAllRoles() {
    HttpClient.get("/xq/report/permission/role/get/all.json", {
      load_resource: 0
    }).then(
      action(res => {
        this.roles = res.data;
      })
    );
  }

  getAllResources() {
    HttpClient.get("/xq/report/permission/resource/get/all.json").then(
      action(res => {
        this.resources = res.data;
        this.resourcesTree = [
          {
            resource_id: 0,
            resource_pid: 0,
            location: "/",
            name: "所有权限",
            children: this._toTreeData(res.data)
          }
        ];
      })
    );
  }

  createRole() {
    if (!this.form.name) {
      message.error("请输入角色名");
      return;
    }
    HttpClient.post("/xq/report/permission/role/save.json", {
      name: this.form.name
    }).then(() => {
      message.success("创建成功");
      this.hideCreateDialog();
      this.getAllResources();
      this.getAllRoles();
    });
  }

  deleteRole(form) {
    HttpClient.post("/xq/report/permission/role/delete.json", {
      role_id: form.role_id
    }).then(() => {
      message.success("删除成功");
      this.getAllResources();
      this.getAllRoles();
    });
  }

  distributeResource() {
    const currentRoleResources = this.checkedKeys
      .map(item => {
        return item.split("-")[0];
      })
      .filter(item => item !== "0");
    HttpClient.post("/xq/report/permission/role/auth/resources.json", {
      role_id: this.currentSelectRole.role_id,
      resource_ids: currentRoleResources.length
        ? currentRoleResources.join(",")
        : undefined
    }).then(() => {
      message.success("分配成功");
      this.hideDistributeDialog();
      this.getAllResources();
      this.getAllRoles();
    });
  }

  showDistributeDialog(role) {
    HttpClient.get("/xq/report/permission/role/get/resources.json", {
      role_id: role.role_id
    }).then(
      action(res => {
        this.checkedKeys = res.data.map(
          item => item.resource_id + "-" + item.resource_pid
        );
        this.currentSelectRole = role;
        this.distributeDialogVisible = true;
      })
    );
  }

  @action
  showCreateDialog() {
    this.createDialogVisible = true;
  }

  @action
  hideCreateDialog() {
    this.form.name = "";
    this.createDialogVisible = false;
  }

  @action
  hideDistributeDialog() {
    this.currentSelectRole = {};
    this.distributeDialogVisible = false;
    this.checkedKeys = [];
  }

  @action
  setName(name) {
    this.form.name = name;
  }

  @action
  expandNode(expandedKeys) {
    this.expandedKeys = expandedKeys;
    this.autoExpandParent = false;
  }

  @action
  setCheckedKeys(checkedKeys) {
    this.checkedKeys = checkedKeys;
  }

  _toTreeData(data) {
    let pos = {};
    let tree = [];
    let i = 0;
    while (data.length !== 0) {
      if (!data[i].resource_pid) {
        tree.push(Object.assign(data[i], { children: [] }));
        pos[data[i].resource_id] = [tree.length - 1];
        data.splice(i, 1);
        i--;
      } else {
        let posArr = pos[data[i].resource_pid];
        if (posArr !== undefined) {
          let obj = tree[posArr[0]];
          for (let j = 1; j < posArr.length; j++) {
            obj = obj.children[posArr[j]];
          }

          obj.children.push(Object.assign(data[i], { children: [] }));
          pos[data[i].resource_id] = posArr.concat([obj.children.length - 1]);
          data.splice(i, 1);
          i--;
        }
      }
      i++;
      if (i > data.length - 1) {
        i = 0;
      }
    }
    return tree;
  }
}

export default new RolesManageStore();
