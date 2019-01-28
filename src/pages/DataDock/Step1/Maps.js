import React, { Component } from 'react';
import {
  Input,
  Button,
  Row,
  Col,
  Select,
  Divider,
  message,
} from 'antd';
import { inject, observer } from 'mobx-react';
import './style.scss';


@inject('dataDockStore')
@observer
class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  store = this.props.dataDockStore;
  //destColumns的maps保存
  //maps的key保存
  saveMapsKey = (e, column) => {

    this.store.parsedColumnsData.map((item) => {
      if (item.column === column) {
        item.mapsKey.push(e.target.value)
      }
    })
  }

  //maps的value保存
  saveMapsValue = (e, column) => {

    this.store.parsedColumnsData.map((item) => {
      if (item.column === column) {
        item.mapsValue.push(e)
      }
    })
  }

  //由maps的key和value组成maps
  saveMaps = (column) => {
    const { parsedColumnsData } = this.store
    parsedColumnsData.map((item) => {
      if (item.column === column) {
        item.maps[item.mapsKey[item.mapsKey.length - 1]] = item.mapsValue[item.mapsValue.length - 1]
        message.success("本条map记录完成")
      }
    })
  }

  addMaps = (column) => {
    const { parsedColumnsData } = this.store
    parsedColumnsData.map((item) => {
      if (item.column === column) {
        this.store.mapsData.push(
          1
        )
      }
    })
  }

  deleteMaps = (column) => {
    const { parsedColumnsData } = this.store
    parsedColumnsData.map((item) => {
      if (item.column === column) {
        this.store.mapsData.pop()
        delete item.maps[item.mapsKey[item.mapsKey.length - 1]]
      }
    })
  }


  allMaps = () => {
    const { column } = this.props
    const $maps = this.store.mapsData.map((item, index) => (
      <span key={index}>
        <Input
          style={{ width: 80 }}
          placeholder="父类"
          onChange={e => { this.saveMapsKey(e, column) }}
        />
        <Divider type="vertical" />
        <Select
          mode="tags"
          style={{ width: 150 }}
          placeholder="子类"
          onChange={e => { this.saveMapsValue(e, column) }}
        />
        <Divider type="vertical" />
        <Button icon="check" onClick={() => this.saveMaps(column)} shape="circle" size="small" />
        <Divider type="vertical" />
        {index < 1 &&
          <Button icon="plus" onClick={() => this.addMaps(column)} shape="circle" size="small" />}
        {index < 1 &&
          <Button icon="minus"
            onClick={() => this.deleteMaps(column)}
            shape="circle" size="small" />}
      </span>
    )
    )
    return (
      <div >
        {$maps}
      </div>
    )
  }

  render() {
    return (
      <div className='maps'>
        {this.allMaps()}
      </div>
    )
  }
}

export default Maps;