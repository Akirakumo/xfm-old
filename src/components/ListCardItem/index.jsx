import React, { useState, useEffect, useContext } from "react";
import { Card, Image, Space, Tag  } from "antd";
import { MessageOutlined, StarOutlined, EditOutlined } from "@ant-design/icons";

import "./index.less"

const { Meta } = Card;
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default function ListCardItem (props) {

    const { fileName, cover } = props.item;

    return (
        <Card
          className="list-card-item"
          hoverable
          cover={
            <div className="card-cover" style={{backgroundImage:`url(${cover})`}}/>
            // src={cover} fallback={ defaultPic } preview={false}
          }
          actions={[
            <IconText icon={StarOutlined} key="list-vertical-star-o" />,
            // <IconText icon={MessageOutlined} text="0" key="list-vertical-message" />,
            <EditOutlined key="edit" />,
          ]}
        >
          <p className="list-card-item-title">{fileName}</p>

          <Tag className="list-card-item-tag" color="#999">COMIC</Tag>
          <Tag className="list-card-item-tag" color="#ff972a">COMIC</Tag>

        </Card>
    )
}