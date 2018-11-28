import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Button, Card, Divider, Input, Modal, Form, Table } from 'antd'
import autobind from 'autobind-decorator'
import store from './store'

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
export default class UserManage extends Component {
  columns = [
    {
      title: '用户ID',
      dataIndex: 'user_id',
      key: 'user_id'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '角色',
      dataIndex: 'roles',
      key: 'roles'
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
            <a onClick={() => this.showDistributeDialog(record)}>分配角色</a>
            <Divider type="vertical" />
            <a onClick={() => this.handleDelete(record)}>删除</a>
          </span>
        )
      }
    }
  ]
  rowColumns = [
    {
      title: '角色名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '角色ID',
      dataIndex: 'role_id',
      key: 'role_id'
    }
  ]
  constructor(props) {
    super(props)
    this.store = store
  }
  componentDidMount() {
    this.store.getAllUsers()
    this.store.getAllRoles()
  }

  @autobind
  showDistributeDialog(user) {
    this.store.showDistributeDialog(user)
  }

  @autobind
  showCreateDialog() {
    this.store.showCreateDialog()
  }

  @autobind
  handleCreate() {
    this.store.createUser()
  }

  handleDelete(user) {
    confirm({
      title: `删除前请清空用户所拥有的角色，确认删除 "${user.name}"?`,
      onOk: () => {
        this.store.deleteUser(user)
      },
      okText: '确认',
      cancelText: '取消'
    })
  }

  @autobind
  handleDistributeSave() {
    this.store.distributeRoles()
  }

  @autobind
  hideDistributeDialog() {
    this.store.hideDistributeDialog()
  }

  @autobind
  handleCurrentUserRolesChange(roles) {
    this.store.changeCurrentUserRoles(roles)
  }

  @autobind
  hideSaveDialog() {
    this.store.hideCreateDialog()
  }

  @autobind
  handleNameChange(e) {
    this.store.setName(e.target.value)
  }

  render() {
    return (
      <div>
        <Card>
          <div className="button-wrapper">
            <Button type="primary" onClick={this.showCreateDialog}>
              创建用户
            </Button>
          </div>
          <Table
            pagination={false}
            rowKey="user_id"
            dataSource={this.store.filteredUsers}
            columns={this.columns}
          />
        </Card>
        <Modal
          title="分配角色"
          visible={this.store.distributeDialogVisible}
          okText="保存"
          cancelText="取消"
          onOk={this.handleDistributeSave}
          onCancel={this.hideDistributeDialog}
        >
          <div>用户：{this.store.currentSelectUser.name}</div>
          <Table
            rowKey="role_id"
            pagination={false}
            rowSelection={{
              selectedRowKeys: this.store.currentUserRoles,
              onChange: this.handleCurrentUserRolesChange
            }}
            columns={this.rowColumns}
            dataSource={this.store.roles}
          />
        </Modal>
        <Modal
          title="创建用户"
          visible={this.store.createDialogVisible}
          okText="保存"
          cancelText="取消"
          onOk={this.handleCreate}
          onCancel={this.hideSaveDialog}
        >
          <FormItem {...formItemLayout} label="用户姓名">
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
