import React, { Component } from 'react';
import { Form, Input, InputNumber, Button, Row, Col, Collapse, Cascader, Card, Select, Modal, Table, Tooltip, Icon, Divider } from 'antd';

const ParseType = {
    SplitParser: "splitParser",
    RegerParser: "regerParser",
    JsonParser: "jsonParser",
    UrlParser: "urlParser",
}

const Option = Select.Option;

class ParseColumn extends Component {
    constructor(props){
        super(props);
        this.state = {
            kafkaRawData: props.kafkaRawData,
            kafkaValueParseStep: props.kafkaValueParseStep
        }
    }
    componentDidMount() {

    }

    onChangeMainParser = () => {

    }

    saveStepParameter = () => {

    }
    saveStepName = () => {

    }

    selectionSubmit = (parentSteps) => {
        // const currentSubStep = this.state.kafkaValueParseStep;
        // parentSteps.forEach((step,index)=> {
        //     currentSubStep = currentSubStep.parsedColumns[step].subParseSteps;
            
        // })

    }

    generateKafkaStep(kafkaRawData, kafkaValueParseStep) {

        const $parserOptions = Object.entries(ParseType).map(([key, value]) => (
            <Option key={key} value={value}>{key}</Option>
        ))

        const $parsedData = kafkaValueParseStep.parsedColumns.map((data, index) => {
            let $subParse = null;
            if (kafkaValueParseStep.subParseSteps[data.key]) {
                $subParse = this.generateKafkaStep(data.value, kafkaValueParseStep.subParseSteps[data.key]);
            }
            return (
                <li>
                    名称: {data.extractParam} <Divider type="vertical" />
                    解析值：{data.value} <Divider type="vertical" />
                    最终名称：<Input style={{ width: 100 }} value={data.column} onChange={(e) => this.handleParseColumnsNameChange(index, e.target.value)} /><Divider type="vertical" />
                    默认值：<Input style={{ width: 100 }} value={data.defaultValue} onChange={(e) => this.handleParseColumnsDefaultValueChange(index, e.target.value)} /><Divider type="vertical" />
                    <Button onClick={() => this.handleClick(data.key)}>是否再次解析</Button>
                    <br />
                    {$subParse}
                </li>
            )
        })
        return (
            <div>
                <Row>
                    <Col>
                        数据源单条记录示例：<p>{kafkaRawData}</p>
                    </Col>
                </Row>
                <Divider orientation="left">解析方式</Divider>
                <div>
                    <span>解析方式：</span>
                    <Select
                        name="parseType"
                        initialValue="JsonParser"
                        placeholder="请选择解析方式"
                        style={{ width: 200 }}
                        onChange={this.onChangeMainParser}
                    >
                        {$parserOptions}
                    </Select>
                </div>
                <br />
                <Row type="flex" align="space-between">
                    {(kafkaValueParseStep.parseType === "splitParser" || kafkaValueParseStep.parseType === "regerParser") ?
                        <Col span={6}>
                            <div>
                                <Input
                                    addonBefore="参数输入"
                                    style={{ width: 100, marginLeft: 10 }}
                                    onChange={this.saveStepParameter} />
                            </div>
                        </Col>
                        : null}
                    <Col span={8}>
                        <Input
                            addonBefore="步骤名称"
                            style={{ width: 200, marginLeft: 10 }}
                            onChange={this.saveStepName}
                        />
                    </Col>
                    <Col span={4}>
                        <Button type="primary" onClick={this.selectionSubmit}>提交</Button>
                    </Col>
                </Row>
                <Row>
                    <ul>
                        {$parsedData}
                    </ul>
                    <Button>
                        提交
                        </Button>
                </Row>
            </div>
        )
    }

    render() {
        return this.props.kafkaRawData ? (
            <Card
                title="测试数据"
            >
                {this.generateKafkaStep(this.state.kafkaRawData, this.state.kafkaValueParseStep)}
            </Card>

        ) : null;
    }
}

export default ParseColumn;