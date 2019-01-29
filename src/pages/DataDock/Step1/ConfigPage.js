import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Link } from 'react-router-dom';
import { 
  Input, 
  Divider, 
  message,
  Card,
  Row,
  Col,
  Button,
} from 'antd';
import ParseColumn from './ParseColumn';
import './style.scss';



@inject('dataDockStore')
@observer
class ConfigPage extends Component {

  store = this.props.dataDockStore;

  //保存jobName
  saveJobName = (e) => {
    this.store.finalData.jobName = e.target.value;
  }

  //解析完成后的一些操作，包括清除kafka数据的末尾空白项，创建ParsedColumnsData，创建历史数据的第二页表格，判断ParsedColumnsData的ColumnType
  handleClick = () => {
    const { kafkaValueParseStep, finalData } = this.store
    if (finalData.jobName === '') {
      message.error('未填写jobName');
      return;
    }
    
    this.deleteBlankKafkaData(kafkaValueParseStep)
    this.createParsedColumnsData(kafkaValueParseStep);
    this.createRecordData(kafkaValueParseStep, kafkaValueParseStep.stepName, kafkaValueParseStep.parseType);
    this.identifyColumnType()
  }

  //除去每轮末尾空白值
  deleteBlankKafkaData = (source) => {
    if (source.parsedColumns && source.parsedColumns.length) {
      if (source.parsedColumns[source.parsedColumns.length - 1].column === '') {
        source.parsedColumns.pop();
      }

      if ((Object.keys(source.subParseSteps)).length) {
        (Object.entries(source.subParseSteps)).map(([key, value]) => {
          this.deleteBlankKafkaData(value);
        })
      }
    }
  }

  //创建parsedColumnsData
  createParsedColumnsData = (source) => {
    if (source.parsedColumns && source.parsedColumns.length) {
      source.parsedColumns.map((item) => {
        this.store.parsedColumnsData.push({
          column: item.column,
          columnType: null,
          value: item.value,
          mapsKey: [],
          mapsValue: [],
          mapsMessage: '',
          maps: [],
        })
      })

      if ((Object.keys(source.subParseSteps)).length) {
        (Object.entries(source.subParseSteps)).map(([key, value]) => {
          this.createParsedColumnsData(value);
        })
      }
    }
  }

  //创建汇总页的第二页记录
  createRecordData = (source, parentsName, parseType) => {
    if (source.parsedColumns && source.parsedColumns.length) {
      source.parsedColumns.map((item) => {
        this.store.recordData.push({
          column: item.column,
          value: item.value,
          faultBehavior: item.faultBehavior,
          defaultValue: item.defaultValue,
          parentsName: parentsName,
          parseType: parseType
        })
      })

      if ((Object.keys(source.subParseSteps)).length) {
        (Object.entries(source.subParseSteps)).map(([key, value]) => {
          this.createRecordData(value, key, value.parseType);
        })
      }
    }
  }

  //识别parsedColumnsData里的columnType
  identifyColumnType = () => {
    this.store.parsedColumnsData.map((item) => {
      let num = parseInt(item.value)
      let k = num.toString()
      if ((!isNaN(num)) && (k === item.value)) {
        const m = item.value.toString().split('.');
        if (m.length === 1) {
          if (m > 1000000) {
            item.columnType = 'long'
          } else {
            item.columnType = 'int'
          }
        } else {
          item.columnType = 'double'
        }
      } else {
        item.columnType = 'string'
      }
    })
  }

  render() {
    return(
      <Card title="配置页">
        <Input addonBefore="jobName" style={{ width: 400 }} onChange={this.saveJobName} />
        <Divider/>
        <ParseColumn
          kafkaRawData={this.store.kafkaRawData}
          kafkaValueParseStep={this.store.kafkaValueParseStep} 
        />
        <Row>
          <Col span={8} />
          <Col span={4}>
            <Button >
            <Link to='/dataDock/step1/infoEntry'>上一页</Link>             
            </Button>
          </Col>
          <Col span={4}>
            <Button type={"primary"} onClick={this.handleClick}>
            <Link to='/dataDock/step1/destColumns'>解析完成</Link>   
            </Button>
          </Col>
          <Col span={8} />
        </Row>
      </Card>
    )
  }
}

export default ConfigPage ;