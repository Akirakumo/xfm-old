import React, { useState, useEffect, useContext } from "react";
import { List, Image, Breadcrumb } from "antd";
import { get, path } from "../../ajax";
import MusicItem from "../MusicItem";
import "./index.less";

export default function Music() {
  const [dirData, setDirData] = useState([]);
  const [openMusicDir, setopenMusicDir] = useState("");

  useEffect(() => {
    // 获取文件夹数据
    get("/getDirData", {
      type: "music",
    })
      .then((res) => {
        console.log(res);
        setDirData(res);
      })
      .catch((err) => {
        console.error(err);
      });
    return () => {
      console.log("music关闭");
    };
  }, []);

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Music</Breadcrumb.Item>
        <Breadcrumb.Item>{openMusicDir}</Breadcrumb.Item>
      </Breadcrumb>
      <List
        itemLayout="vertical"
        size="large"
        grid={{ gutter: 0, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }}
        pagination={{
          position: "both",
          onChange: (page) => console.log(page),
          defaultPageSize: 50,
        }}
        dataSource={dirData}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <MusicItem
              title={item.name}
              cover={
                <div src={`${path}${item.cover}`} />
              }
            ></MusicItem>
          </List.Item>
        )}
      />
    </>
  );
}
