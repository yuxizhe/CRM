import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Link } from 'react-router-dom';
import { 
  Form, 
  Input, 
  InputNumber, 
  Button, 
  Row, 
  Col,
  Card, 
} from 'antd';
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
class InfoEntry extends Component {
    
    store = this.props.dataDockStore;

    //第一步表单提交
  handleSubmit = (e) => {
    e.preventDefault();
    const { form: { validateFields } } = this.props;
    validateFields(['bootstrapServers', 'topic', 'consumerGroupId', 'msgCount', 'timeOutSeconds', 'zookeeperServers'],  (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const source = {
          bootstrapServers: values.bootstrapServers,
          topic: values.topic,
          consumerGroupId: values.consumerGroupId,
          msgCount: values.msgCount,
          timeOutSeconds: values.timeOutSeconds,
          zookeeperServers: values.zookeeperServers,
        };
        
        this.store.getKafkaMessage(source)
        this.props.history.push('/dataDock/step1/configPage');
        const trueSource = {
          bootstrapServers: values.bootstrapServers,
          topic: values.topic,
          consumerGroupId: values.consumerGroupId,
          zookeeperServers: values.zookeeperServers,
        };
        this.store.finalData.transformSpecs[0].source = trueSource;
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const $source = (
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item
              {...formItemLayout}
              label="Kafka Server"
            >
              {getFieldDecorator('bootstrapServers', {
                initialValue: '10.10.22.7:9092',
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
              {getFieldDecorator('topic', {
                initialValue: 'user_behavior',
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
              {getFieldDecorator('consumerGroupId', {
                initialValue: 'flink_user_behavior',
                rules: [{
                  required: true, message: '请输入 消费组信息!',
                }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="要从kafka获得消息数"
            >
              {getFieldDecorator('msgCount', {
                initialValue: 2,
                rules: [{
                  required: true, message: '请输入 消息数!',
                }],
              })(
                <InputNumber min={1} />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="kafka消息可超时时间(s)"
            >
              {getFieldDecorator('timeOutSeconds', {
                initialValue: 1,
                rules: [{
                  required: true, message: '请输入 可超时时间!',
                }],
              })(
                <InputNumber min={1} />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="zk Server信息"
            >
              {getFieldDecorator('zookeeperServers', {
  
              })(
                <Input placeholder="可选填" autoComplete="off" />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout}>
              <Row type="flex" justify="center">
                <Col span={15} />
                <Col span={4}>
                  <Button type="primary" htmlType="submit">
                  提交
                  </Button>
                </Col>
                <Col span={5} />
              </Row>
            </Form.Item>
          </Form>
        </div>
      )
    return (
      <Card
      title="申请kafka数据">
        {$source}       
      </Card>
    )
  }
}

export default InfoEntry;