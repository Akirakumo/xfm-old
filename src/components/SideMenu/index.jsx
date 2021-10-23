import React, { useState, useEffect, useMemo, useCallback } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import { BookOutlined, ReadOutlined, PlayCircleOutlined, SettingOutlined, FolderOutlined } from "@ant-design/icons";

import { get } from '../../ajax'
import './index.less'

const { Sider } = Layout;

function SideMenu(props) {

  // state
  const [collapsed, setCollapsed] = useState(false);
  const [views, setViews] = useState([])

  // useMemo
  const activeKey = useMemo(() => props.location.pathname.split('/').pop())

  // useCallBack
  const setIcon = useCallback(type => {
      switch(type){
        case 'comic':
          return <BookOutlined />
        case 'music':
          return <PlayCircleOutlined />
        case 'ebook':
          return <ReadOutlined />
        default:
          return <FolderOutlined />
      }
    },[])

  // effect
  useEffect( () => {

    // 获取menu项目
    get('/views')
    .then( res => {
      setViews(res)
    })
    .catch( err => {
      console.log(err);
    })

  },[])

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
          defaultSelectedKeys={activeKey}
          mode="inline"
        >
          {
            views.map( item => {
              return <Menu.Item key={item.name} icon={ setIcon(item.type) }>
                      <NavLink to={{pathname:`/home/view/${item.name}`,state:item}}>{item.name}</NavLink>
                    </Menu.Item>
            })
          }
          <Menu.Item key='setting' icon={<SettingOutlined />}>
            <NavLink to="/home/setting">设置</NavLink>
          </Menu.Item>
        </Menu>
        
      </Sider>
    </>
  );
}

export default withRouter(SideMenu);
