import { observable, action, toJS } from "mobx";
import { message } from "antd";
import HttpClient from '../utils/httpclient';
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
      timeColumnFormatStr:"",
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
    enableEventTime: true,
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

  @observable mapsData = [1]

  @observable finalDestColumnsData = [];//作为finalDestColumns表格的数据源

  @observable finalTimeColumnData = [];//作为finalTimeColumn表格的数据源

  @observable step2Data =[]//数据监控表格的datasource

  @observable destColumnsSelectedRows=[]//destColumns表格的点选

  @observable timeColumnSelectedRows=[]//timeColumn表格的点选

  @observable finalDestColumnsSelectedRows=[]//finalDestColumns表格的点选

  @observable finalTimeColumnSelectedRows=[]//finalTimeColumn表格的点选
  

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

  //数据配置页的kafka输出数据接口
  @action
  returnKafkaMessage(returnData) {
    HttpClient.post(`/kafka/apollo/create/conf`, returnData,{
      'headers':{
        'Content-Type':'text/plain'
      }
    })
    //http://10.10.212.14:8080/apollo/create/conf
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
