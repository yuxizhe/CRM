import React, {
  Component,
} from 'react';

import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import './style.css';

export default class JSONEditorDemo extends Component {
  componentDidMount() {
    const options = {
      modes: ['tree', 'code'],
      onChangeJSON: this.props.onChangeJSON,
    };

    this.jsoneditor = new JSONEditor(this.container, options);
    this.jsoneditor.set(this.props.json);
  }

  componentWillUpdate(nextProps) {
    this.jsoneditor.update(nextProps.json);
  }

  componentWillUnmount() {
    if (this.jsoneditor) {
      this.jsoneditor.destroy();
    }
  }

  render() {
    return (<div
      className="jsoneditor-react-container"
      ref={
        elem => this.container = elem
      }
    />
    );
  }
}
