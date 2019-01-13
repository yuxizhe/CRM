import React, { Component, collection, } from 'react';
import { Form, Input, InputNumber, Button, Row, Col, Collapse, Cascader, Card, Select, Modal, Table, Tooltip, Icon, Divider } from 'antd';
import { inject, observer } from "mobx-react";
import './style.scss'
import ParseColumn from './ParseColumn';


const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const ParseType = {
  SplitParser: "splitParser",
  RegerParser: "regerParser",
  JsonParser: "jsonParser",
  UrlParser: "urlParser",
}

const ColumnsType = {
  Byte: "byte",
  Short: "short",
  Int: "int",
  Long: "long",
  Double: "double",
  Boolean: "boolean",
  Float: "float",
  Char: "char",
}

const FaultBehavior = {
  FILTER_ROW: "丢掉词条记录",
  FILL_WITH_DEFAULT_VALUE: "填充默认值",
  ERROR: "报错标记"
}

const Panel = Collapse.Panel;
const Option = Select.Option;

@Form.create()
@inject('dataDockStore')
@observer
class Step1 extends Component {
  store = this.props.dataDockStore;

  /**
   * 第一步表单提交
   */
  handleSubmit = (e) => {
    e.preventDefault();
    // this.handlePanelNumber()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const source = {
          bootstrapServers: values.bootstrapServers,
          topicName: values.topicName,
          consumerGroupId: values.consumerGroupId,
          MsgCount: values.msgCount,
          timeOutSeconds: values.timeOutSeconds,
          zookeeperServers: values.zookeeperServers
        }
        this.store.getKafkaMessage(source);
      }
    });

  }

  //第一轮

  onChangeMainParser = (parserType) => {
    this.store.changeMainParser(parserType);
  }

  saveStepParameter = (stepParameter) => {
    this.store.saveStepParameter(stepParameter);
  }

  saveStepName = (stepName) => {
    this.store.saveStepName(stepName);
  }

  selectionSubmit = () => {
    const { kafkaValueParseStep, destColumnsData } = this.store;
    if (kafkaValueParseStep.parseType === ParseType.SplitParser) {
      this.store.splitParser(this.store.kafkaRawData, kafkaValueParseStep.stepParameter);
    } else if (kafkaValueParseStep.parseType === ParseType.UrlParser) {
      this.store.urlParser(this.store.kafkaRawData, kafkaValueParseStep.parsedColumns);//未改好
    } else if (kafkaValueParseStep.parseType === ParseType.JsonParser) {
      this.store.jsonParser(this.store.kafkaRawData);
    } else if (kafkaValueParseStep.parseType === ParseType.RegexParser) {
      this.store.regexParser(this.store.kafkaRawData);
    }

    kafkaValueParseStep.parsedColumns.map((item) => {
      destColumnsData.push({
        column: item.column,
        value: item.value,
        columnsType: "",

      })
    })
  }




  //第二轮
  //button
  handleClick(index) {
    this.store.kafkaValueParseStep.subParseSteps[index] = {
      parseType: "",
      stepParameter: "",
      stepName: null,
      parsedColumns: [],
    }
    this.store.visible[index] = "ok";

  }
  //第二轮确认解析后
  handleSubParseStepsStepNameChange(index, value) {
    this.store.handleSubParseStepsStepNameChange(index, value)
  }

  handleSubParseStepsParseTypeChange(index, value) {
    this.store.handleSubParseStepsParseTypeChange(index, value)
  }

  handleSubParseStepsStepParameterChange(index, value) {
    this.store.handleSubParseStepsStepParameterChange(index, value)
  }

  //button
  handleSubParseStepsParsedColumns(index) {
    const { kafkaValueParseStep } = this.store;
    if (kafkaValueParseStep.subParseSteps[index].parseType === ParseType.SplitParser) {

      this.store.splitParser(kafkaValueParseStep.parsedColumns[index].value, kafkaValueParseStep.subParseSteps[index].stepParameter);

    } else if (kafkaValueParseStep.subParseSteps[index].parseType === ParseType.UrlParser) {

      this.store.urlParser(kafkaValueParseStep.parsedColumns[index].value, kafkaValueParseStep.subParseSteps[index].parsedColumns);//未改好

    } else if (kafkaValueParseStep.subParseSteps[index].parseType === ParseType.JsonParser) {

      this.store.jsonParser(kafkaValueParseStep.parsedColumns[index].value);

    } else if (kafkaValueParseStep.subParseSteps[index].parseType === ParseType.RegexParser) {

      this.store.regexParser(kafkaValueParseStep.parsedColumns[index].value);

    }
  }


  //destColumns
  saveColumnsType = (value, column) => {
    this.store.destColumnsData.map((item) => {
      if (item.column === column) {
        item.columnsType = value;
      }
      return item;
    })
  }

  handleMaps = (column) => {
    const { destColumnsData, handleMaps } = this.store
    for (let i = 0; i < destColumnsData.length; i++) {
      if (destColumnsData.column === column) {
        handleMaps[i] = "true";
      }
    }
  }



  saveMaps = (e, column) => {
    // this.store.destColumnsData.map((item) => {
    //   if (item.column === column) {
    //     item.maps=[{}];
    //     item.maps = item.value.map((value)=>{
    //       value:e.target.value;
    //     })
    //   }
    //   return item;
    // })
  }

  //timeColumn的提交
  handleTimeColumnSubmit = (e) => {
    const {transformSpecs} = this.store;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

        const timeColumn = {
          column: values.column,
          columnType: values.columnType,
          maps: [],
        }
        // timeColumn.maps
        transformSpecs[0].timeColumnFormatStr=values.timeColumnFormatStr;
        transformSpecs[0].maxOutOfOrders=values.maxOutOfOrders;
        transformSpecs[0].maxErrorRowsLimitPerHour=values.maxErrorRowsLimitPerHour;
        transformSpecs[0].hourlyCounter.hourlyCount=values.hourlyCounter;
      }
    });

  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const $parserOptions = Object.entries(ParseType).map(([key, value]) => (
      <Option key={key} value={value}>{key}</Option>
    ))

    const $columnsTypeOptions = Object.entries(ColumnsType).map(([key, value]) => (
      <Option key={key} value={value}>{key}</Option>
    ))

    const $faultBehaviorOptions = Object.entries(FaultBehavior).map(([key, value]) => (
      <Option key={key} value={value}>{value}</Option>
    ))
    //主table
    const parsedColumns = [{
      title: '解析失败时',
      dataIndex: 'faultBehavior',
      key: 'faultBehavior',
      width: 200,
      render: (text, record) =>
        <Select
          onChange={value => { this.saveTableFaultBehavior(value, record.extractParam) }}
          placeholder="Please select" >
          <Option key={1} value="FILTER_ROW">丢掉词条记录</Option>
          <Option key={2} value="FILL_WITH_DEFAULT_VALUE">填充默认值</Option>
          <Option key={3} value="ERROR">报错标记</Option>
        </Select>
    }
    ];

    //destColumn
    const destColumns = [{
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
      width: 200,
      render: (text, record) =>
        <Select
          name="columnType"
          placeholder="请选择ColumnsType"
          style={{ width: 100 }}
          onChange={(value) => this.saveColumnsType(value, record.column)}
        >
          {$columnsTypeOptions}
        </Select>
    }, {
      title: 'maps',
      dataIndex: 'maps',
      key: 'maps',
      width: 200,
      render: (text, record) =>
        <span>
          <Button onClick={this.handleMaps(record.column)}>
            需要maps
        </Button><Divider type="vertical" />
          {this.store.handleMaps[record] = "true" ? <Input
            value={text}
            style={{ width: 100 }}
            onChange={e => { this.saveMaps(e, record.columnm) }}
          /> : null}
        </span>
    }
    ]

    const rowSelection = {
      // selectedRowKeys,
      // selectedRows,
      onChange: this.onSelectChange,
    };



    const $transformSpecs = (
      <div>
        {/* <Collapse bordered={false} activeKey={[this.state.key]} > */}
        {/* accordion */}
        {/* < Panel header="输入信息" key="1" > */}
        <Form name="form1" id="form1" onSubmit={this.handleSubmit}>
          <Form.Item
            {...formItemLayout}
            label="Kafka Server"
          >
            {getFieldDecorator('bootstrapServers', {
              initialValue: '10.10.22.7:9092',
              rules: [{
                required: true, message: 'Please input your Kafka Server!',
              }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Kafka Topic"
          >
            {getFieldDecorator('topicName', {
              initialValue: 'recommend.events.exposure',
              rules: [{
                required: true, message: 'Please input your Kafka Topic!',
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
              initialValue: 'ctr',
              rules: [{
                required: true, message: 'Please input your 消费组信息!',
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
                required: true, message: 'Please input your 消息数!',
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
                required: true, message: 'Please input your 可超时时间!',
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
              <Col span={4}>
                <Button type="primary" htmlType="submit" >提交</Button>
              </Col>
            </Row>

          </Form.Item>
        </Form>
      </div>
    )

    const $destColumns = () => {

      return (
        <div>
          <Table
            columns={destColumns}
            dataSource={this.store.destColumnsData}
            bordered
            pagination={false}
            title={() => 'destColumns配置页'}
          />
          <Button>
            确定
          </Button>
          {/* {$timeColumn} */}
          <div>
            <Input addonBefore="sql" style={{ width: 300 }} />
            <Button>提交</Button>
          </div>
        </div>
      )
    }

    // const $timeColumn = (
    //   <Card title="timeColumn填写">
    //     <Form onSubmit={this.handleTimeColumnSubmit}>
    //       <Form.Item label="column">
    //         {getFieldDecorator('column', {
    //           rules: [{
    //             required: true, message: '请输入column',
    //           }],
    //         })(
    //           <Input />
    //         )}
    //       </Form.Item>
    //       <Form.Item label="value">
    //         {getFieldDecorator('value', {
    //           rules: [{
    //             required: true, message: '请输入value',
    //           }],
    //         })(
    //           <Input />
    //         )}
    //       </Form.Item>
    //       <Form.Item label="columnType">
    //         {getFieldDecorator('columnType', {
    //           rules: [{
    //             required: true, message: '请选择columnType',
    //           }],
    //         })(
    //           <Select
    //             placeholder="请选择ColumnsType"
    //             style={{ width: 100 }}
    //           >
    //             {$columnsTypeOptions}
    //           </Select>
    //         )}
    //       </Form.Item>
    //       <Form.Item label="maps参数">
    //         {getFieldDecorator('maps', {
    //           rules: [{
    //             required: true, message: '请输入maps参数',
    //           }],
    //         })(
    //           <Input />
    //         )}
    //       </Form.Item>
    //       <Form.Item label="timeColumnFormatStr">
    //         {getFieldDecorator('timeColumnFormatStr', {
    //           rules: [{
    //             required: true, message: '请输入timeColumnFormatStr',
    //           }],
    //         })(
    //           <Input />
    //         )}
    //       </Form.Item>
    //       <Form.Item label="maxOutOfOrders">
    //         {getFieldDecorator('maxOutOfOrders', {
    //           rules: [{
    //             required: true, message: '请输入maxOutOfOrders',
    //           }],
    //         })(
    //           <InputNumber />
    //         )}
    //       </Form.Item>
    //       <Form.Item label="maxErrorRowsLimitPerHour">
    //         {getFieldDecorator('maxErrorRowsLimitPerHour', {
    //           rules: [{
    //             required: true, message: '请输入maxErrorRowsLimitPerHour',
    //           }],
    //         })(
    //           <InputNumber />
    //         )}
    //       </Form.Item>
    //       <Form.Item label="hourlyCounter">
    //         {getFieldDecorator('hourlyCounter', {
    //           rules: [{
    //             required: true, message: '请输入hourlyCounter',
    //           }],
    //         })(
    //           <InputNumber />
    //         )}
    //       </Form.Item>
    //       <Form.Item >
    //         <Button type="primary" htmlType="submit">确定</Button>
    //       </Form.Item>
    //     </Form>
    //   </Card>
    // )

    const $finalDestColumns = () => {

      return (
        <div>
          <Table
            columns={destColumns}
            dataSource={this.store.destColumnsData}
            bordered
            pagination={false}
            title={() => 'finalDestColumns结果页展示'}
          />
          {/* {$finalTimeColumn} */}
          <Button>
            确认
          </Button>
          <p>finalTimeColumnFormatStr</p>
        </div>
      )
    }

    return (
      <div className="App" >
        {$transformSpecs}
        <ParseColumn
          kafkaRawData={this.store.kafkaRawData}
          kafkaValueParseStep={this.store.kafkaValueParseStep}/>
        {$destColumns()}
        {$finalDestColumns()}
      </div>
    );
  }
}






//   handlePanelNumber() {
//     const { key } = this.state;
//     this.setState({
//       key: `${(key - 0 + 1)}`
//     });
//   }



export default Step1;
