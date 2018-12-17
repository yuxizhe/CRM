import { Row, Button, Input, Col, Card, Divider } from "antd";
import { observer } from "mobx-react";
import store from "./store";

const Search = Input.Search;

@observer
class Info extends React.Component {
  store = store;

  onStatusSelectChange = value => {
    this.store.getUser(value)
  }
  render() {
    return (
      <div>
        <Card title='详情页示例'>
          <Search
            placeholder="请输入ID"
            onSearch={this.onStatusSelectChange}
            enterButton="搜索"
            style={{ width: 200 }}
          />
          <Divider />
          <div>
            <Row gutter={24}>
              <Col span={8}>
                姓名：{this.store.userInfo.name}
              </Col>
              <Col span={8}>
                年龄：{this.store.userInfo.age}
              </Col>
              <Col span={8}>
                电话：{this.store.userInfo.phone}
              </Col>
            </Row>
            {/* <Divider /> */}
            <Row gutter={24}>
              <Col span={8}>
                住址：{this.store.userInfo.address}
              </Col>
              <Col span={8}>
                描述：{this.store.userInfo.description}
              </Col>
            </Row>
            <Divider />
          </div>
        </Card>
      </div>
    )
  }
}

export default Info;
