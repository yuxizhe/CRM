import { observable, computed, action, toJS } from "mobx";
import HttpClient from "src/utils/httpclient";
import moment from "moment";
import { message } from "antd";

class UserManageStore {
  @observable users = [];
  @observable roles = [];
  @observable currentUserRoles = [];
  @observable createDialogVisible = false;
  @observable distributeDialogVisible = false;
  @observable currentSelectUser = {};

  @observable form = {
    name: ""
  };

  @computed get filteredUsers() {
    const users = toJS(this.users);
    return users.map(item => {
      item.role_ids = item.roles ? item.roles.map(item => item.role_id) : "--";
      item.roles = item.roles
        ? item.roles.map(item => item.name).join(", ")
        : "--";
      item.update_time = moment(item.update_time).format("YYYY-MM-DD HH:mm:ss");
      item.create_time = moment(item.create_time).format("YYYY-MM-DD HH:mm:ss");

      return item;
    });
  }

  getAllUsers() {
    HttpClient.get("/xq/report/permission/user/get/all.json", {
      load_role: 1
    }).then(
      action(res => {
        this.users = res.data;
      })
    );
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

  createUser() {
    if (!this.form.name) {
      message.error("请输入姓名");
      return;
    }
    HttpClient.post("/xq/report/permission/user/save.json", {
      name: this.form.name
    }).then(() => {
      message.success("创建成功");
      this.hideCreateDialog();
      this.getAllUsers();
      this.getAllRoles();
    });
  }

  deleteUser(form) {
    HttpClient.post("/xq/report/permission/user/delete.json", {
      user_id: form.user_id
    }).then(() => {
      message.success("删除成功");
      this.getAllUsers();
      this.getAllRoles();
    });
  }

  distributeRoles() {
    HttpClient.post("/xq/report/permission/user/auth/roles.json", {
      user_id: this.currentSelectUser.user_id,
      role_ids:
        this.currentUserRoles && this.currentUserRoles.length
          ? this.currentUserRoles.join(",")
          : []
    }).then(() => {
      message.success("分配成功");
      this.hideDistributeDialog();
      this.getAllUsers();
      this.getAllRoles();
    });
  }

  @action
  showDistributeDialog(user) {
    this.currentUserRoles = user.role_ids;
    this.currentSelectUser = user;
    this.distributeDialogVisible = true;
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
    this.currentSelectUser = {};
    this.currentUserRoles = [];
    this.distributeDialogVisible = false;
  }

  @action
  changeCurrentUserRoles(roles) {
    this.currentUserRoles = roles;
  }

  @action
  setName(name) {
    this.form.name = name;
  }
}

export default new UserManageStore();
