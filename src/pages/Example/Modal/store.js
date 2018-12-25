import { observable, action } from 'mobx';
import { message } from 'antd';

class Store {
  @observable userInfo = {
    name: '雪球用户',
    email: '123456@163.com',
    age: 34,
    address: '望京西园一区 411号楼 304',
    phone: '13412341234',
    description: '一位不明真相的群众',
  }

  @observable modalVisible = false

  @action
  toggleVisible() {
    this.modalVisible = !this.modalVisible;
  }

  @action
  getUser(value) {
    message.success('查询成功');
    this.userInfo.name = value;
  }
}

export default new Store();
