import React, { useState, useEffect, useContext } from "react";
import { List } from "antd";
import { get } from "../../ajax";
import ListCardItem from "../../components/ListCardItem"
import "./index.less";


export default function Comic() {

  // state
  const [dirList, setDirList] = useState([]);

  // effect
  useEffect(() => {

    console.log("comic启动");

    get("/getDirData", {
      type: "comic",
    })
      .then((res) => {
        console.log("dirList", res);
        setDirList(res);
      })
      .catch((err) => console.error(err));

    return () => {
      console.log("comic关闭");
    };
  }, []);

  return (
    <List
      // sitemLayout="vertical"
      // size="large"
      grid={{ gutter: 8, xs: 1, sm: 2, md: 3, lg: 4, xl: 6, xxl: 8 }}
      // 分页器
      pagination={{
        // 只有一页时隐藏分页器
        hideOnSinglePage: true,
        size: "small",
        showSizeChanger: true,
        showQuickJumper: true,
        position: "both",
        // 每页默认条数
        defaultPageSize: 16,
        // 点击翻页事件
        onChange: (page) => console.log(page),
      }}
      // 列表数据
      dataSource={ dirList }
      // 列表项目
      renderItem={ item => (
        <List.Item key={item._id}>
          <ListCardItem item={item} />
        </List.Item>
      )}
    />
  );
}
