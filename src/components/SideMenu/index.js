import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

export default function SideMenu () {

    return (
        <>
            <Menu
            defaultSelectedKeys={['1']}
            mode="inline"
            theme="dark"
            >
            <Menu.Item key="1" icon={<PieChartOutlined />}>
                <NavLink activeClassName="on" to='/comic' className="nav-title">COMIC</NavLink>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
                <NavLink activeClassName="on" to='/asmr' className="nav-title">ASMR</NavLink>
            </Menu.Item>
            <Menu.Item key="3" icon={<MailOutlined />}>
                <NavLink activeClassName="on" to='/music' className="nav-title">Music</NavLink>
            </Menu.Item>
            </Menu>
        </>
    )
}