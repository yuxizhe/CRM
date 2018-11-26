import React, { Component } from 'react'
import routes from './routes'
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import NoMatch from './NoMatch'
import store from './store'
import { Provider } from 'mobx-react'
import { hot } from 'react-hot-loader'

import { Layout, Menu, Icon } from 'antd'
const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu;

class App extends Component {
  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Navbar/>
          <Layout>
            {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
            <Content style={{ margin: '24px 16px 0' }}>
              <Provider Store={store}>
                <Switch>
                  {routes.map(
                    ({ path, exact, component: Component, ...rest }) => (
                      <Route
                        key={path}
                        path={path}
                        exact={exact}
                        render={props => <Component {...props} {...rest} />}
                      />
                    )
                  )}
                  <Route render={props => <NoMatch {...props} />} />
                </Switch>
              </Provider>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default hot(module)(App)
