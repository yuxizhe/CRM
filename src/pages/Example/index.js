import React, { Component } from "react";
import "./style.scss";
import { observer, inject } from "mobx-react";
import { Button } from "antd";

@inject("gStore")
@observer
class Home extends Component {
  constructor(props) {
    super(props);
    let { updateName } = props.gStore;
    updateName("xueqiu");
  }
  render() {
    const gName = this.props.gStore.userInfo.name;
    const lName = this.props.store.userInfo.name;
    return (
      <div className="home">
        雪球
        <p>
          全局mobx: <strong className="name"> {gName}</strong>
        </p>
        <p>
          局部mobx: <strong className="name"> {lName}</strong>
        </p>
        <Button type="primary">Button</Button>
      </div>
    );
  }
}
export default Home;
