import { observable, computed, action, toJS } from "mobx";
import { message } from "antd";

import HttpClient from "src/utils/httpclient";

class Store {
  @observable select = "";
  @observable search = "";
  @observable data = [];

  mockData(value) {
    const data = [];
    const name = value ? value : "雪球用户";
    for (let i = 1; i <= 10; i++) {
      data.push({
        key: i,
        name: `${name}${i}`,
        age: `${i}2`,
        address: `New York No. ${i} Lake Park`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`
      });
    }
    return data;
  }

  @action
  getList(type) {
    const info = type ? type : "雪球用户";
    HttpClient.get("/xq/report/permission/user/get/all.json", {
      load_role: 1
    }).then(
      action(res => {
        message.success(info + "查询成功");
        this.data = this.mockData(type);
      })
    );
  }

  clickButton() {
    message.success("按钮点击");
  }
}

export default new Store();
