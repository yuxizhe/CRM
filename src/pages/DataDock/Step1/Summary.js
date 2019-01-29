import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { 
  Button,
  Row, 
  Col, 
  Card, 
  Table, 
  Divider,
} from 'antd';
import { Link } from 'react-router-dom';
import './style.scss'

@inject('dataDockStore')
@observer
class Summary extends Component {
    
   
      
  store = this.props.dataDockStore;

  //showpage的确定键，跳转到数据监控页
  gotoNextPage = () => {
    this.resetData()
    
  }

  //最后初始化所有中间数据,包括kafkaRawData,kafkaData,kafkaValueParseStep,finalData,recordData,parsedColumnsData,mapsData,finalDestColumnsData,finalTimeColumnData
  resetData = () => {
    this.store.finalData = {
      jobName: '',
      transformSpecs: [{
        source: {},
        kafkaKeyParseStep: null,
        kafkaValueParseStep: {},
        destColumns: [],
        timeColumn: {},
        maxOutOfOrders: 10000,
        maxErrorRowsLimitPerHour: 100,
        hourlyCounter: {
          hourlyCount: 0,
        }
      }],
      sql: "",
      finalDestColumns: [],
      finalTimeColumn: [],
      dest: '',
      enableEventTime: true,
    }

    this.store.kafkaValueParseStep = {
      parseType: "",
      stepParameter: "",
      stepName: "",
      parsedColumns: [],
      subParseSteps: {},
    }

    this.store.kafkaRawData = ""
    this.store.kafkaData = []
    this.store.recordData = [];
    this.store.parsedColumnsData = [];
    this.store.mapsData = [1]
    this.store.finalDestColumnsData = [];
    this.store.finalTimeColumnData = [];
  }
  render() {

    // finalDestColumns
    const finalColumns = [{
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
      }, {
        title: 'maps',
        dataIndex: 'mapsMessage',
        key: 'mapsMessage',
        width: 300,
      },
      ];

  //recordColumns
  const recordColumns = [{
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
    title: 'faultBehavior',
    dataIndex: 'faultBehavior',
    key: 'faultBehavior',
    width: 200,
  }, {
    title: 'defaultValue',
    dataIndex: 'defaultValue',
    key: 'defaultValue',
    width: 200,
  }, {
    title: '上一层名称',
    dataIndex: 'parentsName',
    key: 'parentsName',
    width: 200,
  }, {
    title: '被何种解析方式解析',
    dataIndex: 'parseType',
    key: 'parseType',
    width: 200,
  }
  ]

  //历史信息展示
  const $firstPageMessage = (
    <div>
      <Card>
        <ol>
          第一页信息录入
            <li>
            Kafka Server:{this.store.finalData.transformSpecs[0].source.bootstrapServers}
          </li>
          <li>
            Kafka Topic:{this.store.finalData.transformSpecs[0].source.topic}
          </li>
          <li>
            消费组信息:{this.store.finalData.transformSpecs[0].source.consumerGroupId}
          </li>
          <li>
            zk Server:{this.store.finalData.transformSpecs[0].source.zookeeperServers}
          </li>
        </ol>
      </Card>
    </div>
  )

  const $summaryPage = (
    <div>
      {$firstPageMessage}
      <Divider />
      <Table
        columns={recordColumns}
        dataSource={this.store.recordData}
        bordered
        pagination={false}
        title={() => 'kafkaValueParseStep记录'}
      />
      <Divider />
      <Table
        columns={finalColumns}
        dataSource={this.store.destColumnsSelectedRows}
        bordered
        pagination={false}
        title={() => 'destColumns选择'}
      />
      <Divider />
      <Table
        columns={finalColumns}
        dataSource={this.store.timeColumnSelectedRows}
        bordered
        pagination={false}
        title={() => 'destColumns选择'}
      />
      <Card>
        <ol>
          第四页信息录入
              <li>
            saveTimeColumnFormatStr:{this.store.finalData.transformSpecs[0].saveTimeColumnFormatStr}
          </li>
          <li>
            maxOutOfOrders:{this.store.finalData.transformSpecs[0].maxOutOfOrders}
          </li>
          <li>
            maxErrorRowsLimitPerHour:{this.store.finalData.transformSpecs[0].maxErrorRowsLimitPerHour}
          </li>
          <li>
            hourlyCount:{this.store.finalData.transformSpecs[0].hourlyCounter.hourlyCount}
          </li>
        </ol>
      </Card>
      <Divider />
      <Table
        columns={finalColumns}
        dataSource={this.store.finalDestColumnsSelectedRows}
        bordered
        pagination={false}
        title={() => 'finalDestColumns选择'}
      />
      <Divider />
      <li>
        sql:{this.store.finalData.sql}
      </li>
      <Divider />
      <Table
        columns={finalColumns}
        dataSource={this.store.finalTimeColumnSelectedRows}
        bordered
        pagination={false}
        title={() => 'finalTimeColumn选择'}
      />
      <Divider />
      <Row>
        <Col span={11} />
        <Col span={13}>
          <Button type="primary" onClick={this.gotoNextPage}>
            <Link to='/dataDock/step2'>进入监控页</Link>
          </Button>

        </Col>
      </Row>
    </div>
  )

    return(
      <div>
        {$summaryPage}     
      </div>
    )
  }
}

export default Summary ;