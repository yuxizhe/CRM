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

class App extends Component {
  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Navbar />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
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
    )
  }
}

export default hot(module)(App)
