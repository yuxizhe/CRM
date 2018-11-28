import React, { Component } from 'react'
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { hot } from 'react-hot-loader'
// 全局store
import stores from 'src/stores'
import routes from 'src/routers'
import SideBar from 'components/SideBar'
import NoMatch from 'src/pages/NoMatch'

import { Layout } from 'antd'
const { Content } = Layout

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Layout>
          <SideBar>
            <Content>
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
            </Content>
          </SideBar>
        </Layout>
      </Provider>
    )
  }
}

export default hot(module)(App)
