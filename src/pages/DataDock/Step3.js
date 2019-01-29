import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import './style.scss'
import { ParsedError } from 'pretty-error';

@inject('dataDockStore')
@observer
class Step3 extends Component {
    store = this.props.dataDockStore;

    render() {
        return(
            <div>
                
            </div>
        )
    }
}

export default Step3;