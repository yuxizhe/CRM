import { observable, action } from "mobx";
import HttpClient from "src/utils/httpclient";
import { message } from "antd";

class ResourceManage {
  @observable resources = [];
  @observable dialogVisible = false;
  @observable editDialogVisible = false;
  @observable resourcesTree = [];
  @observable expandedKeys = ["0-0"];
  @observable autoExpandParent = true;
  @observable form = {
    resource_id: 0,
    name: "",
    path: "",
    location: "",
    icon: ""
  };
  @observable selectedNode = {};

  getAllResources() {
    HttpClient.get("/xq/report/permission/resource/get/all.json").then(
      action(res => {
        this.resources = res.result_data;
        this.resourcesTree = [
          {
            resource_id: 0,
            resource_pid: 0,
            location: "/",
            name: "所有权限",
            children: this._toTreeData(res.result_data)
          }
        ];
      })
    );
  }

  createResource() {
    HttpClient.post("/xq/report/permission/resource/save.json", {
      resource_pid: this.selectedNode.resource_id,
      resource_id: this.form.resource_id,
      name: this.form.name,
      path: this.form.path,
      location: this.form.location,
      icon: this.form.icon
    }).then(
      action(() => {
        message.success("创建成功");
        this.hideCreateDialog();
        this.getAllResources();
      })
    );
  }

  editResource() {
    HttpClient.post("/xq/report/permission/resource/save.json", {
      resource_pid: this.form.resource_pid,
      resource_id: this.form.resource_id,
      name: this.form.name,
      path: this.form.path,
      location: this.form.location,
      icon: this.form.icon
    }).then(
      action(() => {
        message.success("编辑成功");
        this.hideEditDialog();
        this.getAllResources();
      })
    );
  }

  deleteResource(item) {
    HttpClient.post("/xq/report/permission/resource/delete.json", {
      resource_id: item.resource_id
    }).then(() => {
      message.success("删除成功");
      this.getAllResources();
    });
  }

  @action
  expandNode(expandedKeys) {
    this.expandedKeys = expandedKeys;
    this.autoExpandParent = false;
  }

  @action
  showCreateDialog(node) {
    this.selectedNode = node;
    this.dialogVisible = true;
  }

  @action
  hideCreateDialog() {
    this.selectedNode = {};
    this.dialogVisible = false;
    this.form = {
      resource_id: 0,
      name: "",
      path: "",
      location: "",
      icon: ""
    };
  }

  @action
  showEditDialog(node) {
    this.form = node;
    this.editDialogVisible = true;
  }

  @action
  hideEditDialog() {
    this.editDialogVisible = false;
    this.form = {
      resource_id: 0,
      name: "",
      path: "",
      location: "",
      icon: ""
    };
  }

  @action
  handleValueChange(field, value) {
    this.form[field] = value;
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

export default new ResourceManage();
