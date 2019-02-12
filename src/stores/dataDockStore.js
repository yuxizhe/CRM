import { observable, action, toJS } from 'mobx';
import { message } from 'antd';
import HttpClient from '../utils/httpclient';
// import { subnetMatch } from "ipaddr.js";

export default class DataDockStore {
  @observable finalData = {
    jobName: '',
    transformSpecs: [{
      source: {},
      kafkaKeyParseStep: {
        stepName: 'keyRootParseStep',
        parseType: 'DONOTHING_PARSER',
        stepParameter: null,
        parsedColumns: [
          {
            column: 'key_time',
            extractParam: '0',
            defaultValue: '',
            faultBehavior: 'ERROR',
          },
        ],
        subParseSteps: {},
      },
      kafkaValueParseStep: {},
      destColumns: [],
      timeColumn: {
        // column: '',
        // columnType: null,
        // maps: {},
      },
      timeColumnFormatStr: '',
      maxOutOfOrders: 10000,
      maxErrorRowsLimitPerHour: 100,
      hourlyCounter: {
        hourlyCount: 0,
      },
    }],
    sql: '',
    finalDestColumns: [],
    finalTimeColumn: {},
    dest: '',
    // enableEventTime: true,
  }

  @observable kafkaValueParseStep = {
    parseType: '',
    stepParameter: '',
    stepName: '',
    parsedColumns: [],
    subParseSteps: {},
  }

  @observable kafkaRawData = ''// kafka单条数据

  @observable kafkaData = []// kafka数据源

  @observable recordData = [];// 记录第二页数据以在历史数据中展示

  @observable parsedColumnsData = [];// destColumns的数据源

  @observable mapsData = [1];

  @observable finalDestColumnsData = [];// 作为finalDestColumns表格的数据源

  @observable finalTimeColumnData = [];// 作为finalTimeColumn表格的数据源

  @observable configListData = [];// 配置列表表格的datasource

  @observable jobButton = [];// 配置列表页的job创建按钮变灰设置

  @observable jobListData = [];// job列表表格的datasource

  // jobListData = [{key:1,druidStatus:'success'},{key:2,druidStatus:'default'}];

  @observable destColumnsSelectedRows = []// destColumns表格的点选

  @observable timeColumnSelectedRows = []// timeColumn表格的点选

  @observable finalDestColumnsSelectedRows = []// finalDestColumns表格的点选

  @observable finalTimeColumnSelectedRows = []// finalTimeColumn表格的点选

  @observable test = 0;

  // 新数据配置页的请求kafka数据接口
  @action
  getKafkaMessage(kafkaModel) {
    HttpClient.get('/kafka/transSpec/source/kafka/message', kafkaModel)
      .then(
        action((res) => {
          this.kafkaRawData = JSON.parse(res.data[0]).value;
        }),
      );
  }

  // 新数据配置页的kafka输出数据接口
  @action
  returnKafkaMessage(returnData) {
    HttpClient.post('/kafka/apollo/create/conf', returnData, {
      headers: {
        'Content-Type': 'text/plain',
      },
    })
      .then(
        action((res) => {
          console.log(res);
        }),
      );
  }

  // 配置列表页的getAllConf接口
  @action
  getAllConf() {
    return HttpClient.get('/kafka/apollo/getAllConf')
      .then(
        action((res) => {
          const data = Object.entries(res.data);
          data.map(([key], index) => {
            if (key === 'TaskManagerUrl') {
              data.splice(index, 1);
            }
          });
          data.map(([key], index) => {
            if (key === 'ManagerTest') {
              data.splice(index, 1);
            }
          });

          data.map(([key, value], index) => {
            this.jobButton.push(false);
            this.configListData.push({
              number: index + 1,
              keyName: key,
              value: JSON.parse(value.replace(/\n/g, '').replace(/\s/g, '')),
            });
          });
        }),
      );
  }

  // 配置列表页的createJob接口
  @action
  createJob(params) {
    return HttpClient.post('/kafka/apollo/create/job', params)
      .then(
        action(() => {
          message.success('本条创建job成功');
        }),
      );
  }

  // job列表页的jobList接口
  @action
  getJobList(num) {
    return HttpClient.get('/kafka/job/list')
      .then(
        action((res) => {         
          res.data.map((item, index) => {
            this.jobListData.push({
              number: index + 1,
              key: item.name,
              value: item,
              druidStatus: item.druidJob.status,
              flinkStatus: item.flinkJob.status,
            });
            if(item.druidJob.status === 'RUNNING') {
              this.jobListData[index].druidBadge = 'success';
            } else if(item.druidJob.status === 'STOPPED') {
              this.jobListData[index].druidBadge = 'default';
            } else if(item.druidJob.status === 'FAILED') {
              this.jobListData[index].druidBadge = 'error';
            } else {
              this.jobListData[index].druidBadge = 'processing';
            }

            if(item.flinkJob.status === 'RUNNING') {
              this.jobListData[index].flinkBadge = 'success';
            } else if(item.flinkJob.status === 'STOPPED') {
              this.jobListData[index].flinkBadge = 'default';
            } else if(item.flinkJob.status === 'FAILED') {
              this.jobListData[index].flinkBadge = 'error';
            } else {
              this.jobListData[index].flinkBadge = 'processing';
            }
          });
        }),
      );
  }

  // job列表页的jobFlink启动接口
  @action
  jobStartFlink(params) {
    return HttpClient.post('/kafka/job/start/flink', params)
      .then(
        action((res) => {
          if(res.error_code === 100000) {
            message.success('本条配置的jobFlink启动成功');
          } else {
            message.error('本条配置的jobFlink启动失败');
          }        
        }),
      );
  }

  // job列表页的jobFlink停止接口
  @action
  jobStopFlink(params) {
    return HttpClient.post('/kafka/job/stop/flink', params)
      .then(
        action((res) => {
          if(res.error_code === 100000) {
            message.success('本条配置的jobFlink暂停成功');
          } else {
            message.error('本条配置的jobFlink暂停失败');
          }
        }),
      );
  }

  // job列表页的jobFlink重启接口
  @action
  jobRestartFlink(params) {
    return HttpClient.post('/kafka/job/restart/flink', params)
      .then(
        action((res) => {
          if(res.error_code === 100000) {
            message.success('本条配置的jobFlink重启成功');
          } else {
            message.error('本条配置的jobFlink重启失败');
          } 
        }),
      );
  }

  // job列表页的jobDruid启动接口
  @action
  jobStartDruid(params) {
    return HttpClient.post('/kafka/job/start/druid', params)
      .then(
        action((res) => {
          if(res.error_code === 100000) {
            message.success('本条配置的jobDruid启动成功');
          } else {
            message.error('本条配置的jobDruid启动失败');
          } 
        }),
      );
  }

  // job列表页的jobDruid停止接口
  @action
  jobStopDruid(params) {
    return HttpClient.post('/kafka/job/stop/druid', params)
      .then(
        action((res) => {
          if(res.error_code === 100000) {
            message.success('本条配置的jobDruid暂停成功');
          } else {
            message.error('本条配置的jobDruid暂停失败');
          }          
        }),
      );
  }

  // job列表页的jobDruid重启接口
  @action
  jobRestartDruid(params) {
    return HttpClient.post('/kafka/job/restart/druid', params)
      .then(
        action((res) => {
          if(res.error_code === 100000) {
            message.success('本条配置的jobDruid重启成功');
          } else {
            message.error('本条配置的jobDruid重启失败');
          }  
        }),
      );
  }

  // job列表页的jobAll启动接口
  @action
  jobStartAll(params) {
    return HttpClient.post('/kafka/job/start/all', params)
      .then(
        action((res) => {
          if(res.error_code === 100000) {
            message.success('本条配置的jobAll启动成功');
          } else {
            message.success('本条配置的jobAll启动失败');
          }         
        }),
      );
  }

  // job列表页的jobAll停止接口
  @action
  jobStopAll(params) {
    return HttpClient.post('/kafka/job/stop/all', params)
      .then(
        action((res) => {
          if(res.error_code === 100000) {
            message.success('本条配置的jobAll暂停成功');
          } else {
            message.success('本条配置的jobAll暂停失败');
          } 
        }),
      );
  }

  // job列表页的jobAll重启接口
  @action
  jobRestartAll(params) {
    return HttpClient.post('/kafka/job/restart/all', params)
      .then(
        action((res) => {
          if(res.error_code === 100000) {
            message.success('本条配置的jobAll重启成功');
          } else {
            message.success('本条配置的jobAll重启失败');
          } 
        }),
      );
  }

  // job列表页的job删除接口
  @action
  jobDelete(params) {
    return HttpClient.post('/kafka/job/delete', params)
      .then(
        action(() => {
          message.success('本条配置的job删除成功');
        }),
      );
  }

  @action
  changeKafkaValueParseStep(stepData) {
    this.kafkaValueParseStep = stepData;
    console.log(toJS(this.kafkaValueParseStep));
  }
}
