import React from "react";
import { Card } from "antd";
import "./index.less";

export default function myCard(props) {
  return (
    <Card className="card" title={props.title} bordered={false} hoverable>
      {props.children}
    </Card>
  );
}
