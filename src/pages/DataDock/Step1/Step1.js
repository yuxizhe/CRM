import React, { Component } from 'react';
import { Form, Input, InputNumber, Button, Row, Drawer, Col, Collapse, Card, Select, Table, Icon, Divider, message, Popover } from 'antd';
import { inject, observer } from "mobx-react";
import { Link } from 'react-router-dom';
import './style.scss'









@Form.create()
@inject('dataDockStore')
@observer
class Step1 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      key: "1",//翻页用
      drawerVisible: false,//控制抽屉开合

 
    };
  }
  store = this.props.dataDockStore;

  

  // 控制历史信息抽屉
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

  // // 下一页翻页
  // handlePanelNumber = () => {
  //   const { key } = this.state;
  //   this.setState({
  //     key: `${(key - 0 + 1)}`
  //   });
  //   // document.body.scrollTop = document.documentElement.scrollTop = 0;
  //   // if(document.body.scrollTop){
  //   window.scrollTo(0, 0)
  //   // } 
  // }

  // //上一页
  // previousPage = () => {
  //   const { key } = this.state;
  //   this.setState({
  //     key: `${(key - 1)}`
  //   });
  // }

  

  render() {
    

    //历史信息抽屉
    const $messageEntry = () => (
      <Row type="flex" justify="space-between">
        <Col span={6}>
          信息录入
        </Col>
        <Col span={6}>
          <Button type="primary" onClick={this.showDrawer}>
            历史信息查看
        </Button>
          <Drawer
            title="历史信息"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.drawerVisible}
            width={500}
          >
            {(this.state.key === '2' || this.state.key === '3' || this.state.key === '4' || this.state.key === '5') ?
              $firstPageMessage : null}
            <Divider />
            {(this.state.key === '3' || this.state.key === '4' || this.state.key === '5') ?
              <Table
                columns={recordColumns}
                dataSource={this.store.recordData}
                bordered
                pagination={false}
                title={() => 'kafkaValueParseStep记录'}
              /> : null}
            <Divider />
            {(this.state.key === '4' || this.state.key === '5') ?
              <Table
                columns={finalColumns}
                dataSource={this.state.destColumnsSelectedRows}
                bordered
                pagination={false}
                title={() => 'destColumns选择'}
              /> : null}
            <Divider />
            {this.state.key === '5' ?
              <div>
                <Table
                  columns={finalColumns}
                  dataSource={this.state.timeColumnSelectedRows}
                  bordered
                  pagination={false}
                  title={() => 'destColumns选择'}
                />
                <Card>
                  <ol>
                    第四页信息录入
                <li>
                      saveTimeColumnFormatStr:{this.store.finalData.transformSpecs[this.store.kafkaDataNumber].saveTimeColumnFormatStr}
                    </li>
                    <li>
                      maxOutOfOrders:{this.store.finalData.transformSpecs[this.store.kafkaDataNumber].maxOutOfOrders}
                    </li>
                    <li>
                      maxErrorRowsLimitPerHour:{this.store.finalData.transformSpecs[this.store.kafkaDataNumber].maxErrorRowsLimitPerHour}
                    </li>
                    <li>
                      hourlyCount:{this.store.finalData.transformSpecs[this.store.kafkaDataNumber].hourlyCounter.hourlyCount}
                    </li>
                  </ol>
                </Card>
                <Divider />
                <Table
                  columns={finalColumns}
                  dataSource={this.state.finalDestColumnsSelectedRows}
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
                  dataSource={this.state.finalTimeColumnSelectedRows}
                  bordered
                  pagination={false}
                  title={() => 'finalTimeColumn选择'}
                />
              </div> : null}
          </Drawer>
        </Col>
      </Row>
    )

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
              Kafka Topic:{this.store.finalData.transformSpecs[0].source.topicName}
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

  

    return (
      <div className="App" >
        <Collapse bordered={false} activeKey={[this.state.key]}>
          <Panel header={$messageEntry()} key="1">
            
          </Panel>
          <Panel header="数据配置" key="2">
            
            
            
          </Panel>
          <Panel header="destColumns" key="3">
            
          </Panel>
          <Panel header="timecolumn" key="4">
            
          </Panel>
          <Panel header="finalDestColumns/finalTimecolumn" key="5">
            
          </Panel>
          <Panel header="信息展示页" key="6">
            
          </Panel>
        </Collapse>
      </div>
    );
  }
}



export default Step1;
