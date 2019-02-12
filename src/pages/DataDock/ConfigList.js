import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {
  Button, Row, Col, Card, Table, Divider,
} from 'antd';
import ReactJson from 'react-json-view';
import './style.scss';


@inject('dataDockStore')
@observer
class ConfigList extends Component {
  store = this.props.dataDockStore;


  columns = () => [{
    title: '序号',
    dataIndex: 'number',
    width: 50,
  }, {
    title: '数据名',
    dataIndex: 'keyName',
    width: 100,
  }, {
    title: 'JSON数据',
    dataIndex: 'value',
    width: 250,
    render: (text, record) => (
      <span>
        <ReactJson src={text} collapsed enableClipboard={false} displayDataTypes={false} displayObjectSize={false} />
      </span>
    ),
  }, {
    title: '操作',
    dataIndex: 'action',
    width: 200,
    render: (text, record) => (
      <span>
        <Button onClick={() => this.createJob(record.keyName, record.number)} disabled={this.store.jobButton[record.number - 1]}>job创建</Button>
        <Divider type="vertical" />
        <Button onClick={() => this.changeConfig(record.keyName, record.value)}>更改配置</Button>
      </span>

    ),
  }]

  createJob = (key, number) => {
    const params = {};
    params.key = key;
    params.user = 'luqi';
    this.store.jobButton[number - 1] = true;
    this.store.createJob(params).then(res => {
      this.props.history.push('/realtime/platform/configList');
    })   
  }

  // 回到配置页配置下一条kafka数据
  startNextconf = () => {
    this.store.configListData.length = 0;
    this.store.jobButton.length = 0;
    this.props.history.push('/realtime/platform/newConfig/infoEntry');
  }

  // 到job列表页
  goToJobList = () => {
    this.store.jobListData.length = 0;
    const num = { num: 50 };
    this.store.getJobList(num).then(res => {
        this.props.history.push('/realtime/platform/jobList');
      });
  }

  componentDidMount() {
    this.store.configListData.length=0;
    this.store.getAllConf().then(res=>{
      this.props.history.push('/realtime/platform/configList');
    })
  }

  render() {
    return (  
      <Card className="config-list">
        {/* <Button onClick={() => this.getAllConf(this.store.configListData)}>获取信息</Button> */}
        <Table
          columns={this.columns()}
          dataSource={this.store.configListData}
          bordered
          pagination={false}
          title={() => '配置列表'}
        />
        <Divider/>  
        <Row>
          <Col span={4} />
          <Col span={12}>
            <Button onClick={this.startNextconf}>返回数据配置页并配置新数据</Button>
          </Col>
          <Col span={4}>
            <Button onClick={this.goToJobList}>进入job列表页</Button>
          </Col>
          <Col span={4} />
        </Row>
      </Card>
    );
  }
}

export default ConfigList;
