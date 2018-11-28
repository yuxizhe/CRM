import { Component } from "react";
import { Select } from "antd";

const Option = Select.Option;

class webSelect extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  handleChange = name => {
    console.log(`selected ${name}`);
    this.props.onChange(name);
  };
  render() {
    return (
      <Select
        showSearch
        style={{ width: 200, margin: " 0.5rem 1rem" }}
        placeholder="请选择"
        optionFilterProp="children"
        onChange={this.handleChange}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="tom">Tom</Option>
      </Select>
    );
  }
}

export default webSelect;
