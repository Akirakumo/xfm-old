import React, { useState, lazy, Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import './index.css'
import SideMenu from '../SideMenu'

const Comic = lazy(()=> import('../../pages/Comic'))
const Music = lazy(()=> import('../../pages/Music'))
const ASMR = lazy(()=> import('../../pages/Music'))
const Setting = lazy(()=> import('../../pages/Setting'))
const { Sider, Content } = Layout;

export default function Home () {
    const [collapsed,setCollapsed] = useState(false)
    return (
        <Layout>
          <Sider className="sider" collapsible collapsed={collapsed} onCollapse={()=>setCollapsed(!collapsed)}>
            <div className="logo"/>
            <SideMenu />
          </Sider>
          <Layout className="site-layout">
            <Content className="site-layout-background">
              <Suspense fallback={<Spin />}>
                <Switch>
                  <Route path='/comic'  component={Comic} />
                  <Route path='/asmr'  component={ASMR} />
                  <Route path='/music'  component={Music} />
                  <Route path='/setting'  component={Setting} />
                  <Redirect to='/setting' />
                </Switch>
              </Suspense>
            </Content>
          </Layout>
        </Layout>
    )
}