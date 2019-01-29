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
import { inject, observer } from 'mobx-react';
import './style.scss';

const ParseType = {
  SplitParser: 'splitParser',
  RegexParser: 'regexParser',
  JsonParser: 'jsonParser',
  UrlParser: 'urlParser',
};

const FaultBehavior = {
    FILTER_ROW: 'FILTER_ROW',
    FILL_WITH_DEFAULT_VALUE: 'FILL_WITH_DEFAULT_VALUE',
    ERROR: 'ERROR',
  };

const Option = Select.Option;

const { TextArea } = Input

@inject('dataDockStore')
@observer
class ParseColumn extends Component {
  store = this.props.dataDockStore;

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
      if(parseType === 'splitParser'||parseType === 'regexParser'){
        steps.parsedColumns = this[parseType](kafkaRawData, steps.stepParameter);
      }else{
          steps.parsedColumns = this[parseType](kafkaRawData);
      }
    } else {
      parseType = currentKafkaValueParseStep.parseType;
      stepParameter = currentKafkaValueParseStep.stepParameter;
      stepName = currentKafkaValueParseStep.stepName;
      if(stepName ===''){
        message.error('未填写步骤名称');
        return;
      }
      if(parseType === 'splitParser'||parseType === 'regexParser'){
        kafkaValueParseStep.parsedColumns = this[parseType](kafkaRawData, stepParameter);
      }else{
      kafkaValueParseStep.parsedColumns = this[parseType](kafkaRawData);
      }
    }
    this.store.changeKafkaValueParseStep(kafkaValueParseStep);
  };

  splitParser (data, stepParameter) {
    
    const testedData = data.toString().split(stepParameter);
    return testedData.map((item,index) => {
      return {
        extractParam: index,
        value: item,
        column: '',
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
        extractParam: urlPartName[index],
        value: urlPartValue[index],
        column: '',
        faultBehavior: 'FILTER_ROW',
        defaultValue: ''
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
        extractParam: key,
        value: value,
        column: key,
        faultBehavior: 'FILTER_ROW',
        defaultValue: ''
      };
    });
  }

  regexParser (data, stepParameter) {
    const regexParams = data.toString().match(stepParameter);
    return regexParams.map((item, index) => {
      return {
        extractParam: index,
        value: item,
        column: '',
        faultBehavior: 'FILTER_ROW',
        defaultValue: ''
      };
    });
  }

  handleAddMoreParse = (key, parentSteps) => {
    if (!key) {
      message.error('请输入改字段最终名称');
      return;
    }
    let kafkaValueParseStep = this.props.kafkaValueParseStep;
    if (parentSteps.length) {
      let steps = kafkaValueParseStep;
      parentSteps.forEach(step => {
        steps = steps.subParseSteps[step];
      });
      steps.subParseSteps[key] = {
        stepName: '',
        parseType: '',
        stepParameter: '',        
        parsedColumns: [],
        subParseSteps: {}
      };
    } else {
      kafkaValueParseStep.subParseSteps[key] = {
        stepName: '',
        parseType: '',
        stepParameter: '',       
        parsedColumns: [],
        subParseSteps: {}
      };
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

  handleParseColumnsValueChange = (value, parentSteps, index) => {
    let kafkaValueParseStep = this.props.kafkaValueParseStep;
    if (parentSteps.length) {
      let steps = kafkaValueParseStep;
      parentSteps.forEach(step => {
        steps = steps.subParseSteps[step];
      });
      steps.parsedColumns[index].value = value;
    } else {
      kafkaValueParseStep.parsedColumns[index].value = value;
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

  delectBlankData = (e) =>{
    e.pop()
  }

  generateKafkaStep (kafkaRawData, kafkaValueParseStep, parentSteps = []) {
    const $parserOptions = Object.entries(ParseType).map(([key, value]) => (
      <Option key={key} value={value}>{key}</Option>
    ));

    const $faultBehaviorOptions = Object.entries(FaultBehavior).map(([key, value]) => (
      <Option key={key} value={value}>{value}</Option>
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
               解析值：
               <TextArea
                style={{ width: 200 }}
                value={data.value}
                onChange={(e) => this.handleParseColumnsValueChange(e.target.value, parentSteps, index)} />
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
            {(kafkaValueParseStep.parsedColumns[index].faultBehavior === '填充默认值' ) ?
            <span>
            <em>默认值：</em>
              <Input
                style={{ width: 130 }}
                value={data.defaultValue}
                onChange={(e) => this.handleParseColumnsDefaultValueChange(e.target.value, parentSteps, index)} />
            </span> : null}           
            <span>
              <Button
                onClick={() => this.handleAddMoreParse(data.column, parentSteps, index)}>
                继续解析
              </Button>
            </span>
          </div>
          {$subParse}
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
          {(kafkaValueParseStep.parseType === 'splitParser' || kafkaValueParseStep.parseType === 'regexParser') ?
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
            {/* {$blankData} */}
          </ul>
        </Row>
      </div>
    );
  }

  submitData = () =>{
    this.store.finalData.transformSpecs[this.store.kafkaDataNumber].kafkaValueParseStep = this.store.kafkaValueParseStep;
    console.log(this.store.kafkaValueParseStep)
    console.log(this.store.finalData.transformSpecs[this.store.kafkaDataNumber].kafkaValueParseStep )
  }

  render () {
    return this.props.kafkaRawData ? (
      <Card
        title="解析方式"
      >
        <div className="parse-column" 
        
        style={{overflow: 'scroll',height:'100vh'}}
        >
          {this.generateKafkaStep(this.props.kafkaRawData, this.props.kafkaValueParseStep)}
        </div>
        {/* <Button hidden={!this.props.kafkaValueParseStep.parsedColumns.length} onClick = {this.submitData}>
          完成全部解析
        </Button> */}
      </Card>
    ) : null;
  }
}

export default ParseColumn;
