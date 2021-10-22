import React, { useContext, useState, useEffect } from "react";
import { Typography, Divider, List, Card, Tabs,  Button, Switch } from "antd";
import { UserOutlined, HighlightOutlined, SmileOutlined, SmileFilled, } from "@ant-design/icons";

import { AppContext, UPDATA_USERNAME } from "../../context";
import InfoCenter from "../../components/InfoCenter";

import "./index.less";

const { TabPane } = Tabs;
const { Title, Paragraph, Text } = Typography;

export default function Setting() {

  // context
  const { state: { userName }, dispatch } = useContext(AppContext)



  // state

  const [path, setPath] = useState("D:/Storage/")

  // effect
  useEffect(() => {

    return () => {
      
    }
  }, [])

  return (
    <>
    <Tabs className="tabs" defaultActiveKey="1" size="large">
      <TabPane className="tab-pane" tab="信息中心" key="1">
        <InfoCenter />
      </TabPane>
      <TabPane className="tab-pane" tab="后台服务" key="2">
        <Card title="后台服务" className="card">
          <Button>查看日志</Button>
          <Divider />
          <Button>重启后台监视器</Button>
          <Divider />
          <Button>清理临时文件夹</Button>
          <Divider />
          <Button>清理数据库</Button>
          <Divider />
          <Button danger>重置数据库</Button>
        </Card>
      </TabPane>
    </Tabs>
    </>
  );
}
