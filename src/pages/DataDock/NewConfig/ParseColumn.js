import React, { Component } from 'react';
import {
  Input,
  Button,
  Row,
  Col,
  Card,
  Select,
  Divider,
  message,
} from 'antd';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import './style.scss';

const ParseType = {
  SPLIT_PARSER: 'splitParser',
  REGEX_PARSER: 'regexParser',
  JSON_PARSER: 'jsonParser',
  URL_PARSER: 'urlParser',
};

const FaultBehavior = {
    FILTER_ROW: '丢掉此条记录',
    FILL_WITH_DEFAULT_VALUE: '填写默认值',
    ERROR: '报错',
  };

const Option = Select.Option;

@inject('dataDockStore')
@observer
class ParseColumn extends Component {
  store = this.props.dataDockStore;

  // 保存jobName
  saveJobName = (e) => {
    this.store.finalData.jobName = e.target.value;
  }

  onChangeParserType = (value, parentSteps) => {
    let kafkaValueParseStep = this.props.kafkaValueParseStep;
    if (parentSteps.length) {
      let steps = kafkaValueParseStep;
      parentSteps.forEach(step => {
        steps = steps.subParseSteps[step];
      });
      steps.parseType = value;
    } else {
      kafkaValueParseStep.parseType = value;
    }
    this.store.changeKafkaValueParseStep(kafkaValueParseStep);
  };

  saveStepParameter = (value, parentSteps) => {
    let kafkaValueParseStep = this.props.kafkaValueParseStep;
    if (parentSteps.length) {
      let steps = kafkaValueParseStep;
      parentSteps.forEach(step => {
        steps = steps.subParseSteps[step];
      });
      steps.stepParameter = value;
    } else {
      kafkaValueParseStep.stepParameter = value;
    }
    this.store.changeKafkaValueParseStep(kafkaValueParseStep);
  };

  saveStepName = (value, parentSteps) => {
    let kafkaValueParseStep = this.props.kafkaValueParseStep;
    if (parentSteps.length) {
      let steps = kafkaValueParseStep;
      parentSteps.forEach(step => {
        steps = steps.subParseSteps[step];
      });
      steps.stepName = value;
    } else {
      kafkaValueParseStep.stepName = value;
    }
    this.store.changeKafkaValueParseStep(kafkaValueParseStep);
  };

  handleParseData = (kafkaRawData, currentKafkaValueParseStep, parentSteps) => {
    let parseType;
    let stepParameter;
    let stepName;
    let kafkaValueParseStep = this.props.kafkaValueParseStep;
    if (parentSteps.length) {
      let steps = kafkaValueParseStep;
      parentSteps.forEach(step => {
        steps = steps.subParseSteps[step];
      });
      stepName = steps.stepName;
      if(stepName ===''){
        message.error('未填写步骤名称');
        return;
      }
      parseType = steps.parseType;
      if(parseType === 'SPLIT_PARSER'){
        steps.parsedColumns = this.splitParser(kafkaRawData, steps.stepParameter);
      }else if(parseType === 'REGEX_PARSER'){
        steps.parsedColumns = this.regexParser(kafkaRawData, steps.stepParameter);
      }else if(parseType === 'JSON_PARSER'){
        steps.parsedColumns = this.jsonParser(kafkaRawData);
      }else {
        steps.parsedColumns = this.urlParser(kafkaRawData);
      }
    } else {
      parseType = currentKafkaValueParseStep.parseType;
      stepParameter = currentKafkaValueParseStep.stepParameter;
      stepName = currentKafkaValueParseStep.stepName;
      if(stepName ===''){
        message.error('未填写步骤名称');
        return;
      }
      if(parseType === 'SPLIT_PARSER'){
        kafkaValueParseStep.parsedColumns = this.splitParser(kafkaRawData, stepParameter);
      }else if(parseType === 'REGEX_PARSER'){
        kafkaValueParseStep.parsedColumns = this.regexParser(kafkaRawData, stepParameter);
      }else if(parseType === 'JSON_PARSER'){
        kafkaValueParseStep.parsedColumns = this.jsonParser(kafkaRawData);
      }else {
        kafkaValueParseStep.parsedColumns = this.urlParser(kafkaRawData);
      }
    }
    this.store.changeKafkaValueParseStep(kafkaValueParseStep);
  };

  splitParser (data, stepParameter) {
    
    const testedData = data.toString().split(stepParameter);
    return testedData.map((item,index) => {
      return {
        column: '',
        extractParam: index,
        value: item,        
        defaultValue: '',
        faultBehavior: 'FILTER_ROW'
      };
    });
  }

  urlParser (url) {
    const queryString = url.split('?').splice(1, 1).toString();
    const pair = queryString.toString().split('&');
    const splitedPair = [];
    for (let i = 0; i < pair.length; i++) {
      splitedPair.push(pair[i].split('='));
    }
    const urlPartName = [];
    const urlPartValue = [];
    for (let i = 0; i < splitedPair.length; i++) {
      urlPartName.push(splitedPair[i][0]);
      urlPartValue.push(splitedPair[i][1]);
    }

    return urlPartValue.map((item, index) => {
      return {
        column: '',
        extractParam: urlPartName[index],
        value: urlPartValue[index],       
        faultBehavior: 'FILTER_ROW',
        defaultValue: '',
      };
    });
  }

  jsonParser (data) {
    const result = JSON.parse(data);
    return Object.entries(result).map(([key, value]) => {
        if(typeof(value)===Boolean) {
            value = value.toString()
        }
      return {
        column: key,
        extractParam: key,
        value: value,
        faultBehavior: 'FILTER_ROW',
        defaultValue: '',
      };
    });
  }

  regexParser (data, stepParameter) {
    const regexParams = data.toString().match(stepParameter);
    return regexParams.map((item, index) => {
      return {
        column: '',
        extractParam: index,
        value: item,
        faultBehavior: 'FILTER_ROW',
        defaultValue: '',
      };
    });
  }

  handleAddMoreParse = (key, parentSteps, index) => {
    if (!key) {
      message.error('请输入该字段最终名称');
      return;
    }
    let kafkaValueParseStep = this.props.kafkaValueParseStep;
    
    if (parentSteps.length) {
      let steps = kafkaValueParseStep;
      let name = parentSteps[parentSteps.length-1]
      parentSteps.forEach(step => {
        steps = steps.subParseSteps[step];
      });
      steps.subParseSteps[key] = {
        stepName: '',
        parseType: '',
        stepParameter: '',        
        parsedColumns: [],
        subParseSteps: {},
      };
      kafkaValueParseStep.subParseSteps[name].parsedColumns[index].collapse = true;
    } else {
      kafkaValueParseStep.subParseSteps[key] = {
        stepName: '',
        parseType: '',
        stepParameter: '',       
        parsedColumns: [],
        subParseSteps: {},
      };
      kafkaValueParseStep.parsedColumns[index].collapse = true;
    }
    
    this.store.changeKafkaValueParseStep(kafkaValueParseStep);
  };

  handleParseColumnsExtractParamChange = (value, parentSteps, index) => {
    let kafkaValueParseStep = this.props.kafkaValueParseStep;
    if (parentSteps.length) {
      let steps = kafkaValueParseStep;
      parentSteps.forEach(step => {
        steps = steps.subParseSteps[step];
      });
      steps.parsedColumns[index].extractParam = value;
    } else {
      kafkaValueParseStep.parsedColumns[index].extractParam = value;
    }
    this.store.changeKafkaValueParseStep(kafkaValueParseStep);
  };

  handleParseColumnsNameChange = (value, parentSteps, index) => {
    let kafkaValueParseStep = this.props.kafkaValueParseStep;
    if (parentSteps.length) {
      let steps = kafkaValueParseStep;
      parentSteps.forEach(step => {
        steps = steps.subParseSteps[step];
      });
      steps.parsedColumns[index].column = value;
    } else {
      kafkaValueParseStep.parsedColumns[index].column = value;
    }
    this.store.changeKafkaValueParseStep(kafkaValueParseStep);
  };

  handleParseColumnsDefaultValueChange = (value, parentSteps, index) => {
    let kafkaValueParseStep = this.props.kafkaValueParseStep;
    if (parentSteps.length) {
      let steps = kafkaValueParseStep;
      parentSteps.forEach(step => {
        steps = steps.subParseSteps[step];
      });
      steps.parsedColumns[index].defaultValue = value;
    } else {
      kafkaValueParseStep.parsedColumns[index].defaultValue = value;
    }
    this.store.changeKafkaValueParseStep(kafkaValueParseStep);
  };

  onChangefaultBehavior = (value, parentSteps, index) => {
    let kafkaValueParseStep = this.props.kafkaValueParseStep;
    if (parentSteps.length) {
      let steps = kafkaValueParseStep;
      parentSteps.forEach(step => {
        steps = steps.subParseSteps[step];
      });
      steps.parsedColumns[index].faultBehavior = value;
    } else {
      kafkaValueParseStep.parsedColumns[index].faultBehavior = value;
    }
    console.log(value)
    this.store.changeKafkaValueParseStep(kafkaValueParseStep);
  };

  //添加空白项
  addBlankData = (e) => {
      e.push({
        extractParam: '',
        value: '',
        column: '',
        faultBehavior: 'FILTER_ROW',
        defaultValue: ''
      })
  }

  delectBlankData = (e) => {
    e.pop()
  }

  collapseSubParse = (parentSteps, index) => {
    
    let kafkaValueParseStep = this.props.kafkaValueParseStep;
    let name = parentSteps[parentSteps.length-1]
    if (parentSteps.length) {
      kafkaValueParseStep.subParseSteps[name].parsedColumns[index].collapse = false;
    } else {
      kafkaValueParseStep.parsedColumns[index].collapse = false;
    }
  };

  generateKafkaStep (kafkaRawData, kafkaValueParseStep, parentSteps = []) {
    const $parserOptions = Object.entries(ParseType).map(([key, value]) => (
      <Option key={key} value={key}>{value}</Option>
    ));

    const $faultBehaviorOptions = Object.entries(FaultBehavior).map(([key, value]) => (
      <Option key={key} value={key}>{value}</Option>
    ))

    const $parsedData = kafkaValueParseStep.parsedColumns.map((data, index) => {
      let $subParse = null;
      if (kafkaValueParseStep.subParseSteps[data.column]) {
        const copySteps = JSON.parse(JSON.stringify(parentSteps));
        copySteps.push(data.column);
        $subParse = this.generateKafkaStep(data.value, kafkaValueParseStep.subParseSteps[data.column], copySteps);
      }
      return (
        <li key={index}>
          <div className="parse-group">
            <span>
             名称:  
             <Input
                style={{ width: 100 }}
                value={data.extractParam}
                onChange={(e) => this.handleParseColumnsExtractParamChange(e.target.value, parentSteps, index)} />
            </span>
            <span>
               解析值：{data.value}
           </span>
            <span>
              最终名称：
              <Input
                style={{ width: 100 }}
                value={data.column}
                onChange={(e) => this.handleParseColumnsNameChange(e.target.value, parentSteps, index)} />
            </span>
            <span>
           错误处理：
              <Select
                name="faultBehavior"
                defaultValue="丢掉此条记录"
                placeholder="请选择错误处理方式"
                style={{ width: 130 }}
                onChange={(e) => this.onChangefaultBehavior(e, parentSteps, index)}
              >
                {$faultBehaviorOptions}
            </Select>
            </span>
            {(kafkaValueParseStep.parsedColumns[index].faultBehavior === 'FILL_WITH_DEFAULT_VALUE' ) ?
            <span>
            <em>默认值：</em>
              <Input
                style={{ width: 130 }}
                value={data.defaultValue}
                onChange={(e) => this.handleParseColumnsDefaultValueChange(e.target.value, parentSteps, index)} />
            </span> : null}           
            <span>
              <Button
                onClick={() => this.handleAddMoreParse(data.column, parentSteps, index,)}>
                继续解析
              </Button>
              <Button 
                hidden={!kafkaValueParseStep.subParseSteps[data.column]}
                onClick={() => this.collapseSubParse(parentSteps, index)}
              >收起</Button>
            </span>
          </div>
          {(kafkaValueParseStep.parsedColumns[index].collapse !== false) ? $subParse : null}
        </li>
      );
    });


    return (
      <div className="parse-section">
        <Card  className="parse-data">
            数据源单条记录示例：<p style={{ wordBreak: 'break-all' }}>{kafkaRawData}</p>
        </Card>
        <Divider>解析方式配置</Divider>
        <Row type="flex" align="space-between">
          <Col span={6}>
            <Select
              name="parseType"
              placeholder="请选择解析方式"
              style={{ width: 200 }}
              onChange={(e) => this.onChangeParserType(e, parentSteps)}
            >
              {$parserOptions}
            </Select>
          </Col>
          {(kafkaValueParseStep.parseType === 'SPLIT_PARSER' || kafkaValueParseStep.parseType === 'REGEX_PARSER') ?
            <Col span={6}>
              <div>
                <Input
                  addonBefore="参数输入"
                  style={{ width: 200, marginLeft: 10 }}
                  onChange={(e) => this.saveStepParameter(e.target.value, parentSteps)} />
              </div>
            </Col>
            : null}
          <Col span={8}>
            <Input
              addonBefore="步骤名称"
              // defaultValue={}
              style={{ width: 200, marginLeft: 10 }}
              onChange={(e) => this.saveStepName(e.target.value, parentSteps)} />
          </Col>
          <Col span={4}>
            <Button type="primary"
              onClick={() => this.handleParseData(kafkaRawData, kafkaValueParseStep, parentSteps)}>开始解析</Button>
          </Col>
        </Row>
        <Divider hidden={!kafkaValueParseStep.parsedColumns.length}>解析数据展示</Divider>
        <Row hidden={!kafkaValueParseStep.parsedColumns.length}>
          <ul>
            {$parsedData}
            <Button icon="plus" onClick={() => this.addBlankData(kafkaValueParseStep.parsedColumns)} shape="circle" type='primary' />  
            <Divider type="vertical"/>  
            <Button icon="minus" onClick={() => this.delectBlankData(kafkaValueParseStep.parsedColumns)} shape="circle" />   
          </ul>
        </Row>
      </div>
    );
  }

  // 解析完成后的一些操作，包括清除kafka数据的末尾空白项，创建ParsedColumnsData，创建历史数据的第二页表格，判断ParsedColumnsData的ColumnType
  handleClick = () => {
    const { kafkaValueParseStep, finalData } = this.store;
    if (finalData.jobName === '') {
      message.error('未填写jobName');
      return;
    }
    this.deleteBlankKafkaData(kafkaValueParseStep);
    this.createParsedColumnsData(kafkaValueParseStep);
    this.createRecordData(
      kafkaValueParseStep, kafkaValueParseStep.stepName, kafkaValueParseStep.parseType,
    );
    this.identifyColumnType();
  }

  // 除去每轮末尾空白值
  deleteBlankKafkaData = (source) => {
    if (source.parsedColumns && source.parsedColumns.length) {
      if (source.parsedColumns[source.parsedColumns.length - 1].column === '') {
        source.parsedColumns.pop();
      }

      if ((Object.keys(source.subParseSteps)).length) {
        (Object.entries(source.subParseSteps)).map(([value]) => {
          this.deleteBlankKafkaData(value);
        });
      }
    }
  }

  // 创建parsedColumnsData
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
        });
      });

      if ((Object.keys(source.subParseSteps)).length) {
        (Object.entries(source.subParseSteps)).map(([value]) => {
          this.createParsedColumnsData(value);
        });
      }
    }
  }

  // 创建汇总页的第二页记录
  createRecordData = (source, name, type) => {
    if (source.parsedColumns && source.parsedColumns.length) {
      source.parsedColumns.map((item) => {
        this.store.recordData.push({
          column: item.column,
          value: item.value,
          faultBehavior: item.faultBehavior,
          defaultValue: item.defaultValue,
          parentsName: name,
          parseType: type,
        });
      });

      if ((Object.keys(source.subParseSteps)).length) {
        (Object.entries(source.subParseSteps)).map(([key, value]) => {
          this.createRecordData(value, key, value.parseType);
        });
      }
    }
  }

  // 识别parsedColumnsData里的columnType
  identifyColumnType = () => {
    this.store.parsedColumnsData.map((item) => {
      let num = parseInt(item.value);
      let k = num.toString();
      if ((!isNaN(num)) && (k === item.value)) {
        const m = item.value.toString().split('.');
        if (m.length === 1) {
          if (m > 1000000) {
            item.columnType = 'long';
          } else {
            item.columnType = 'int';
          }
        } else {
          item.columnType = 'double';
        }
      } else {
        item.columnType = 'string';
      }
    });
  }


  render () {
    return this.props.kafkaRawData ? (
      <Card
        title="解析配置"
      >
      <span>
        填写JobName:
        <Input style={{ width: 300 }} onChange={this.saveJobName} />
      </span>   
        <Divider />
        <div className="parse-column"        
        style={{overflow: 'scroll',height:'90vh'}}
        >
          {this.generateKafkaStep(this.props.kafkaRawData, this.props.kafkaValueParseStep)}
        </div>
        
        <Row>
          <Col span={8} />
          <Col span={4}>
            <Button>
              <Link to="/realtime/platform/newConfig/infoEntry">上一页</Link>             
            </Button>
          </Col>
          <Col span={4}>
            <Button type="primary" onClick={this.handleClick}>
              <Link to="/realtime/platform/newConfig/destColumns">解析完成</Link>   
            </Button>
          </Col>
          <Col span={8} />
        </Row>
      </Card>
    ) : null;
  }
}

export default ParseColumn;
