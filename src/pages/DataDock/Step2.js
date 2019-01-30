import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {
  Button, Row, Col, Card, Table, Divider,
} from 'antd';
import ReactJson from 'react-json-view';
import './style.scss';


@inject('dataDockStore')
@observer
class Step2 extends Component {
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
          <ReactJson src={text} collapsed />
        </span>
      ),
    }, {
      title: '操作',
      dataIndex: 'action',
      width: 200,
      render: (text, record) => (
        <span>
          <Button onClick={()=>this.createJob(record.keyName)}>job启动</Button>
          <Divider type="vertical" />
          <Button onClick={this.changeConfig}>更改配置</Button>
        </span>

      ),
    }]

    createJob =(key)=>{
      const params={}
      params.key = key;
      params.user = "luqi";
      this.store.createJob(params);
    }

    render() {
      return (
        <div>
          <Row>
            <Col>
              <Card>
                <Button onClick={()=>this.store.getAllConf(this.store.step2Data)}>获取信息</Button>
                <Table
                  columns={this.columns()}
                  dataSource={this.store.step2Data}
                  bordered
                  pagination={false}
                  title={() => '配置列表'}
                />
              </Card>
            </Col>
          </Row>
          {/* <Row>
                    <Col span={4} />
                    <Col span={12}>
                        <Button>返回上一页并配置下一条数据</Button>
                    </Col>
                    <Col span={4}>
                        <Button>下一页</Button>
                    </Col>
                    <Col span={4} />
                </Row> */}
        </div>
      );
    }
}

export default Step2;
