import React from 'react';
import {
  Card, Button, Switch, Divider,
} from 'antd';
import { observer } from 'mobx-react';
import JsonEditor from 'components/JsonEditor';
import wilddog from 'wilddog';

import store from './store';

@observer
class Info extends React.Component {
  constructor(props) {
    super(props);
    this.store = store;

    const config = {
      syncURL:
        'https://yuxizhe.wilddogio.com/snowfire/test', // 输入节点 URL
    };
    wilddog.initializeApp(config);
    this.ref = wilddog.sync().ref();
    this.ref.on('value', (snapshot) => {
      this.store.json = snapshot.val();
    });
  }

  componentDidMount() {

  }

  onChangeJSON = (value) => {
    this.store.json = value;
    if (this.store.realtime) {
      this.updateJSON();
    }
  }

  updateJSON = () => {
    this.ref.set(this.store.json);
  }

  onSwitchChange = (value) => {
    this.store.realtime = value;
  }

  render() {
    return (
      <div>
        <Card
          title="SnowFire 页面信息"
          extra={(
            <div>
              <span> 实时预览 </span>
              <Switch onChange={this.onSwitchChange} />
              <Divider type="vertical" />
              <Button type="primary" onClick={this.updateJSON}>
              预览
              </Button>
              <Divider type="vertical" />
              <Button type="danger" onClick={this.updateJSON}>
              发布
              </Button>
            </div>
          )}
        >
          <JsonEditor
            json={this.store.json}
            onChangeJSON={this.onChangeJSON}
          />
        </Card>
      </div>
    );
  }
}

export default Info;
