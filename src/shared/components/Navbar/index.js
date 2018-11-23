import React from 'react'
import { NavLink } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
const { Sider } = Layout

export default function Navbar() {
  const languages = [
    {
      name: '数据导入',
      param: 'import'
    },
    {
      name: '经理言论',
      param: 'MANAGER_SPEECH'
    },
    {
      name: '投研报告',
      param: 'RESEARCH_REPORT'
    },
    {
      name: '经理采访',
      param: 'PRIVATE_INTERVIEW'
    }
  ]

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken)
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type)
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['']}>
        {languages.map(({ name, param }) => (
          <Menu.Item key={param}>
            <NavLink activeStyle={{ fontWeight: 'bold' }} to={`/${param}`}>
              {name}
            </NavLink>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  )
}
