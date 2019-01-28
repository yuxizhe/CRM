import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { 
  Form, 
  Input,  
  Button, 
  Row, 
  Col, 
  Card, 
  Select, 
  Table, 
  Divider, 
  message, 
} from 'antd';
import { Link } from 'react-router-dom';
import './style.scss'

const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  
@Form.create()
@inject('dataDockStore')
@observer
class MoreInfo extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
          
          finalDestColumnsSelectedRowKeys: [],
          finalDestColumnsSelectedRows: [],
    
          finalTimeColumnSelectedRowKeys: [],
          finalTimeColumnSelectedRows: [],

        };
      }

  store = this.props.dataDockStore;

  // sql
  saveSql = (e) => {
    this.store.finalData.sql = e.target.value;

  }

  //退回timeColumn页修改数据
  rechangeTimeColumnData = () => {
    this.store.finalTimeColumnData.length = 0;
    this.previousPage()
  }

  //创建监控数据
  createStep2Data = () => {

    this.store.step2Data.push({
      number: this.state.dataNumber,
      jobName: this.store.finalData.jobName,
      json: this.store.finalData,
    })
  }

  //创建符合最终格式的kafka数据
  createTrueKafkaValueParseStep = (source) => {
    if (source.parsedColumns && source.parsedColumns.length) {
      source.parsedColumns.map((item) => {
        delete item.value;
      })

      if ((Object.keys(source.subParseSteps)).length) {
        (Object.entries(source.subParseSteps)).map(([key, value]) => {
          this.createTrueKafkaValueParseStep(value);
        })
      }
    }
  }


  //提交所有数据,包括kafkaKeyParseStep,finalDestColumnsData,finalTimeColumnData
  submitAllData = () => {
    const { finalData } = this.store
    //kafkaKeyParseStep
    this.createTrueKafkaValueParseStep(this.store.kafkaValueParseStep);
    finalData.transformSpecs[0].kafkaValueParseStep = this.store.kafkaValueParseStep;

    

    //finalDestColumnsData
    this.state.finalDestColumnsSelectedRows.map((item) => {
      finalData.finalDestColumns.push({
        column: item.column,
        columnType: item.columnType,
        maps: item.maps,
      })
    })

    //finalTimeColumnData
    this.state.finalTimeColumnSelectedRows.map((item) => {
      finalData.finalTimeColumn.push({
        column: item.column,
        columnType: item.columnType,
        maps: item.maps,
      })
    })
  
    const returnData={}

    // const params = {
    //   key:finalData.jobName,
    //   value :JSON.stringify(finalData),
    //   comment:'yangluqi',
    // }
    const value = {name:"test",}

    const params = {
      key:"test",
      value :value,
      comment:'yangluqi',
    }

    returnData.params = params;


    this.store.returnKafkaMessage(returnData);
    
    message.success('传送成功')
    console.log(returnData)
    this.createStep2Data()
  }

  test = () =>{
    const returnData={}
    const params = {
      key: "test",
      value: " {\"jobName\":\"use_behavior\",\"transformSpecs\":[{\"source\":{\"bootstrapServers\":\"10.10.22.7:9092\",\"topicName\":\"user_behavior\",\"consumerGroupId\":\"flink_user_behavior\"},\"kafkaKeyParseStep\":{\"stepName\":\"keyRootParseStep\",\"parseType\":\"DONOTHING_PARSER\",\"stepParameter\":null,\"parsedColumns\":[{\"column\":\"key_time\",\"extractParam\":\"0\",\"defaultValue\":\"\",\"faultBehavior\":\"ERROR\"}],\"subParseSteps\":{}},\"kafkaValueParseStep\":{\"stepName\":\"root\",\"parseType\":\"SPLIT_PARSER\",\"stepParameter\":\"\\\\|\",\"parsedColumns\":[{\"column\":\"uid\",\"extractParam\":\"0\",\"defaultValue\":\"\",\"faultBehavior\":\"FILTER_ROW\"},{\"column\":\"version_raw\",\"extractParam\":\"1\",\"defaultValue\":\"\",\"faultBehavior\":\"FILTER_ROW\"},{\"column\":\"log_time\",\"extractParam\":\"2\",\"defaultValue\":\"\",\"faultBehavior\":\"FILTER_ROW\"},{\"column\":\"page_id\",\"extractParam\":\"3\",\"defaultValue\":\"\",\"faultBehavior\":\"FILTER_ROW\"},{\"column\":\"component_type\",\"extractParam\":\"4\",\"defaultValue\":\"\",\"faultBehavior\":\"FILTER_ROW\"},{\"column\":\"extend0\",\"extractParam\":\"6\",\"defaultValue\":\"\",\"faultBehavior\":\"FILTER_ROW\"}],\"subParseSteps\":{\"version_raw\":{\"stepName\":\"version_raw\",\"parseType\":\"SPLIT_PARSER\",\"stepParameter\":\"\\\\s+\",\"parsedColumns\":[{\"column\":\"plat\",\"extractParam\":\"1\",\"defaultValue\":\"-\",\"faultBehavior\":\"FILL_WITH_DEFAULT_VALUE\"},{\"column\":\"version\",\"extractParam\":\"2\",\"defaultValue\":\"-\",\"faultBehavior\":\"FILL_WITH_DEFAULT_VALUE\"},{\"column\":\"net_op\",\"extractParam\":\"3\",\"defaultValue\":\"-\",\"faultBehavior\":\"FILL_WITH_DEFAULT_VALUE\"},{\"column\":\"net_type\",\"extractParam\":\"4\",\"defaultValue\":\"-\",\"faultBehavior\":\"FILL_WITH_DEFAULT_VALUE\"},{\"column\":\"device\",\"extractParam\":\"5\",\"defaultValue\":\"-\",\"faultBehavior\":\"FILL_WITH_DEFAULT_VALUE\"}],\"subParseSteps\":{}},\"extend0\":{\"stepName\":\"extend0\",\"parseType\":\"JSON_PARSER\",\"stepParameter\":null,\"parsedColumns\":[{\"column\":\"status_id\",\"extractParam\":\"status_id\",\"defaultValue\":\"-\",\"faultBehavior\":\"FILL_WITH_DEFAULT_VALUE\"},{\"column\":\"target_id\",\"extractParam\":\"user_id\",\"defaultValue\":\"-\",\"faultBehavior\":\"FILL_WITH_DEFAULT_VALUE\"},{\"column\":\"symbol\",\"extractParam\":\"symbol\",\"defaultValue\":\"-\",\"faultBehavior\":\"FILL_WITH_DEFAULT_VALUE\"},{\"column\":\"name\",\"extractParam\":\"name\",\"defaultValue\":\"-\",\"faultBehavior\":\"FILL_WITH_DEFAULT_VALUE\"},{\"column\":\"duration\",\"extractParam\":\"duration\",\"defaultValue\":\"0\",\"faultBehavior\":\"FILL_WITH_DEFAULT_VALUE\"}],\"subParseSteps\":{}}}},\"destColumns\":[{\"column\":\"uid\",\"columnType\":\"LONG\",\"maps\":[]},{\"column\":\"plat\",\"columnType\":\"STRING\",\"maps\":[{\"ipad\":\"ios\",\"iphone\":\"ios\"}]},{\"column\":\"version\",\"columnType\":\"STRING\",\"maps\":[]},{\"column\":\"net_op\",\"columnType\":\"STRING\",\"maps\":[]},{\"column\":\"net_type\",\"columnType\":\"STRING\",\"maps\":[]},{\"column\":\"device\",\"columnType\":\"STRING\",\"maps\":[]},{\"column\":\"log_time\",\"columnType\":\"LONG\",\"maps\":[]},{\"column\":\"page_id\",\"columnType\":\"LONG\",\"maps\":[]},{\"column\":\"component_type\",\"columnType\":\"LONG\",\"maps\":[]},{\"column\":\"status_id\",\"columnType\":\"STRING\",\"maps\":[]},{\"column\":\"target_id\",\"columnType\":\"STRING\",\"maps\":[]},{\"column\":\"symbol\",\"columnType\":\"STRING\",\"maps\":[]},{\"column\":\"name\",\"columnType\":\"STRING\",\"maps\":[]},{\"column\":\"duration\",\"columnType\":\"DOUBLE\",\"maps\":[]},{\"column\":\"key_time\",\"columnType\":\"STRING\",\"maps\":[]}],\"timeColumn\":{\"column\":\"key_time\",\"columnType\":\"STRING\",\"maps\":[]},\"timeColumnFormatStr\":\"\",\"maxOutOfOrders\":10000,\"maxErrorRowsLimitPerHour\":100,\"hourlyCounter\":{\"hourlyCount\":0}}],\"sql\":\"\",\"finalDestColumns\":[{\"column\":\"uid\",\"columnType\":\"LONG\",\"maps\":[]},{\"column\":\"plat\",\"columnType\":\"STRING\",\"maps\":[{\"ipad\":\"ios\",\"iphone\":\"ios\"}]},{\"column\":\"version\",\"columnType\":\"STRING\",\"maps\":[]},{\"column\":\"net_op\",\"columnType\":\"STRING\",\"maps\":[]},{\"column\":\"net_type\",\"columnType\":\"STRING\",\"maps\":[]},{\"column\":\"device\",\"columnType\":\"STRING\",\"maps\":[]},{\"column\":\"log_time\",\"columnType\":\"LONG\",\"maps\":[]},{\"column\":\"page_id\",\"columnType\":\"LONG\",\"maps\":[]},{\"column\":\"component_type\",\"columnType\":\"LONG\",\"maps\":[]},{\"column\":\"status_id\",\"columnType\":\"STRING\",\"maps\":[]},{\"column\":\"target_id\",\"columnType\":\"STRING\",\"maps\":[]},{\"column\":\"symbol\",\"columnType\":\"STRING\",\"maps\":[]},{\"column\":\"name\",\"columnType\":\"STRING\",\"maps\":[]},{\"column\":\"duration\",\"columnType\":\"DOUBLE\",\"maps\":[]},{\"column\":\"key_time\",\"columnType\":\"STRING\",\"maps\":[]}],\"finalTimeColumn\":{\"column\":\"key_time\",\"columnType\":\"STRING\",\"maps\":[]},\"finalTimeColumnFormatStr\":\"yyyy-MM-dd HH:mm:ss.S\",\"dest\":{\"bootstrapServers\":\"10.10.53.4:9092,10.10.54.5:9092\",\"topicName\":\"user_behavior_etl2\",\"consumerGroupId\":\"\"},\"enableEventTime\":false}",
      comment: "xxx"
    }

    returnData.params = params;
    this.store.returnKafkaMessage(returnData);
  }


  //dest表单提交
  handleReturnSubmit = (e) => {
    e.preventDefault();
    const { form: { validateFields } } = this.props;
    validateFields(['returnBootstrapServers', 'returnTopicName', 'returnConsumerGroupId', 'returnZookeeperServers', 'enableEventTime', 'finalTimeColumnFormatStr'], (err, values) => {
      if (!err) {
        const dest = {
          bootstrapServers: values.returnBootstrapServers,
          topicName: values.returnTopicName,
          consumerGroupId: values.returnConsumerGroupId,
          zookeeperServers: values.returnZookeeperServers,
        };
        this.store.finalData.dest = dest;
        this.store.finalData.finalTimeColumnFormatStr = values.finalTimeColumnFormatStr
        this.store.finalData.enableEventTime = values.enableEventTime
      }
      message.success('录入成功')
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    
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

      const finalDestColumnsRowSelection = {
        onChange: (finalDestColumnsSelectedRowKeys, finalDestColumnsSelectedRows) => {
          this.setState({
            finalDestColumnsSelectedRows: finalDestColumnsSelectedRows,
            finalDestColumnsSelectedRowKeys: finalDestColumnsSelectedRowKeys,
          })
        },
      };
  
      const finalTimeColumnsRowSelection = {
        type: 'radio',
        onChange: (finalTimeColumnSelectedRowKeys, finalTimeColumnSelectedRows) => {
          this.setState({
            finalTimeColumnSelectedRows: finalTimeColumnSelectedRows,
            finalTimeColumnSelectedRowKeys: finalTimeColumnSelectedRowKeys,
          })
        },
      };

      //dest设置
    const $destData = (
        <div>
          <Form onSubmit={this.handleReturnSubmit}>
            <Form.Item
              {...formItemLayout}
              label="Kafka Server"
            >
              {getFieldDecorator('returnBootstrapServers', {
                initialValue: `${this.store.finalData.transformSpecs[0].source.bootstrapServers}`,
                rules: [{
                  required: true, message: '请输入 Kafka Server!',
                }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Kafka Topic"
            >
              {getFieldDecorator('returnTopicName', {
                initialValue: `etl_${this.store.finalData.transformSpecs[0].source.topicName}`,
                rules: [{
                  required: true, message: '请输入 Kafka Topic!',
                }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="消费组信息"
            >
              {getFieldDecorator('returnConsumerGroupId', {
                initialValue: 'etl',
                rules: [{
                  required: true, message: '请输入 消费组信息!',
                }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="zk Server信息"
            >
              {getFieldDecorator('returnZookeeperServers', {
  
              })(
                <Input placeholder="可选填" autoComplete="off" />
              )}
            </Form.Item>
            <Divider>另外数据录入</Divider>
            <Form.Item
              {...formItemLayout}
              label="finalTimeColumnFormatStr"
            >
              {getFieldDecorator('finalTimeColumnFormatStr', {
              })(
                <Input autoComplete="off" />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="enableEventTime"
            >
              {getFieldDecorator('enableEventTime', {
                rules: [{
                  required: true, message: '请选择 enableEventTime!',
                }],
              })(
                <Select style={{ width: 70 }}>
                  <Option value="true">true</Option>
                  <Option value="false">false</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout}>
              <Row type="flex" justify="center">
                <Col span={15} />
                <Col span={4}>
                  <Button type="primary" htmlType="submit">提交</Button>
                </Col>
                <Col span={5} />
              </Row>
            </Form.Item>
          </Form>
        </div>
      )
  
      const $finalStepPage = (
        <div>
          <Table
            rowSelection={finalDestColumnsRowSelection}
            columns={finalColumns}
            dataSource={this.store.finalDestColumnsData}
            bordered
            pagination={false}
            title={() => 'finalDestColumns结果页展示'}
          />
          <Divider>sql</Divider>
          <Row>
            <Col span={8} />
            <Col span={8}>
              <Input addonBefore="sql" style={{ width: 300 }} onChange={e => { this.saveSql(e) }} />
            </Col>
            <Col span={8} />
          </Row>
          <Divider />
          <Table
            rowSelection={finalTimeColumnsRowSelection}
            columns={finalColumns}
            dataSource={this.store.finalTimeColumnData}
            bordered
            pagination={false}
            title={() => 'finalTimeColumns'}
          />
          <Divider>dest录入</Divider>
          {$destData}
          <Divider />
          <Row gutter={16}>
            <Col span={6} />
            <Col span={6}>
              <Button onClick={this.rechangeTimeColumnData}>
              <Link to='/dataDock/step1/timeColumn'>上一页</Link>
              </Button>
            </Col>
            <Col span={6}>
              <Button
                onClick={this.submitAllData}
                type="primary"
              >
              
                <Link to='/dataDock/step1/summary'>确认</Link>
            </Button>
            <Button onClick={this.test}>test</Button>
            </Col>
            <Col span={6} />
          </Row>
        </div>
      )
  
  
    return(
      <Card>
        {$finalStepPage}  
      </Card>
    )
  }
}

export default MoreInfo ;