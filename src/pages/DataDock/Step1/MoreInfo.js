import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import {
  Form,
  Input,
  InputNumber,
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
    const { finalData, finalTimeColumnSelectedRows } = this.store

    //kafkaKeyParseStep
    this.createTrueKafkaValueParseStep(this.store.kafkaValueParseStep);
    finalData.transformSpecs[0].kafkaValueParseStep = this.store.kafkaValueParseStep;

    //finalDestColumnsData
    this.store.finalDestColumnsSelectedRows.map((item) => {
      finalData.finalDestColumns.push({
        column: item.column,
        columnType: item.columnType,
        maps: item.maps,
      })
    })

    //finalTimeColumnData
    finalData.finalTimeColumn.column = finalTimeColumnSelectedRows.column;
    finalData.columnType = finalTimeColumnSelectedRows.columnType;
    finalData.maps = finalTimeColumnSelectedRows.maps;

    //提交配置
    const params = {
      key: finalData.jobName,
      value: JSON.stringify(finalData),
      comment: 'yangluqi',
    }

    this.store.returnKafkaMessage(params);

    message.success('传送成功')
    console.log(finalData)
  }

  // test =()=>{
  //   const params = {
  //     key: "test",
  //     value: 'ok',
  //     comment: 'yangluqi',
  //   }

  //   this.store.returnKafkaMessage(params);
  // }


  //dest表单提交
  submitDestTable = (e) => {
    e.preventDefault();
    const { form: { validateFields } } = this.props;
    validateFields( (err, values) => {
      // ['returnBootstrapServers', 'returnTopic', 'returnConsumerGroupId', 'returnZookeeperServers', 'enableEventTime', 'finalTimeColumnFormatStr']
      if (!err) {
        const dest = {
          bootstrapServers: values.returnBootstrapServers,
          topic: values.returnTopic,
          consumerGroupId: values.returnConsumerGroupId,
          zookeeperServers: values.returnZookeeperServers,
          partitionNumber: values.partitionNumber,
          replicationNumber: values.replicationNumber,
        };
        this.store.finalData.dest = dest;
        this.store.finalData.finalTimeColumnFormatStr = values.finalTimeColumnFormatStr
        this.store.finalData.enableEventTime = values.enableEventTime
        this.store.finalData.parallelism = values.parallelism;
        this.store.finalData.jarName =values.jarName;

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
        this.store.finalDestColumnsSelectedRows = finalDestColumnsSelectedRows;
      },
    };

    const finalTimeColumnsRowSelection = {
      type: 'radio',
      onChange: (finalTimeColumnSelectedRowKeys, finalTimeColumnSelectedRows) => {
        this.store.finalTimeColumnSelectedRows = finalTimeColumnSelectedRows;
      },
    };

    //dest设置
    const $destData = (
      <div>
        <Form onSubmit={this.submitDestTable}>
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
            {getFieldDecorator('returnTopic', {
              initialValue: `etl_${this.store.finalData.transformSpecs[0].source.topic}`,
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
          <Form.Item
              {...formItemLayout}
              label="partitionNumber"
            >
              {getFieldDecorator('partitionNumber', {
                initialValue: 3,
                rules: [{
                  required: true, message: '请输入 partitionNumber!',
                }],
              })(
                <InputNumber min={1} />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="replicationNumber"
            >
              {getFieldDecorator('replicationNumber', {
                initialValue: 1,
                rules: [{
                  required: true, message: '请输入 replicationNumber!',
                }],
              })(
                <InputNumber min={1} />
              )}
            </Form.Item>  
          <Divider>另外数据录入</Divider>
          <Form.Item
            {...formItemLayout}
            label="finalTimeColumnFormatStr"
            
          >
            {getFieldDecorator('finalTimeColumnFormatStr', {
              initialValue: "yyyy-MM-dd HH:mm:ss.S",
            })(
              <Input autoComplete="off" />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="enableEventTime"
          >
            {getFieldDecorator('enableEventTime', {
              initialValue:"",
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
          <Form.Item
              {...formItemLayout}
              label="parallelism"
            >
              {getFieldDecorator('parallelism', {
                initialValue: 1,
                rules: [{
                  required: true, message: '请输入 parallelism!',
                }],
              })(
                <InputNumber min={1} />
              )}
            </Form.Item>
            <Form.Item
            {...formItemLayout}
            label="jarName"          
          >
            {getFieldDecorator('jarName', {
              initialValue:"flinketl",
              rules: [{
                required: true, message: '请输入 jarName!',
              }],
            })(
              <Input autoComplete="off" />
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

              <Link to='/dataDock/step1/summary'>下一页</Link>
            </Button>
            {/* <Button onClick={this.test}>test</Button> */}
          </Col>
          <Col span={6} />
        </Row>
      </div>
    )


    return (
      <Card>
        {$finalStepPage}
      </Card>
    )
  }
}

export default MoreInfo;