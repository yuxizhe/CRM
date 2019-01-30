import { observable, action, toJS } from "mobx";
import { message } from "antd";
import HttpClient from '../utils/httpclient';
import Qs from 'qs'
// import { subnetMatch } from "ipaddr.js";

export default class Store {

  @observable finalData = {
    jobName: '',
    transformSpecs: [{
      source: {},
      kafkaKeyParseStep: {
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
      kafkaValueParseStep: {},
      destColumns: [],
      timeColumn: {
        // column: '',
        // columnType: null,
        // maps: {},
      },
      timeColumnFormatStr: "",
      maxOutOfOrders: 10000,
      maxErrorRowsLimitPerHour: 100,
      hourlyCounter: {
        hourlyCount: 0,
      }
    }],
    sql: "",
    finalDestColumns: [],
    finalTimeColumn: {},
    dest: '',
    // enableEventTime: true,
  }

  @observable kafkaValueParseStep = {
    parseType: "",
    stepParameter: "",
    stepName: "",
    parsedColumns: [],
    subParseSteps: {},
  }

  @observable kafkaRawData = ""//kafka单条数据

  @observable kafkaData = []//kafka数据源

  @observable recordData = [];//记录第二页数据以在历史数据中展示

  @observable parsedColumnsData = [];//destColumns的数据源

  @observable mapsData = [1];

  @observable finalDestColumnsData = [];//作为finalDestColumns表格的数据源

  @observable finalTimeColumnData = [];//作为finalTimeColumn表格的数据源

  @observable step2Data = [];//配置列表表格的datasource
  
  @observable step3Data = [];//任务列表表格的datasource

  @observable destColumnsSelectedRows = []//destColumns表格的点选

  @observable timeColumnSelectedRows = []//timeColumn表格的点选

  @observable finalDestColumnsSelectedRows = []//finalDestColumns表格的点选

  @observable finalTimeColumnSelectedRows = []//finalTimeColumn表格的点选


  //数据配置页的请求kafka数据接口
  @action
  getKafkaMessage(kafkaModel) {
    HttpClient.get("/kafka/transSpec/source/kafka/message", kafkaModel)
      .then(
        action((res) => {
          this.kafkaRawData = JSON.parse(res.data[0]).value;
        })
      )
  }

  // 数据配置页的kafka输出数据接口
  @action
  returnKafkaMessage(returnData) {
    HttpClient.post(`/kafka/apollo/create/conf`, returnData, {
      'headers': {
        'Content-Type': 'text/plain'
      }
    })
      //http://10.10.212.14:8080/apollo/create/conf
      .then(
        action((res) => {
          console.log(res)
        }),
      );
  }

  // 配置列表页的getAllConf接口
  @action
  getAllConf(source) {
    return HttpClient.get(`/kafka/apollo/getAllConf`)
      // http://10.10.212.14:8080/apollo/getAllConf
      .then(
        action((res) => {
          console.log(Object.entries(res.data));
          Object.entries(res.data).map(([key, value],index) => {
            source.push({
              number:index+1,
              keyName:key,
              value:value,            
            })
          });
          console.log(source)
        }),
      );
  }

// 配置列表页的createJob接口
  createJob(params){
    // const data = JSON.stringify(params)
    HttpClient.post(`/kafka/apollo/create/job`, params
    )
      //http://10.10.212.14:8080/apollo/create/job
      .then(
        action((res) => {
          console.log(res)
        }),
      );
  }


  @action
  changeKafkaValueParseStep(stepData) {
    this.kafkaValueParseStep = stepData;
    console.log(toJS(this.kafkaValueParseStep))
  }
}
