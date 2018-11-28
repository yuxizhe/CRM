import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Button, Card, Divider, Input, Modal, Form, Table, Tree } from 'antd'
import autobind from 'autobind-decorator'
import store from './store'
const TreeNode = Tree.TreeNode
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}
const confirm = Modal.confirm

@observer
export default class RolesManage extends Component {
  columns = [
    {
      title: '角色ID',
      dataIndex: 'role_id',
      key: 'role_id'
    },
    {
      title: '角色名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      key: 'update_time'
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time'
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 150,
      render: (text, record) => {
        return (
          <span>
            <a onClick={() => this.showDistributeDialog(record)}>分配资源</a>
            <Divider type="vertical" />
            <a onClick={() => this.handleDelete(record)}>删除</a>
          </span>
        )
      }
    }
  ]
  rowColumns = [
    {
      title: '资源ID',
      dataIndex: 'resource_id',
      key: 'resource_id'
    },
    {
      title: '资源名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '父级资源ID',
      dataIndex: 'resource_pid',
      key: 'resource_pid'
    },
    {
      title: '访问地址',
      dataIndex: 'location',
      key: 'location'
    }
  ]

  constructor(props) {
    super(props)
    this.store = store
  }

  componentDidMount() {
    this.store.getAllRoles()
    this.store.getAllResources()
  }

  @autobind
  showDistributeDialog(role) {
    this.store.showDistributeDialog(role)
  }

  @autobind
  showCreateDialog() {
    this.store.showCreateDialog()
  }

  @autobind
  handleCreate() {
    this.store.createRole()
  }

  handleDelete(role) {
    confirm({
      title: `删除前请清空用户所拥有的资源，确认删除 "${role.name}"?`,
      onOk: () => {
        this.store.deleteRole(role)
      },
      okText: '确认',
      cancelText: '取消'
    })
  }

  @autobind
  handleDistributeSave() {
    this.store.distributeResource()
  }

  @autobind
  hideDistributeDialog() {
    this.store.hideDistributeDialog()
  }

  @autobind
  hideSaveDialog() {
    this.store.hideCreateDialog()
  }

  @autobind
  handleNameChange(e) {
    this.store.setName(e.target.value)
  }

  @autobind
  onExpand(expandedKeys) {
    this.store.expandNode(expandedKeys)
  }

  renderTreeNodes(data) {
    return data.map(item => {
      if (item.children && item.children.length) {
        return (
          <TreeNode
            key={item.resource_id + '-' + item.resource_pid}
            title={item.name}
            dataRef={item}
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return (
        <TreeNode
          key={item.resource_id + '-' + item.resource_pid}
          title={item.name}
          dataRef={item}
        />
      )
    })
  }

  @autobind
  onCheck(checkedKeys) {
    this.store.setCheckedKeys(checkedKeys)
  }

  render() {
    return (
      <div>
        <Card
          title="角色管理"
          bordered={false}
          extra={
            <Button type="primary" onClick={this.showCreateDialog}>
              创建角色
            </Button>
          }
        >
          <Table
            pagination={false}
            rowKey="role_id"
            dataSource={this.store.filteredRoles}
            columns={this.columns}
          />
        </Card>
        <Modal
          title="分配资源"
          visible={this.store.distributeDialogVisible}
          okText="保存"
          cancelText="取消"
          onOk={this.handleDistributeSave}
          onCancel={this.hideDistributeDialog}
        >
          <div>角色：{this.store.currentSelectRole.name}</div>
          <Tree
            checkable
            onCheck={this.onCheck}
            checkedKeys={this.store.checkedKeys}
            onExpand={this.onExpand}
            expandedKeys={this.store.expandedKeys}
            autoExpandParent={this.store.autoExpandParent}
          >
            {this.renderTreeNodes(this.store.resourcesTree)}
          </Tree>
        </Modal>
        <Modal
          title="创建角色"
          visible={this.store.createDialogVisible}
          okText="保存"
          cancelText="取消"
          onOk={this.handleCreate}
          onCancel={this.hideSaveDialog}
        >
          <FormItem {...formItemLayout} label="角色名">
            <Input
              placeholder="必填"
              value={this.store.form.name}
              onChange={this.handleNameChange}
            />
          </FormItem>
        </Modal>
      </div>
    )
  }
}
