import { observable, action } from 'mobx';
import { message } from 'antd';

class Store {
  @observable options = {
    title: {
      text: 'My chart',
    },
    series: [{
      data: [1, 2, 3],
    }],
  }

  @action
  changeChart() {
    message.success('图表更新');
    this.options.series[0].data = this.options.series[0].data.slice().reverse();
  }
}

export default new Store();
