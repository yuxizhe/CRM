import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Form, Icon, Input, Button } from 'antd'
import './style.scss'

const FormItem = Form.Item

@inject('loginStore')
@observer
class HorizontalLoginForm extends Component {
  loginStore = this.props.loginStore

  componentDidMount() {
    if (this.loginStore.isLogged) {
      window.location.href = '/'
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.loginStore.login(values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login-page">
        <div className="image-wrapper">
          <img
            src="https://assets.imedao.com/broker-us/static/images/index/v2/logo_white.41e2a4ec.png"
            alt=""
          />
        </div>
        <div className="box-card">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名' }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="用户名"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登 录
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}
const WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm)

export default WrappedHorizontalLoginForm
