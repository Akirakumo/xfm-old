import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'antd';
import {
  ReadOutlined,
  DesktopOutlined,
  MailOutlined,
} from '@ant-design/icons';

export default function SideMenu () {

    return (
        <>
            <Menu theme="dark" defaultSelectedKeys={['setting']} mode="inline">
                <Menu.Item key="1" icon={<ReadOutlined />}>
                    <NavLink to='/comic'>COMIC</NavLink>
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                    <NavLink to='/asmr'>ASMR</NavLink>
                </Menu.Item>
                <Menu.Item key="3" icon={<MailOutlined />}>
                    <NavLink to='/music'>Music</NavLink>
                </Menu.Item>
                <Menu.Item key="setting" icon={<MailOutlined />}>
                    <NavLink to='/setting'>设置</NavLink>
                </Menu.Item>
            </Menu>
        </>
    )
}