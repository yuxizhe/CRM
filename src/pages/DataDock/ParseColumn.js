import React, { Component } from 'react';
import {
  Input,
  Button,
  Row,
  Col,
  Card,
  Select,
  Divider,
  message
} from 'antd';
import { inject, observer } from 'mobx-react';
import './style.scss';

const ParseType = {
  SplitParser: 'splitParser',
  RegexParser: 'regexParser',
  JsonParser: 'jsonParser',
  UrlParser: 'urlParser'
};

const Option = Select.Option;

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

  selectionSubmit = (parentSteps) => {
    // const currentSubStep = this.state.kafkaValueParseStep;
    // parentSteps.forEach((step,index)=> {
    //     currentSubStep = currentSubStep.parsedColumns[step].subParseSteps;

    // })

  };

  handleParseData = (kafkaRawData, currentKafkaValueParseStep, parentSteps) => {
    let parseType;
    let kafkaValueParseStep = this.props.kafkaValueParseStep;
    if (parentSteps.length) {
      let steps = kafkaValueParseStep;
      parentSteps.forEach(step => {
        steps = steps.subParseSteps[step];
      });
      parseType = steps.parseType;
      steps.parsedColumns = this[parseType](kafkaRawData, steps.stepParameter);
    } else {
      parseType = currentKafkaValueParseStep.parseType;
      kafkaValueParseStep.parsedColumns = this[parseType](kafkaRawData);
    }
    this.store.changeKafkaValueParseStep(kafkaValueParseStep);
  };

  splitParser (data, stepParameter) {
    const testedData = data.toString().split(stepParameter);
    return testedData.map((item, index) => {
      return {
        extractParam: '',
        value: item,
        column: '',
        defaultValue: '',
        faultBehavior: undefined
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

    // urlParams.length = 0;
    return urlPartValue.map((item, index) => {
      return {
        extractParam: urlPartName[index],
        value: urlPartValue[index],
        column: '',
        faultBehavior: undefined,
        defaultValue: ''
      };
    });
  }

  jsonParser (data) {
    const result = JSON.parse(data);
    return Object.entries(result).map(([key, value]) => {
      return {
        extractParam: key,
        value: value,
        column: key,
        faultBehavior: undefined,
        defaultValue: ''
      };
    });
  }

  regexParser (data, stepParameter) {
    const regexParams = data.match(stepParameter);
    this.kafkaValueParseStep.parsedColumns = regexParams.map((item, index) => {
      return {
        extractParam: index,
        value: item,
        column: '',
        faultBehavior: undefined,
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
        parseType: '',
        stepParameter: '',
        stepName: '',
        parsedColumns: [],
        subParseSteps: {}
      };
    } else {
      kafkaValueParseStep.subParseSteps[key] = {
        parseType: '',
        stepParameter: '',
        stepName: '',
        parsedColumns: [],
        subParseSteps: {}
      };
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

  generateKafkaStep (kafkaRawData, kafkaValueParseStep, parentSteps = []) {
    const $parserOptions = Object.entries(ParseType).map(([key, value]) => (
      <Option key={key} value={value}>{key}</Option>
    ));

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
             名称: {data.extractParam}
            </span>
            <span>
               解析值：{data.value}
           </span>
            <span>
              <em>最终名称：</em>
              <Input
                style={{ width: 100 }}
                value={data.column}
                onChange={(e) => this.handleParseColumnsNameChange(e.target.value, parentSteps, index)} />
            </span>
            <span>
            <em>默认值：</em>
              <Input
                style={{ width: 100 }}
                value={data.defaultValue}
                onChange={(e) => this.handleParseColumnsDefaultValueChange(e.target.value, parentSteps, index)} />
            </span>
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
        <Row>
          <Col>
            数据源单条记录示例：<p style={{ wordBreak: 'break-all' }}>{kafkaRawData}</p>
          </Col>
        </Row>
        <Divider>解析方式配置</Divider>
        <Row type="flex" align="space-between">
          <Col span={6}>
            <Select
              name="parseType"
              initialValue="JsonParser"
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
          </ul>
        </Row>
      </div>
    );
  }

  render () {
    return this.props.kafkaRawData ? (
      <Card
        title="解析方式"
      >
        <div className="parse-column">
          {this.generateKafkaStep(this.props.kafkaRawData, this.props.kafkaValueParseStep)}
        </div>
        <Button hidden={!this.props.kafkaValueParseStep.parsedColumns.length}>
          完成全部解析
        </Button>
      </Card>

    ) : null;
  }
}

export default ParseColumn;
