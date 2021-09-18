import React, { useState, lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import "./index.less";
import SideMenu from "../SideMenu/index";
import Loading from "../Loading/index";

const Setting = lazy(() => import("../../pages/Setting/index.jsx"));
const Comic = lazy(() => import("../../pages/Comic/index.jsx"));
const Music = lazy(() => import("../../pages/Music/index.jsx"));

const { Sider, Content } = Layout;

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider
        className="sider"
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
        style={{ backgroundColor: "#fff" }}
      >
        <div className="logo" onClick={() => setCollapsed(!collapsed)} />
        <SideMenu />
      </Sider>
      <Layout className="site-layout">
        <Content className="site-layout-background">
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route path="/setting" component={Setting} />
              <Route path="/comic" component={Comic} />
              <Route path="/music" component={Music} />
              <Redirect to="/setting" />
            </Switch>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
}
