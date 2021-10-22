import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";

import SideMenu from "../SideMenu/index";
import Loading from "../Loading/index";

import "./index.less";

const Setting = lazy(() => import("../../pages/Setting/index.jsx"));
const Comic   = lazy(() => import("../../pages/Comic/index.jsx"));
const Music   = lazy(() => import("../../pages/Music/index.jsx"));

const { Content } = Layout;

export default function Home() {
  
  return (
    <Layout>
      
      <SideMenu />
      
      <Content className="content">
        <Suspense fallback={ <Loading /> }>
          <Switch>
            <Route path="/setting" component={Setting} />
            <Route path="/comic" component={Comic} />
            <Route path="/music" component={Music} />
            <Redirect to="/setting" />
          </Switch>
        </Suspense>
      </Content>

    </Layout>
  );
}
