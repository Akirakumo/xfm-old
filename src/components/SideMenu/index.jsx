import React, { useState, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import { ReadOutlined, PlayCircleOutlined, SettingOutlined } from "@ant-design/icons";

import './index.less'

const { Sider } = Layout;

function SideMenu(props) {

  // state
  const [collapsed, setCollapsed] = useState(false);

  // effect
  

  return (
    <>
    <Sider
        className="sider"
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
        style={{ backgroundColor: "#fff" }}
      >
        <div className="logo" onClick={() => setCollapsed(!collapsed)} />

        <Menu
          defaultSelectedKeys={[props.location.pathname.slice(1) || "setting"]}
          mode="inline"
        >
          <Menu.Item key="comic" icon={<ReadOutlined />}>
            <NavLink to="/comic">COMIC</NavLink>
          </Menu.Item>
          <Menu.Item key="music" icon={<PlayCircleOutlined />}>
            <NavLink to="/music">MUSIC</NavLink>
          </Menu.Item>
          <Menu.Item key="setting" icon={<SettingOutlined />}>
            <NavLink to="/setting">设置</NavLink>
          </Menu.Item>
        </Menu>
        
      </Sider>
    </>
  );
}

export default withRouter(SideMenu);
