import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import {
    Button, Row, Col, Card, Table, Divider, message
} from 'antd';
import ReactJson from 'react-json-view';
import './style.scss'


@inject('dataDockStore')
@observer
class Step3 extends Component {
    store = this.props.dataDockStore;

    columns = () => [{
        title: '序号',
        dataIndex: 'number',
        width: 50,
    }, {
        title: 'job名称',
        dataIndex: 'jobKey',
        width: 100,
    }, {
        title: 'job详情',
        dataIndex: 'value',
        width: 250,
        render: (text, record) => (
            <span>
                <ReactJson src={text} collapsed />
            </span>
        ),
    }, {
        title: '操作',
        dataIndex: 'action',
        width: 200,
        render: (text, record) => (
            <span>
                <Button onClick={() => this.jobStart(record.jobKey)}>启动</Button>
                <Divider type="vertical" />
                <Button onClick={() => this.jobCancel(record.jobKey)}>停止</Button>
                <Divider type="vertical" />
                <Button onClick={() => this.jobRestart(record.jobKey)}>重启</Button>
                <Divider type="vertical" />
                <Button onClick={() => this.deleteJob(record.jobKey)}>删除</Button>
            </span>

        ),
    }]

    getJobList = () => {
        const num = { num: 50 };
        this.store.getJobList(num).then(res => {
            this.props.history.push('/realtime/platform/step3');
        }
        )
    }

    jobStart = (jobKey) => {
        const params = {};
        params.jobKey = jobKey;
        params.user = 'luqi';
        this.store.jobStart(params);
    }

    jobCancel = (jobKey) => {
        const params = {};
        params.jobKey = jobKey;
        params.method='cancel';
        params.user = 'luqi';
        this.store.jobCancel(params);
    }

    jobRestart = (jobKey) => {
        const params = {};
        params.key = jobKey;
        params.user = 'luqi';
        this.store.jobRestart(params);
    }

    render() {
        return (
            <div>
                <Card>
                    <Button onClick={this.getJobList}>获取job信息</Button>
                    <Table
                        columns={this.columns()}
                        dataSource={this.store.step3Data}
                        bordered
                        pagination={false}
                        title={() => '任务列表'}
                    />
                </Card>
            </div>
        )
    }
}

export default Step3;