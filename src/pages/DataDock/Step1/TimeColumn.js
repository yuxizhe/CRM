import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Link } from 'react-router-dom';
import { Form, Input, InputNumber, Button, Row, Drawer, Col, Collapse, Card, Select, Table, Icon, Divider, message, Popover } from 'antd';
import './style.scss'

const ColumnsType = {
    Byte: 'byte',
    Short: 'short',
    Int: 'int',
    Long: 'long',
    Double: 'double',
    Boolean: 'boolean',
    Float: 'float',
    String: 'string',
  };
  
  const Option = Select.Option;

@inject('dataDockStore')
@observer
class TimeColumn extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      timeColumnSelectedRowKeys: [],
      timeColumnSelectedRows: [],
    };
  }
    
  store = this.props.dataDockStore;

   // destColumns和timeColumn的columnType的保存
   saveColumnType = (value, column) => {
    this.store.parsedColumnsData.map((item) => {
      if (item.column === column) {
        item.columnType = value;
      }
      return item;
    })
  }


  //另外time参数提交
  saveTimeColumnFormatStr = (e) => {
    this.store.finalData.transformSpecs[0].saveTimeColumnFormatStr = e.target.value;
  }

  saveMaxOutOfOrders = (e) => {
    this.store.finalData.transformSpecs[0].maxOutOfOrders = e.target.value;
  }

  saveMaxErrorRowsLimitPerHour = (e) => {
    this.store.finalData.transformSpecs[0].maxErrorRowsLimitPerHour = e.target.value;
  }

  saveHourlyCounter = (e) => {
    this.store.finalData.transformSpecs[0].hourlyCounter.hourlyCount = e.target.value;
  }

  //创建finalTimeCloumn
  createFinalTimeColumn = () => {
    if (this.state.timeColumnSelectedRows.length === 0) {
      message.error('未选择destColumns');
      return;
    }
    this.state.timeColumnSelectedRows.map((item) => {
      this.store.finalTimeColumnData.push({
        column: item.column,
        value: item.value,
        columnType: item.columnType,
        maps: item.maps
      })
    })

     //提交timeColumnData
     this.state.timeColumnSelectedRows.map((item) => {
      finalData.transformSpecs[0].timeColumn.column = item.column;
      finalData.transformSpecs[0].timeColumn.columnType = item.columnType;
      finalData.transformSpecs[0].timeColumn.maps = item.maps;
    })
  }

  //退回destColumns页修改数据
  rechangeDestColumnsData = () => {
    this.store.finalDestColumnsData.length = 0;
  }


  render() {

    const $columnsTypeOptions = Object.entries(ColumnsType).map(([key, value]) => (
        <Option key={key} value={value}>{value}</Option>
      ))

    //timeColumn
    const timeColumn = [{
        title: 'column',
        dataIndex: 'column',
        key: 'column',
        width: 200,
      }, {
        title: 'value',
        dataIndex: 'value',
        key: 'value',
        width: 200,
      }, {
        title: 'columnType',
        dataIndex: 'columnType',
        key: 'columnType',
        width: 150,
        render: (text, record) =>
          <Select
            name="columnType"
            defaultValue={record.columnType}
            placeholder="请选择ColumnsType"
            style={{ width: 100 }}
            onChange={(value) => this.saveColumnType(value, record.column)}
          >
            {$columnsTypeOptions}
          </Select>
      }, {
        title: 'maps',
        dataIndex: 'mapsMessage',
        key: 'mapsMessage',
        width: 300,
      },
      ];

    const timeColumnRowSelection = {
        type: 'radio',
        onChange: (timeColumnSelectedRowKeys, timeColumnSelectedRows) => {
          this.setState({
            timeColumnSelectedRowKeys: timeColumnSelectedRowKeys,
            timeColumnSelectedRows: timeColumnSelectedRows,
          })
        },
      };

    const $timeColumn = (
        <div>
          <Card title="timeColumn">
            <Table
              rowSelection={timeColumnRowSelection}
              columns={timeColumn}
              dataSource={this.store.parsedColumnsData}
              bordered
              pagination={false}
            />
          </Card>
          <Card title="另外参数输入">
            <Row>
              <Col span={12}>
                <Input
                  addonBefore="timeColumnFormatStr"
                  style={{ width: 300 }}
                  onChange={e => { this.saveTimeColumnFormatStr(e) }} />
              </Col>
              <Col span={12}>
                <Input
                  addonBefore="maxOutOfOrders"
                  style={{ width: 300 }}
                  defaultValue={10000}
                  onChange={e => { this.saveMaxOutOfOrders(e) }} />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Input
                  addonBefore="maxErrorRowsLimitPerHour"
                  style={{ width: 300 }}
                  defaultValue={100}
                  onChange={e => { this.saveMaxErrorRowsLimitPerHour(e) }} />
              </Col>
              <Col span={12}>
                <Input
                  addonBefore="hourlyCount"
                  style={{ width: 300 }}
                  defaultValue={0}
                  onChange={e => { this.saveHourlyCounter(e) }} />
              </Col>
            </Row>
          </Card>
          <Row>
            <Col span={8} />
            <Col span={4}>
              <Button onClick={this.rechangeDestColumnsData}>
              <Link to='/dataDock/step1/destColumns'>上一页</Link>
              </Button>
            </Col>
            <Col span={4}>
              <Button type={"primary"} onClick={this.createFinalTimeColumn}>
              <Link to='/dataDock/step1/moreInfo'>提交</Link>
              </Button>
            </Col>
            <Col span={8} />
          </Row>
        </div>
      )
    return(
      <div>
        {$timeColumn}        
      </div>
    )
  }
}

export default TimeColumn;