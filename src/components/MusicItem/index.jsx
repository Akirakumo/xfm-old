import React from "react";
import { Card } from "antd";
import "./index.less";

export default function MusicItem(props) {
  return (
    <Card
      className="music-item"
      title={props.title}
      cover={props.cover}
      bordered={false}
      hoverable
    >
      {props.children}
    </Card>
  );
}
