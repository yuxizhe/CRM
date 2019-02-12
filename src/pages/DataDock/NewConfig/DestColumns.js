import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Link } from 'react-router-dom';
import { 
  Button, 
  Row, 
  Col, 
  Card, 
  Select, 
  Table, 
  Icon, 
  Divider, 
  message, 
  Popover 
} from 'antd';
import Maps from './Maps';
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
class DestColumns extends Component {

  store = this.props.dataDockStore;
  
  //退回配置页重新配置
  returnToParse = () => {
    this.store.parsedColumnsData.length = 0;
    this.store.recordData.length = 0;
  }

  //创建finalDestColumns
  createFinalDestColumns = () => {
    //未选择就无法提交
    if (this.store.destColumnsSelectedRows.length === 0) {
      message.error('未选择destColumns');
      return;
    }

    //提交destColumnsData
    this.store.destColumnsSelectedRows.map((item) => {
      this.store.finalData.transformSpecs[0].destColumns.push({
        column: item.column,
        columnType: item.columnType,
        maps: item.maps,
      })
    })

    //finalDestColumns
    this.store.destColumnsSelectedRows.map((item) => {
      this.store.finalDestColumnsData.push({
        column: item.column,
        value: item.value,
        columnType: item.columnType,
        maps: item.maps,
        mapsMessage: '',
      })
    })
  }

  // destColumns和timeColumn的columnType的保存
  saveColumnType = (value, column) => {
    this.store.parsedColumnsData.map((item) => {
      if (item.column === column) {
        item.columnType = value;
      }
      return item;
    })
  }
  
  render() {

    const destColumnsRowSelection = {
      columnWidth:20,
      onChange: (destColumnsSelectedRowKeys, destColumnsSelectedRows) => {
          this.store.destColumnsSelectedRows= destColumnsSelectedRows;
      },
    };

    const $columnsTypeOptions = Object.entries(ColumnsType).map(([key, value]) => (
        <Option key={key} value={value}>{value}</Option>
      ))
  
      // maps示例
      const MapsContent = (
        <div>
          <p>
            Maps示例：
          </p>
          <p>
            映射类输入：ios
          </p>
          <p>
            被映射类输入：ipad iphone(每个标签输入后记得回车)
          </p>
          <p>
            输出："ipad": "ios","iphone": "ios"
          </p> 
        </div>
      )
  
      const $maps = (
        <div>
          maps
        <Popover trigger="click" content={MapsContent}>
            <Icon type="question-circle-o" />
          </Popover>
        </div>
      )


    // destColumns
    const destColumns = [{
        title: 'column',
        dataIndex: 'column',
        key: 'column',
        width: 75,
      }, {
        title: 'value',
        dataIndex: 'value',
        key: 'value',
        width: 200,
      }, {
        title: 'columnType',
        dataIndex: 'columnType',
        key: 'columnType',
        width: 100,
        render: (text, record) =>
          <Select
            name="columnType"
            placeholder="请选择ColumnsType"
            defaultValue={record.columnType}
            style={{ width: 80 }}
            onChange={(value) => this.saveColumnType(value, record.column)}
          >
            {$columnsTypeOptions}
          </Select>
      }, {
        title: $maps,
        dataIndex: 'maps',
        key: 'maps',
        width: 300,
        render: (text, record) =>
          <div>
            <Maps
              record={record}
              column={record.column} />
          </div>
      },
      ];

      const $destColumns = (
        <Card className="destColumns">
          <Table
            rowSelection={destColumnsRowSelection}
            columns={destColumns}
            dataSource={this.store.parsedColumnsData}
            bordered
            pagination={false}
            title={() => 'destColumns配置页'}
          />
          <Divider/>
          <Row>
            <Col span={8} />
            <Col span={4}>
              <Button onClick={this.returnToParse}>
              <Link to='/realtime/platform/newConfig/configPage'>上一页</Link>
              </Button>
            </Col>
            <Col span={4}>
              <Button type={"primary"} onClick={this.createFinalDestColumns}>
              <Link to='/realtime/platform/newConfig/timeColumn'>确定</Link>
              </Button>
            </Col>
            <Col span={8} />
          </Row>
        </Card>
      )
  

    return(
      <div>
        {$destColumns}         
      </div>
    )
  }
}

export default DestColumns ;