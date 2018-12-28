import { observable, action } from 'mobx';
import { message } from 'antd';
// import axios from 'axios';

class Store {
  @observable json = {};

  @observable realtime = false;
}

export default new Store();
