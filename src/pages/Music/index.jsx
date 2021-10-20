import React, { useState, useEffect, useContext } from "react";
import { List, Image, Breadcrumb } from "antd";
import { AppContext } from "../../context";
import { get, req_path } from "../../ajax";
import MusicItem from "../../components/MusicItem";
import "./index.less";

export default function Music() {
  const [dirData, setDirData] = useState([]);
  const [openMusicDir, setopenMusicDir] = useState("");
  const {
    state: { defaultPic },
  } = useContext(AppContext);

  useEffect(() => {
    console.log("music启动");
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
                <Image src={`${req_path}${item.cover}`} fallback={defaultPic} />
              }
            ></MusicItem>
          </List.Item>
        )}
      />
    </>
  );
}
