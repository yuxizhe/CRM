import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
  Input, Card, Divider,
} from 'antd';
import { observer } from 'mobx-react';

import store from './store';

const { Search } = Input;

@observer
class Chart extends React.Component {
  store = store;

  changeChart = (value) => {
    this.store.changeChart(value);
  }

  render() {
    return (
      <div>
        <Card title="图表示例">
          <Search
            placeholder="请输入ID"
            onSearch={this.changeChart}
            enterButton="搜索"
            style={{ width: 200 }}
          />
          <Divider />
          <HighchartsReact
            highcharts={Highcharts}
            allowChartUpdate
            updateArgs={[true, true, true]}
            options={this.store.options}
          />
          <p>
数据：
            {JSON.stringify(this.store.options)}
          </p>
        </Card>
      </div>
    );
  }
}

export default Chart;
