import { Table, Icon, Select, Button, Input, Form, Divider, Card } from "antd";
import { observer, inject } from "mobx-react";
import store from "./store";

const Search = Input.Search;
const FormItem = Form.Item;

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    width: 150,
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
    width: 70
  },
  {
    title: "地址",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "操作",
    key: "action",
    width: 360,
    render: (text, record) => (
      <span>
        <a href="javascript:;">操作1</a>
        <Divider type="vertical" />
        <a href="javascript:;">操作2</a>
        <Divider type="vertical" />
        <a href="javascript:;" className="ant-dropdown-link">
          更多 <Icon type="down" />
        </a>
      </span>
    )
  }
];

const expandedRowRender = record => <p>{record.description}</p>;
const pagination = { position: "bottom" };
@observer
class UserList extends React.Component {
  state = {
    bordered: false,
    loading: false,
    pagination,
    size: "default",
    expandedRowRender,
    showHeader: true,
    rowSelection: {},
    scroll: undefined,
    hasData: true
  };
  store = store;

  componentDidMount() {
    this.store.getList();
  }

  onStatusSelectChange = value => {
    this.store.getList(value);
  };
  handleButtonClick = value => {
    this.store.clickButton(value);
  };
  render() {
    const state = this.state;
    return (
      <div>
        <Card title="列表示例">
          <div className="components-table-demo-control-bar">
            <Form layout="inline">
              <Search
                placeholder="请输入ID"
                onSearch={value => this.onStatusSelectChange(value)}
                enterButton="搜索"
                style={{ width: 200 }}
              />
              <Select
                placeholder="内容类别"
                style={{ width: 120, margin: "0 20px" }}
                onChange={this.onStatusSelectChange}
              >
                <Option key={1} value="经理言论">
                  经理言论
                </Option>
                <Option key={2} value="投研报告">
                  投研报告
                </Option>
                <Option key={3} value="经理采访">
                  经理采访
                </Option>
              </Select>
              <Button
                type="primary"
                style={{ marginLeft: 20 }}
                onClick={this.handleButtonClick}
              >
                重置
              </Button>
            </Form>
          </div>
          <Divider />
          <Table
            {...this.state}
            columns={columns}
            dataSource={this.store.data}
          />
        </Card>
      </div>
    );
  }
}

export default UserList;
