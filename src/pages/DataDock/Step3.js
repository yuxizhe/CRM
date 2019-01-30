import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import {
    Button, Row, Col, Card, Table, Divider,
} from 'antd';
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
        dataIndex: 'jobName',
        width: 100,
    }, {
        title: 'job详情',
        dataIndex: 'value',
        width: 250,
    }, {
        title: '操作',
        dataIndex: 'action',
        width: 200,
        render: (text, record) => (
            <span>
                <Button>启动</Button>
                <Divider type="vertical" />
                <Button >停止</Button>
                <Divider type="vertical" />
                <Button >重启</Button>
                <Divider type="vertical" />
                <Button onClick={()=>this.deleteJob(record.jobName)}>删除</Button>
            </span>

        ),
    }]

    getJobList = () =>{
        this.store.getJobList().then(res=>{
            this.props.history.push('/dataDock/step3');
            }
        )
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