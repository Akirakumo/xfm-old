import React from 'react'
import { PageHeader, Menu, Dropdown, Button, Tag, Typography, Row } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { 
    BookOutlined, 
  } from "@ant-design/icons";

import './index.less'

const { Paragraph } = Typography;

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

const DropdownMenu = () => (
  <Dropdown key="more" overlay={menu}>
    <Button
      style={{
        border: 'none',
        padding: 0,
      }}
    >
      <EllipsisOutlined
        style={{
          fontSize: 20,
          verticalAlign: 'top',
        }}
      />
    </Button>
  </Dropdown>
);

const routes = [
  {
    path: '/view/COMIC',
    breadcrumbName: 'COMIC',
  }
  
];

const IconLink = ({ src, text }) => (
  <a className="example-link">
    <img className="example-link-icon" src={src} alt={text} />
    {text}
  </a>
)


export default function ViewHead () {

    return (
    <>
        <PageHeader
        title={<>
            <BookOutlined />
            {'COMIC'}
        </>}
        className="view-header"
        subTitle="view and edit"
        tags={
        <>
            <Tag color="blue">标签1</Tag>
            <Tag color="yellow">标签2</Tag>
        </>}
        extra={[
            <Button key="3">调整大小</Button>,
            <Button key="2">Operation</Button>,
            <Button key="1" type="primary">按钮1</Button>,
            <DropdownMenu key="more" />,
        ]}
        // 面包屑导航
        breadcrumb={{ routes }}
        >
            <IconLink
                src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
                text="Quick Start"
            />
            <IconLink
                src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
                text=" Product Info"
            />
            <IconLink
                src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
                text="Product Doc"
            />
        </PageHeader>
        </>
    )
}