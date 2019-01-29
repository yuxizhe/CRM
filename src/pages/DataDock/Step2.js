import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Form, Input, Button, Row, Col, Card, Table, Icon, Divider, } from 'antd';
import ReactJson from 'react-json-view';
import './style.scss'


@inject('dataDockStore')
@observer
class Step2 extends Component {

    store = this.props.dataDockStore;

   

    changeConfig = () =>{
        const testData ={
            "jobName": "use_behavior",
            "transformSpecs": [
                {
                    "source": {
                        "bootstrapServers": "10.10.22.7:9092",
                        "topic": "user_behavior",
                        "consumerGroupId": "flink_user_behavior"
                    },
                    "kafkaKeyParseStep": {
                        "stepName": "keyRootParseStep",
                        "parseType": "DONOTHING_PARSER",
                        "stepParameter": null,
                        "parsedColumns": [
                            {
                                "column": "key_time",
                                "extractParam": "0",
                                "defaultValue": "",
                                "faultBehavior": "ERROR"
                            }
                        ],
                        "subParseSteps": {}
                    },
                    "kafkaValueParseStep": {
                        "stepName": "root",
                        "parseType": "SPLIT_PARSER",
                        "stepParameter": "\\|",
                        "parsedColumns": [
                            {
                                "column": "uid",
                                "extractParam": "0",
                                "defaultValue": "",
                                "faultBehavior": "FILTER_ROW"
                            },
                            {
                                "column": "version_raw",
                                "extractParam": "1",
                                "defaultValue": "",
                                "faultBehavior": "FILTER_ROW"
                            },
                            {
                                "column": "log_time",
                                "extractParam": "2",
                                "defaultValue": "",
                                "faultBehavior": "FILTER_ROW"
                            },
                            {
                                "column": "page_id",
                                "extractParam": "3",
                                "defaultValue": "",
                                "faultBehavior": "FILTER_ROW"
                            },
                            {
                                "column": "component_type",
                                "extractParam": "4",
                                "defaultValue": "",
                                "faultBehavior": "FILTER_ROW"
                            },
                            {
                                "column": "extend0",
                                "extractParam": "6",
                                "defaultValue": "",
                                "faultBehavior": "FILTER_ROW"
                            }
                        ],
                        "subParseSteps": {
                            "version_raw": {
                                "stepName": "version_raw",
                                "parseType": "SPLIT_PARSER",
                                "stepParameter": "\\s+",
                                "parsedColumns": [
                                    {
                                        "column": "plat",
                                        "extractParam": "1",
                                        "defaultValue": "-",
                                        "faultBehavior": "FILL_WITH_DEFAULT_VALUE"
                                    },
                                    {
                                        "column": "version",
                                        "extractParam": "2",
                                        "defaultValue": "-",
                                        "faultBehavior": "FILL_WITH_DEFAULT_VALUE"
                                    },
                                    {
                                        "column": "net_op",
                                        "extractParam": "3",
                                        "defaultValue": "-",
                                        "faultBehavior": "FILL_WITH_DEFAULT_VALUE"
                                    },
                                    {
                                        "column": "net_type",
                                        "extractParam": "4",
                                        "defaultValue": "-",
                                        "faultBehavior": "FILL_WITH_DEFAULT_VALUE"
                                    },
                                    {
                                        "column": "device",
                                        "extractParam": "5",
                                        "defaultValue": "-",
                                        "faultBehavior": "FILL_WITH_DEFAULT_VALUE"
                                    }
                                ],
                                "subParseSteps": {}
                            },
                            "extend0": {
                                "stepName": "extend0",
                                "parseType": "JSON_PARSER",
                                "stepParameter": null,
                                "parsedColumns": [
                                    {
                                        "column": "status_id",
                                        "extractParam": "status_id",
                                        "defaultValue": "-",
                                        "faultBehavior": "FILL_WITH_DEFAULT_VALUE"
                                    },
                                    {
                                        "column": "target_id",
                                        "extractParam": "user_id",
                                        "defaultValue": "-",
                                        "faultBehavior": "FILL_WITH_DEFAULT_VALUE"
                                    },
                                    {
                                        "column": "symbol",
                                        "extractParam": "symbol",
                                        "defaultValue": "-",
                                        "faultBehavior": "FILL_WITH_DEFAULT_VALUE"
                                    },
                                    {
                                        "column": "name",
                                        "extractParam": "name",
                                        "defaultValue": "-",
                                        "faultBehavior": "FILL_WITH_DEFAULT_VALUE"
                                    },
                                    {
                                        "column": "duration",
                                        "extractParam": "duration",
                                        "defaultValue": "0",
                                        "faultBehavior": "FILL_WITH_DEFAULT_VALUE"
                                    }
                                ],
                                "subParseSteps": {}
                            }
                        }
                    },
                    "destColumns": [
                        {
                            "column": "uid",
                            "columnType": "LONG",
                            "maps": []
                        },
                        {
                            "column": "plat",
                            "columnType": "STRING",
                            "maps": [
                                {
                                    "ipad": "ios",
                                    "iphone": "ios"
                                }
                            ]
                        },
                        {
                            "column": "version",
                            "columnType": "STRING",
                            "maps": []
                        },
                        {
                            "column": "net_op",
                            "columnType": "STRING",
                            "maps": []
                        },
                        {
                            "column": "net_type",
                            "columnType": "STRING",
                            "maps": []
                        },
                        {
                            "column": "device",
                            "columnType": "STRING",
                            "maps": []
                        },
                        {
                            "column": "log_time",
                            "columnType": "LONG",
                            "maps": []
                        },
                        {
                            "column": "page_id",
                            "columnType": "LONG",
                            "maps": []
                        },
                        {
                            "column": "component_type",
                            "columnType": "LONG",
                            "maps": []
                        },
                        {
                            "column": "status_id",
                            "columnType": "STRING",
                            "maps": []
                        },
                        {
                            "column": "target_id",
                            "columnType": "STRING",
                            "maps": []
                        },
                        {
                            "column": "symbol",
                            "columnType": "STRING",
                            "maps": []
                        },
                        {
                            "column": "name",
                            "columnType": "STRING",
                            "maps": []
                        },
                        {
                            "column": "duration",
                            "columnType": "DOUBLE",
                            "maps": []
                        },
                        {
                            "column": "key_time",
                            "columnType": "STRING",
                            "maps": []
                        }
                    ],
                    "timeColumn": {
                        "column": "key_time",
                        "columnType": "STRING",
                        "maps": []
                    },
                    "timeColumnFormatStr": "",
                    "maxOutOfOrders": 10000,
                    "maxErrorRowsLimitPerHour": 100,
                    "hourlyCounter": {
                        "hourlyCount": 0
                    }
                }
            ],
            "sql": "",
            "finalDestColumns": [
                {
                    "column": "uid",
                    "columnType": "LONG",
                    "maps": []
                },
                {
                    "column": "plat",
                    "columnType": "STRING",
                    "maps": [
                        {
                            "ipad": "ios",
                            "iphone": "ios"
                        }
                    ]
                },
                {
                    "column": "version",
                    "columnType": "STRING",
                    "maps": []
                },
                {
                    "column": "net_op",
                    "columnType": "STRING",
                    "maps": []
                },
                {
                    "column": "net_type",
                    "columnType": "STRING",
                    "maps": []
                },
                {
                    "column": "device",
                    "columnType": "STRING",
                    "maps": []
                },
                {
                    "column": "log_time",
                    "columnType": "LONG",
                    "maps": []
                },
                {
                    "column": "page_id",
                    "columnType": "LONG",
                    "maps": []
                },
                {
                    "column": "component_type",
                    "columnType": "LONG",
                    "maps": []
                },
                {
                    "column": "status_id",
                    "columnType": "STRING",
                    "maps": []
                },
                {
                    "column": "target_id",
                    "columnType": "STRING",
                    "maps": []
                },
                {
                    "column": "symbol",
                    "columnType": "STRING",
                    "maps": []
                },
                {
                    "column": "name",
                    "columnType": "STRING",
                    "maps": []
                },
                {
                    "column": "duration",
                    "columnType": "DOUBLE",
                    "maps": []
                },
                {
                    "column": "key_time",
                    "columnType": "STRING",
                    "maps": []
                }
            ],
            "finalTimeColumn": {
                "column": "key_time",
                "columnType": "STRING",
                "maps": []
            },
            "finalTimeColumnFormatStr": "yyyy-MM-dd HH:mm:ss.S",
            "dest": {
                "bootstrapServers": "10.10.53.4:9092,10.10.54.5:9092",
                "topic": "user_behavior_etl2",
                "consumerGroupId": ""
            },
            "enableEventTime": false
        }
        this.store.finalDestColumnsData = testData.transformSpecs[0].destColumns
        this.store.parsedColumnsData = testData.transformSpecs[0].destColumns
    }

    columns = () => {
        return [{
            title: '序号',
            dataIndex: 'number',
            width: 50,
        }, {
            title: '数据名',
            dataIndex: 'jobName',
            width: 100,
        }, {
            title: 'JSON数据',
            dataIndex: 'json',
            className: 'json',
            width: 250,
            render: (text, record) => (
                <span>
                    <ReactJson src={text} collapsed={true}/>
                </span>
            ),
        }, {
            title: '操作',
            dataIndex: 'action',
            width: 200,
            render: (text, record) => (
                <span>
                    <Button >job启动</Button>
                    <Divider type="vertical"/>
                    <Button onClick={this.changeConfig}>更改配置</Button>
                    <Divider type="vertical"/>
                    <Button >重启job</Button>
                </span>
                
            ),
        }]
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <Card>
                            <Table
                                columns={this.columns()}
                                dataSource={this.store.step2Data}
                                bordered
                                pagination={false}
                                title={() => '上一步配置的数据'}
                            />
                        </Card>
                    </Col>
                </Row>
                {/* <Row>
                    <Col span={4} />
                    <Col span={12}>
                        <Button>返回上一页并配置下一条数据</Button>
                    </Col>
                    <Col span={4}>
                        <Button>下一页</Button>
                    </Col>
                    <Col span={4} />
                </Row> */}
            </div>
        )
    }


}

export default Step2;