import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import './style.scss';


@inject('dataDockStore')
@observer
class WarningPage extends Component {
    store = this.props.dataDockStore;

    render() {
      return (
        <div />
      );
    }
}

export default WarningPage;
