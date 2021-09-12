import React, { useState, lazy, Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import './index.css'
import SideMenu from '../SideMenu'
import Loading from '../Loading'

const Comic = lazy(()=> import('../../pages/Comic'))
const Music = lazy(()=> import('../../pages/Music'))
const Setting = lazy(()=> import('../../pages/Setting'))
const { Sider, Content } = Layout;

export default function Home () {
    const [collapsed,setCollapsed] = useState(false)
    return (
        <Layout>
          <Sider className="sider" collapsible collapsed={collapsed} onCollapse={()=>setCollapsed(!collapsed)} style={{backgroundColor:'#fff'}}>
            <div className="logo" onClick={()=>setCollapsed(!collapsed)}/>
            <SideMenu />
          </Sider>
          <Layout className="site-layout">
            <Content className="site-layout-background">
              <Suspense fallback={<Loading/>}>
                <Switch>
                  <Route path='/setting'  component={Setting} />
                  <Route path='/comic'  component={Comic} />
                  <Route path='/music'  component={Music} />
                  <Redirect to='/setting' />
                </Switch>
              </Suspense>
            </Content>
          </Layout>
        </Layout>
    )
}