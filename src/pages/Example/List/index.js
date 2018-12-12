import { Table, Icon, Switch, Radio, Form, Divider, Card } from "antd";

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

const data = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    key: i,
    name: "John Brown",
    age: `${i}2`,
    address: `New York No. ${i} Lake Park`,
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`
  });
}

const expandedRowRender = record => <p>{record.description}</p>;
const title = () => "Here is title";
const showHeader = true;
const footer = () => "Here is footer";
const scroll = { y: 240 };
const pagination = { position: "bottom" };

class UserList extends React.Component {
  state = {
    bordered: false,
    loading: false,
    pagination,
    size: "default",
    expandedRowRender,
    title: undefined,
    showHeader,
    footer,
    rowSelection: {},
    scroll: undefined,
    hasData: true
  };

  handleToggle = prop => enable => {
    this.setState({ [prop]: enable });
  };

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  handleExpandChange = enable => {
    this.setState({
      expandedRowRender: enable ? expandedRowRender : undefined
    });
  };

  handleTitleChange = enable => {
    this.setState({ title: enable ? title : undefined });
  };

  handleHeaderChange = enable => {
    this.setState({ showHeader: enable ? showHeader : false });
  };

  handleFooterChange = enable => {
    this.setState({ footer: enable ? footer : undefined });
  };

  handleRowSelectionChange = enable => {
    this.setState({ rowSelection: enable ? {} : undefined });
  };

  handleScollChange = enable => {
    this.setState({ scroll: enable ? scroll : undefined });
  };

  handleDataChange = hasData => {
    this.setState({ hasData });
  };

  handlePaginationChange = e => {
    const { value } = e.target;
    this.setState({
      pagination: value === "none" ? false : { position: value }
    });
  };

  render() {
    const state = this.state;
    return (
      <div>
        <Card title="列表示例">
          <div className="components-table-demo-control-bar">
            <Form layout="inline">
              <FormItem label="Bordered">
                <Switch
                  checked={state.bordered}
                  onChange={this.handleToggle("bordered")}
                />
              </FormItem>
              <FormItem label="loading">
                <Switch
                  checked={state.loading}
                  onChange={this.handleToggle("loading")}
                />
              </FormItem>
              <FormItem label="Title">
                <Switch
                  checked={!!state.title}
                  onChange={this.handleTitleChange}
                />
              </FormItem>
              <FormItem label="Column Header">
                <Switch
                  checked={!!state.showHeader}
                  onChange={this.handleHeaderChange}
                />
              </FormItem>
              <FormItem label="Footer">
                <Switch
                  checked={!!state.footer}
                  onChange={this.handleFooterChange}
                />
              </FormItem>
              <FormItem label="Expandable">
                <Switch
                  checked={!!state.expandedRowRender}
                  onChange={this.handleExpandChange}
                />
              </FormItem>
              <FormItem label="Checkbox">
                <Switch
                  checked={!!state.rowSelection}
                  onChange={this.handleRowSelectionChange}
                />
              </FormItem>
              <FormItem label="Fixed Header">
                <Switch
                  checked={!!state.scroll}
                  onChange={this.handleScollChange}
                />
              </FormItem>
              <FormItem label="Has Data">
                <Switch
                  checked={!!state.hasData}
                  onChange={this.handleDataChange}
                />
              </FormItem>
              <FormItem label="Size">
                <Radio.Group
                  size="default"
                  value={state.size}
                  onChange={this.handleSizeChange}
                >
                  <Radio.Button value="default">Default</Radio.Button>
                  <Radio.Button value="middle">Middle</Radio.Button>
                  <Radio.Button value="small">Small</Radio.Button>
                </Radio.Group>
              </FormItem>
              <FormItem label="Pagination">
                <Radio.Group
                  value={state.pagination ? state.pagination.position : "none"}
                  onChange={this.handlePaginationChange}
                >
                  <Radio.Button value="top">Top</Radio.Button>
                  <Radio.Button value="bottom">Bottom</Radio.Button>
                  <Radio.Button value="both">Both</Radio.Button>
                  <Radio.Button value="none">None</Radio.Button>
                </Radio.Group>
              </FormItem>
            </Form>
          </div>
          <Divider />
          <Table
            {...this.state}
            columns={columns}
            dataSource={state.hasData ? data : null}
          />
        </Card>
      </div>
    );
  }
}

export default UserList;
