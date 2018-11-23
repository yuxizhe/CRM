import React, { Component } from 'react'
import './style.less'

import { observer, inject } from 'mobx-react'
import { Button, Row, Col } from 'antd'
import WebSelect from '../../components/webSelect'

class ImportPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstValue: null,
      secondValue: null,
      thirdValue: null
    }
  }
  render() {
    return (
      <div className="home">
        <WebSelect onChange={e => this.setState({ firstValue: e })} />

        <WebSelect onChange={e => this.setState({ secondValue: e })} />

        <WebSelect onChange={e => this.setState({ thirdValue: e })} />

        <Button type="primary">Button</Button>
      </div>
    )
  }
}
export default ImportPage
