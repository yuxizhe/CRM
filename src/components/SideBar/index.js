import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { Layout, Menu, Icon } from 'antd';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import './style.scss';

const { Header, Sider } = Layout;
const { SubMenu } = Menu;

@inject('sideBar', 'loginStore')
@observer
class SideBar extends Component {
  sideBar = this.props.sideBar;

  loginStore = this.props.loginStore;

  componentDidMount() {
    if (!this.loginStore.isLogged && window.location.pathname !== '/login') {
      window.location.href = '/login';
      return;
    }
    if (window.location.pathname !== '/login') {
      this.sideBar.getUserResource();
    }
  }

  @autobind
  handleLogout() {
    this.sideBar.logout();
  }

  _formatMenuTree(resources) {
    return resources.map((item) => {
      if (item.children && item.children.length) {
        return (
          <SubMenu
            key={`${item.resource_id}-${item.resource_pid}`}
            title={(
              <span>
                <Icon type={item.icon ? item.icon : 'file'} />
                <span>{item.name}</span>
              </span>
            )}
          >
            {this._formatMenuTree(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item
          key={
              item.location || `#${item.resource_id}-${item.resource_pid}`
            }
        >
          <Link to={item.location}>
            <Icon type={item.icon ? item.icon : 'file'} />
            <span>{item.name}</span>
          </Link>
        </Menu.Item>
      );
    });
  }

  render() {
    let $navSider = null;
    if (this.loginStore.isLogged) {
      const $tree = this._formatMenuTree(this.sideBar.resourcesTree);
      $navSider = (
        <Sider theme="dark" breakpoint="lg" collapsedWidth="0">
          <div className="logo">
            <Link to="/">雪球CRM</Link>
          </div>
          <Menu mode="inline" theme="dark" defaultOpenKeys={['5-0']}>
            {$tree}
          </Menu>
        </Sider>
      );
    }
    return (
      <Layout id="Layout">
        {$navSider}
        <Layout>
          <Header className="header" hidden={!this.loginStore.isLogged}>
            <div className="user">
              <Icon type="user" />
              {' '}
              {this.sideBar.userName}
              <span className="logout" onClick={this.handleLogout}>
                <Icon type="logout" />
                注销
              </span>
            </div>
          </Header>
          <div className="container">{this.props.children}</div>
        </Layout>
      </Layout>
    );
  }
}

export default SideBar;
