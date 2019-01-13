import { observable, action, toJS } from "mobx";
import { message } from "antd";
import HttpClient from '../utils/httpclient';

export default class Store {

  @observable transformSpecs = [{
    kafkaKeyParseStep: null,
    timeColumnFormatStr: "",
    maxOutOfOrders: null,
    maxErrorRowsLimitPerHour: null,
    hourlyCounter: {
      hourlyCount: null,
    }
  }]

  @observable kafkaValueParseStep = {
    parseType: "",
    stepParameter: "",
    stepName: "",
    parsedColumns: [],
    subParseSteps: {},
  }

  @observable kafkaRawData = ""

  @observable parsedColumnsData = [];

  @observable destColumnsData = [];

  handleMaps = []


  kafkaData = {};


  @observable visible = []

  testData = `2604340708|XueqiuiPhone11.13-WWANiPhone_6|1545991573361|1100|21|0|{\"url\":\"https://www.snowballsecurities.com/activity/deposit?r=30017006\",\"promotion_id\":\"3850\"}|545D15D2-9FA6-4A0A-8F45-7E0F5176425E.2604340708.1545991560609.1545991573362`;

  //kafka数据接口
  @action
  getKafkaMessage(kafkaModel) {
    this.kafkaData = kafkaModel;
    HttpClient.get("/xq/transSpec/source/kafka/message", kafkaModel)
      .then(
        action((res) => {
          this.kafkaRawData = JSON.parse(res.data[0]).value;
        }),
      );
  }

  //第一轮
  @action
  changeMainParser(parserType) {
    this.kafkaValueParseStep.parseType = parserType;
  }

  @action
  saveStepParameter(stepParameter) {
    this.kafkaValueParseStep.stepParameter = stepParameter;
  }

  @action
  saveStepName(stepName) {
    this.kafkaValueParseStep.stepName = stepName;
  }

  //第二轮
  handleNameChange(index, value) {
    this.kafkaValueParseStep.parsedColumns[index].column = value;
  }

  handleDefaultValueChange(index, value) {
    this.kafkaValueParseStep.parsedColumns[index].defaultValue = value;
  }

  //第二轮确认解析后
  handleSubParseStepsParseTypeChange(index, value) {
    this.kafkaValueParseStep.subParseSteps[index].parseType = value;
  }

  handleSubParseStepsStepParameterChange(index, value) {
    this.kafkaValueParseStep.subParseSteps[index].stepParameter = value;
  }

  handleSubParseStepsStepNameChange(index, value) {
    this.kafkaValueParseStep.subParseSteps[index].stepName = value;
  }




  splitParser(Data, stepParameter) {
    const testedData = Data.split(stepParameter);

    testedData.map((item, index) => {

      return {
        extractParam: index + 1,
        value: item,
        column: undefined,
        defaultValue: "",
        faultBehavior: undefined,
      }

    })
  }

  urlParser(url, urlParams) {
    const queryString = url.split("?").splice(1, 1).toString();
    const pair = queryString.toString().split("&");
    const splitedPair = [];
    for (let i = 0; i < pair.length; i++) {
      splitedPair.push(pair[i].split("="))
    }
    const urlPartName = [];
    const urlPartValue = [];
    for (let i = 0; i < splitedPair.length; i++) {
      urlPartName.push(splitedPair[i][0])
      urlPartValue.push(splitedPair[i][1])
    }

    // urlParams.length = 0;
    for (let i = 0; i < urlPartValue.length; i++) {
      urlParams.push({
        extractParam: urlPartName[i],
        value: urlPartValue[i],
        column: '',
        faultBehavior: undefined,
        defaultValue: "",
      })
    }
    console.log(urlParams)
  }

  jsonParser(data) {
    const result = JSON.parse(data)
    this.kafkaValueParseStep.parsedColumns = Object.entries(result).map(([key, value]) => {
      return {
        extractParam: key,
        value: value,
        column: '',
        faultBehavior: undefined,
        defaultValue: "",
      }
    })
  }

  regexParser(data, stepParameter) {
    const regexParams = data.match(stepParameter)
    this.kafkaValueParseStep.parsedColumns = regexParams.map((item, index) => {
      return {
        extractParam: index,
        value: item,
        column: '',
        faultBehavior: undefined,
        defaultValue: "",
      }
    })
    console.log("regexedData", regexedData)
  }

  createFinalPanelData(receivedData, returnData) {
    receivedData.map((item, index) => {
      returnData.push({
        column: item.column,
        value: item.value,
        key: index,
      })
    })
  }

  @action
  changeKafkaValueParseStep(stepData) {
    this.kafkaValueParseStep = stepData;
    console.log(toJS(this.kafkaValueParseStep));
  }
}
