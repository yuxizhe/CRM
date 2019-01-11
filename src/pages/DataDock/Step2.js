import React, { Component } from 'react';
import { observer } from "mobx-react";
import { Form, Button, Row, Col, Select, Table, Modal, Drawer } from 'antd';
import DataDockStepWrapper from './DataDockStepWrapper';
import './style.scss';
import store from '../../stores/dataDockStore';





const tableData = [{
  key: '1',
  selectedPart: '0',
  value: 32,

}, {
  key: '2',
  selectedPart: '1',
  value: 42,

}, {
  key: '3',
  selectedPart: '2',
  value: 32,

}, {
  key: '4',
  selectedPart: '3',
  value: 99,
}];

const currentParsedDataColumns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  width: 300,
}, {
  title: 'Value',
  dataIndex: 'value',
  key: 'value',
  width: 300,
}, {
  title: 'Default',
  dataIndex: 'default',
  key: 'default',
  width: 300,
}
]




const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};


@Form.create()
@observer
class Step2 extends Component {
  store = store;
  constructor(props) {
    super(props);
    const { form } = this.props;
    this.columns = [{
      title: 'SelectedPart',
      dataIndex: 'selectedPart',
      key: 'selectedPart',
      width: 100,
    }, {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      width: 100,
    }, {
      title: 'ParseRules',
      dataIndex: 'parserules',
      key: 'parserules',
      width: 100,
      render: (text, record) => (
        <Form>
          <Form.Item style={{ mergin: 0 }}>
            {form.getFieldDecorator(`parseRules${record.key}`, {
              rules: [{
                message: '请选择解析规则'
              }],
            })(
              <Select
                onchange={this.selectChange}>
                <Select.Option key={1} value="SplitParser">SplitParser</Select.Option>
                <Select.Option key={2} value="RegerParser">RegerParser</Select.Option>
                <Select.Option key={3} value="JsonParser">JsonParser</Select.Option>
                <Select.Option key={4} value="UrlParser">UrlParser</Select.Option>
              </Select>
            )}
          </Form.Item>
        </Form>
      )
    }, {
      title: "操作",
      key: "operation",
      width: 100,
      render: (text, record) => (
        <div>
          <span>
            <a onClick={() => this.showModal(record)}>确定解析</a>
          </span>
          <Modal
            title="Basic Modal"
            visible={this.state.modalVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            mask={false}
          
          >
            <Table rowSelection={rowSelection} columns={this.subColumns} dataSource={this.store.subTableData} />
          </Modal>
        </div>
      )
    }
    ];
  }

  selectChange = value => {
    this.store.getList(value);
  };

  subColumns = [{
    title: 'partName',
    dataIndex: 'partName',
  }, {
    title: 'Value',
    dataIndex: 'value',
  }]

  state = {
    modalVisible: false,
    drawerVisible: false,
    confirmLoading: false,
    key: 1,
  }
  // componentDidMount () {
  //   this.store.getList();

  // }
  showModal = record => {
    this.setState({
      modalVisible: true,
      key: record.key,
    });
    console.log(this.state.key);
  }

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });

    setTimeout(() => {
      this.setState({
        modalVisible: false,
        confirmLoading: false,
      });
    }, 2000);
  }

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  }



  showDrawer = () => {
    this.setState({
      drawerVisible: true,
    });
  };

  onClose = () => {
    this.setState({
      drawerVisible: false,
    });
  };

  render() {
    const { form, history } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      history.push('/datadock/step1');
    };
    const onNext = () => {
      history.push('/datadock/step2');
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        console.log('values', values)
        if (!err) {
          // TODO send data
          console.log(values);
          history.push('/datadock/step3');
        }
      });
    };

    return (
      <DataDockStepWrapper step={1}>
        <Row type="flex" justify="center">
          <Col span={18}>
            <Table columns={this.columns} dataSource={tableData} />
          </Col>
        </Row>

        <Row >
          <Col span={4} />
          <Col span={4}>
            <Button onClick={onPrev} style={{ marginLeft: 8 }}>
              上一步
              </Button>
          </Col>
          <Col span={4}>
            <Button onClick={this.showDrawer} style={{ marginLeft: 8 }}>
              查看
              </Button>
            <Drawer
              title="已选配置"
              placement="right"
              closable={false}
              onClose={this.onClose}
              visible={this.state.drawerVisible}
              key={this.state.key}
            >
              <Table columns={currentParsedDataColumns} dataSource={this.store.currentParsedData} bordered />
            </Drawer>
          </Col>
          <Col span={4}>
            <Button onClick={onNext} style={{ marginLeft: 8 }}>
              继续下一轮
              </Button>
          </Col>
          <Col span={4}>
            <Button type="primary" onClick={onValidateForm}>
              提交
              </Button>
          </Col>
          <Col span={4} />
        </Row>
      </DataDockStepWrapper>
    );
  }
}

export default Step2;