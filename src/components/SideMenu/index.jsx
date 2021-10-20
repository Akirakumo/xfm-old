import React, { useState, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Menu } from "antd";
import {
  ReadOutlined,
  PlayCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";

function SideMenu(props) {
  return (
    <>
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
    </>
  );
}

export default withRouter(SideMenu);
