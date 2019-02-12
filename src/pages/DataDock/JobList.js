import React, {
  Component,
} from 'react';
import {
  inject,
  observer,
} from 'mobx-react';
import {
  Button,
  Card,
  Table,
  Divider,
  Row,
  Col,
  Icon,
  Badge,
} from 'antd';
import ReactJson from 'react-json-view';
// import { Link } from 'react-router-dom';
import './style.scss';


@inject('dataDockStore')
@observer
class JobList extends Component {
  store = this.props.dataDockStore;

  columns = () => [{
    title: 'job名称',
    dataIndex: 'key',
    width: 100,
    fixed:'left',
  }, {
    title: 'job详情',
    dataIndex: 'value',
    width: 300,
    render: (text, record) => (
      <span>
        <ReactJson
          src={text}
          collapsed
          enableClipboard={false}
          displayDataTypes={false}
          displayObjectSize={false}
        />
      </span>
    ),
  }, {
    title: 'job状态',
    children:[{
      title:'flink',
      dataIndex:'flinkStatus',
      width:100,
      render:(text, record) => (
        <Badge status={record.flinkBadge} text={record.flinkStatus} />
      )
    },{
      title:'druid',
      dataIndex:'druidStatus',
      width:100,
      render:(text, record) => (
        <Badge status={record.druidBadge} text={record.druidStatus} size={"big"}/>
      )
    }]
  }, {
    title: '启停操作',
    children:[{
      title:'flink',
      dataIndex:'flink',
      width:200,
      render: (text, record) => (
      <span>
        <Button
          onClick={() => this.jobStartFlink(record.key)}
        >
          启动
        </Button>
        <Divider type="vertical" />
        <Button
          onClick={() => this.jobStopFlink(record.key)}
        >
          停止
        </Button>
        <Divider type="vertical" />
        <Button
          onClick={() => this.jobRestartFlink(record.key)}
        >
          重启
        </Button>
        <Divider type="vertical" />       
      </span>
    ),
    },{
      title:'druid',
      dataIndex:'druid',
      width:200,
      render: (text, record) => (
        <span>
          <Button
            onClick={() => this.jobStartDruid(record.key)}
          >
            启动
          </Button>
          <Divider type="vertical" />
          <Button
            onClick={() => this.jobStopDruid(record.key)}
          >
            停止
          </Button>
          <Divider type="vertical" />
          <Button
            onClick={() => this.jobRestartDruid(record.key)}
          >
            重启
          </Button>
          <Divider type="vertical" />          
        </span> 
      ),
    },{
      title:'all',
      dataIndex:'all',
      width:200,
      render: (text, record) => (
        <span>
          <Button
            onClick={() => this.jobStartAll(record.key)}
          >
            启动
          </Button>
          <Divider type="vertical" />
          <Button
            onClick={() => this.jobStopAll(record.key)}
          >
            停止
          </Button>
          <Divider type="vertical" />
          <Button
            onClick={() => this.jobRestartAll(record.key)}
          >
            重启
          </Button>
          <Divider type="vertical" />          
        </span> 
      ),
    },]    
  },{
    title:'删除',
    dataIndex:'delete',
    width:100,
    fixed: 'right',
    render:(text,record) =>(
      <Button
        onClick={() => this.jobDelete(record.key)}
      >
        删除
      </Button>
    )
  }]

  // jobFlink的启,停,重启
  jobStartFlink = (key) => {
    const params = {};
    params.key = key;
    params.user = 'luqi';
    this.store.jobStartFlink(params).then(res=>{
      this.props.history.push('/realtime/platform/jobList');
    });
    // this.forceUpdate();
  }

  jobStopFlink = (key) => {
    const params = {};
    params.key = key;
    params.user = 'luqi';
    this.store.jobStopFlink(params).then(res=>{
      this.props.history.push('/realtime/platform/jobList');
    });
    this.forceUpdate();
  }

  jobRestartFlink = (key) => {
    const params = {};
    params.key = key;
    params.user = 'luqi';
    this.store.jobRestartFlink(params).then(res=>{
      this.props.history.push('/realtime/platform/jobList');
    });
  }

  // jobDruid的启,停,重启
  jobStartDruid = (key) => {
    let params = {};
    params.key = key;
    params.user = 'luqi';
    this.store.jobStartDruid(params).then(res=>{
      this.props.history.push('/realtime/platform/jobList');
    });
  }

  jobStopDruid = (key) => {
    let params = {};
    params.key = key;
    params.user = 'luqi';
    this.store.jobStopDruid(params).then(res=>{
      this.props.history.push('/realtime/platform/jobList');
    });
  }

  jobRestartDruid = (key) => {
    let params = {};
    params.key = key;
    params.user = 'luqi';
    this.store.jobRestartDruid(params).then(res=>{
      this.props.history.push('/realtime/platform/jobList');
    });
  }

  // jobAll的启,停,重启
  jobStartAll = (key) => {
    const params = {};
    params.key = key;
    params.user = 'luqi';
    this.store.jobStartAll(params).then(res=>{
      this.props.history.push('/realtime/platform/jobList');
    });
  }

  jobStopAll = (key) => {
    const params = {};
    params.key = key;
    params.user = 'luqi';
    this.store.jobStopAll(params).then(res=>{
      this.props.history.push('/realtime/platform/jobList');
    });
  }

  jobRestartAll = (key) => {
    const params = {};
    params.key = key;
    params.user = 'luqi';
    this.store.jobRestartAll(params).then(res=>{
      this.props.history.push('/realtime/platform/jobList');
    });
  }

  // 删除job
  jobDelete = (key) => {
    this.store.jobListData.map((item, index) => {
      if (item.key === key) {
        this.store.jobListData.splice(index, 1);
      }
    });
    const params = {
      key: key,
      user: 'luqi',
    };
    this.store.jobDelete(params).then(res => {
      this.props.history.push('/realtime/platform/jobList');
    });
  }

  gotoNewConfig = () => {
    this.props.history.push('/realtime/platform/newConfig/infoEntry');
  }
  
  title = () => {   
    return (
      <Row>
        <Col span={18}>
          job列表
        </Col>
        <Col span={6}>
          <Button type="primary" onClick={this.gotoNewConfig}>
            <Icon type="plus" />
            配置新数据
          </Button>
        </Col>
      </Row>
    )
  }

  componentDidMount() {
    this.store.jobListData.length = 0;
    const num = { num: 50 };
    this.store.getJobList(num).then(res => {
      this.props.history.push('/realtime/platform/jobList');
    });
    console.log(this.store.jobListData)
  }

  render() {
    
    return (
      <Card className="job-list">
        {/* <Button onClick={this.getJobList}>获取job信息</Button> */ } 
        <Table
          columns={this.columns()}
          dataSource={this.store.jobListData}
          bordered
          pagination={false}
          size="middle"
          scroll={{ x: '143%' }}
          title={() => this.title()}
        />
      </Card>
    );
  }
}

export default JobList;
