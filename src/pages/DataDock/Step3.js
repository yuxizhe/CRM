import React, { Component } from 'react';
import { Button, Row, Col, Table } from 'antd';
import { observer } from "mobx-react";
import DataDockStepWrapper from './DataDockStepWrapper';
import store from './store';


const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',

}, {
  title: 'Value',
  dataIndex: 'value',
  key: 'value',
}, {
  title: 'Default',
  dataIndex: 'default',
  key: 'default',
}];

const finalData = [{
  key: '1',
  name: 'John Brown',
  value: 32,
  default: 'New York No. 1 Lake Park',

}, {
  key: '2',
  name: 'Jim Green',
  value: 42,
  default: 'London No. 1 Lake Park',

}, {
  key: '3',
  name: 'Joe Black',
  value: 32,
  default: 'Sidney No. 1 Lake Park',

}];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  
};


class Step3 extends Component {
  store = store;
  
  handelButtonClick = value => {
    this.store.clickFinalButton(value);
  }

  render() {
    const { history } = this.props;
    const onRestart = () => {
      history.push('/datadock/step1');
    };
  
    return (
      <DataDockStepWrapper step={2}>
        <Row>
          <Col span={8} />
          <Col span={8}>处理成功</Col>
          <Col span={8} />
        </Row>
        <Row type="flex" justify="center">
          <Col span={18}>
          <Table rowSelection={rowSelection} columns={columns} dataSource={finalData} />
          </Col>
        </Row>
        
        <Row>
          <Col span={8} />
          <Col span={8}>
            <Button type="primary" onClick={onRestart}>
              重新处理
            </Button>
            <Button onClick={this.handelButtonClick}> 
            完成
            </Button>
          </Col>
          <Col span={8} />         
        </Row>
        </DataDockStepWrapper>
    );
  }
}

export default Step3;