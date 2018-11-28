import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import autobind from 'autobind-decorator'
import { Button, Card, Divider, Form, Input, Modal, Popover, Tree } from 'antd'
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
export default class ResourceManage extends Component {
  store = this.props.resourceManageStore

  constructor(props) {
    super(props)
    this.store = store
  }

  componentDidMount() {
    this.store.getAllResources()
  }

  @autobind
  onExpand(expandedKeys) {
    this.store.expandNode(expandedKeys)
  }

  // 删除节点

  handleDeleteNode(node) {
    confirm({
      title: `确认删除 "${node.name}"?`,
      onOk: () => {
        this.store.deleteResource(node)
      },
      okText: '确认',
      cancelText: '取消'
    })
  }

  // 添加节点

  @autobind
  handleAddChildNode(node) {
    this.store.showCreateDialog(node)
  }

  @autobind
  hideCreateDialog() {
    this.store.hideCreateDialog()
  }

  @autobind
  handleCreateResource() {
    this.store.createResource()
  }

  // 编辑节点

  @autobind
  handleEditNode(node) {
    this.store.showEditDialog(node)
  }

  @autobind
  hideEditDialog() {
    this.store.hideEditDialog()
  }

  @autobind
  handleEditResource() {
    this.store.editResource()
  }

  @autobind
  handleValueChange(field, e) {
    this.store.handleValueChange(field, e.target.value)
  }

  renderTreeNodes(data) {
    const $popTitle = item => (
      <Popover
        key={item.resource_id + '-' + item.resource_pid}
        placement="rightTop"
        content={
          <div>
            <Button
              onClick={() => {
                this.handleEditNode(item)
              }}
            >
              修改节点
            </Button>
            <Divider type="vertical" />
            <Button
              onClick={() => {
                this.handleDeleteNode(item)
              }}
            >
              删除节点
            </Button>
            <Divider type="vertical" />
            <Button
              onClick={() => {
                this.handleAddChildNode(item)
              }}
            >
              添加子节点
            </Button>
          </div>
        }
        trigger="hover"
      >
        {item.name}
      </Popover>
    )
    return data.map(item => {
      if (item.children && item.children.length) {
        return (
          <TreeNode
            key={item.resource_id + '-' + item.resource_pid}
            title={$popTitle(item)}
            dataRef={item}
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return (
        <TreeNode
          key={item.resource_id + '-' + item.resource_pid}
          title={$popTitle(item)}
          dataRef={item}
        />
      )
    })
  }

  render() {
    return (
      <div>
        <Card title="资源管理">
          <Tree
            onExpand={this.onExpand}
            expandedKeys={this.store.expandedKeys}
            autoExpandParent={this.store.autoExpandParent}
          >
            {this.renderTreeNodes(this.store.resourcesTree)}
          </Tree>
        </Card>
        <Modal
          title="创建资源"
          visible={this.store.dialogVisible}
          okText="保存"
          cancelText="取消"
          onOk={this.handleCreateResource}
          onCancel={this.hideCreateDialog}
        >
          <div>父级资源：{this.store.selectedNode.name}</div>
          <Divider />
          <FormItem {...formItemLayout} label="资源名">
            <Input
              value={this.store.form.name}
              onChange={e => {
                this.handleValueChange('name', e)
              }}
            />
          </FormItem>
          <FormItem {...formItemLayout} label="访问地址">
            <Input
              value={this.store.form.location}
              onChange={e => {
                this.handleValueChange('location', e)
              }}
            />
          </FormItem>
          <FormItem {...formItemLayout} label="接口地址">
            <Input
              value={this.store.form.path}
              onChange={e => {
                this.handleValueChange('path', e)
              }}
            />
          </FormItem>
          <FormItem {...formItemLayout} label="图标">
            <Input
              value={this.store.form.icon}
              onChange={e => {
                this.handleValueChange('icon', e)
              }}
            />
          </FormItem>
        </Modal>
        <Modal
          title="修改资源"
          visible={this.store.editDialogVisible}
          okText="保存"
          cancelText="取消"
          onOk={this.handleEditResource}
          onCancel={this.hideEditDialog}
        >
          <div>父级资源：{this.store.selectedNode.name}</div>
          <Divider />
          <FormItem {...formItemLayout} label="资源名">
            <Input
              value={this.store.form.name}
              onChange={e => {
                this.handleValueChange('name', e)
              }}
            />
          </FormItem>
          <FormItem {...formItemLayout} label="访问地址">
            <Input
              value={this.store.form.location}
              onChange={e => {
                this.handleValueChange('location', e)
              }}
            />
          </FormItem>
          <FormItem {...formItemLayout} label="接口地址">
            <Input
              value={this.store.form.path}
              onChange={e => {
                this.handleValueChange('path', e)
              }}
            />
          </FormItem>
          <FormItem {...formItemLayout} label="图标">
            <Input
              value={this.store.form.icon}
              onChange={e => {
                this.handleValueChange('icon', e)
              }}
            />
          </FormItem>
        </Modal>
      </div>
    )
  }
}
