import React, { Component } from 'react'
import './style.less'

import { observer, inject } from 'mobx-react'
import { Button } from 'antd'

@inject('Store')
@observer
class Home extends Component {
  constructor(props) {
    super(props)
    let { updateName } = props.Store
    updateName('xueqiu')
  }
  render() {
    const { name } = this.props.Store.userInfo
    return (
      <div className="home">
        雪球
        <p>
          mobx: <strong className="name"> {name}</strong>{' '}
        </p>
        <Button type="primary">Button</Button>
      </div>
    )
  }
}
export default Home
