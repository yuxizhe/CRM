import React from 'react';
import {
  Row, Button, Input, Col, Card, Divider, Modal, Form,
} from 'antd';
import { observer } from 'mobx-react';
import store from './store';

const FormItem = Form.Item;

@observer
class Info extends React.Component {
  store = store;

  handleOk = () => {
    this.toggleVisible();
  }

  toggleVisible = () => {
    this.store.toggleVisible();
  }

  changeAge = (e) => {
    this.store.userInfo.age = e.target.value;
  }

  changeName = (e) => {
    this.store.userInfo.name = e.target.value;
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <div>
        <Card
          title="详情页示例"
          extra={(
            <Button type="primary" onClick={this.toggleVisible}>
              修改弹窗
            </Button>
)}
        >
          <div>
            <Row gutter={24}>
              <Col span={8}>
                姓名：
                {this.store.userInfo.name}
              </Col>
              <Col span={8}>
                年龄：
                {this.store.userInfo.age}
              </Col>
              <Col span={8}>
                电话：
                {this.store.userInfo.phone}
              </Col>
            </Row>
            {/* <Divider /> */}
            <Row gutter={24}>
              <Col span={8}>
                住址：
                {this.store.userInfo.address}
              </Col>
              <Col span={8}>
                描述：
                {this.store.userInfo.description}
              </Col>
            </Row>
            <Divider />
          </div>
        </Card>
        <Modal
          title="修改用户信息"
          visible={this.store.modalVisible}
          onOk={this.handleOk}
          onCancel={this.toggleVisible}
        >
          <Form>
            <FormItem {...formItemLayout} label="姓名">
              <Input value={this.store.userInfo.name} onChange={this.changeName} />
            </FormItem>
            <FormItem {...formItemLayout} label="年龄">
              <Input type="number" value={this.store.userInfo.age} onChange={this.changeAge} />
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Info;
