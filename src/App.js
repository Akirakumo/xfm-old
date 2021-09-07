import React, {useState,useEffect,lazy,Suspense} from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Layout,Menu  } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'
import './APP.css'
import logo from '../public/images/logo.jpg'
import SideMenu from './components/SideMenu'

const Comic = lazy(()=> import('./pages/Comic'))
const Music = lazy(()=> import('./pages/Music'))
const ASMR = lazy(()=> import('./pages/Music'))
const { Header, Sider, Content } = Layout;


export default function APP () {

  const [collapsed,setCollapsed] = useState(false)

  return (
      <>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo">
              <img src={logo} />
            </div>
            <SideMenu/>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: ()=>setCollapsed(!collapsed),
              })}
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}
            >
              <Suspense fallback={<p>Loading……</p>}>
                  <Switch>
                    <Route path='/comic'  component={Comic} />
                    <Route path='/asmr'  component={ASMR} />
                    <Route path='/music'  component={Music} />
                    <Redirect to='/comic' />
                  </Switch>
                </Suspense>
            </Content>
          </Layout>
        </Layout>
      </>
  )
}