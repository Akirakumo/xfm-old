import React, { useState, useRef, useCallback } from "react";
import { Tabs, Button } from "antd";
import "./index.less";
const { TabPane } = Tabs;

export default function TopTabs(props) {
  let [panes, setPanes] = useState([
    {
      title: "COMIC",
      content: (
        <div>
          <Button onClick={() => add()}>ADD</Button>
        </div>
      ),
      key: "1",
      closable: false,
    },
  ]);
  let [activeKey, setActiveKey] = useState("1");
  let useKeys = useRef(1);

  const onEdit = (targetKey, action) => {
    switch (action) {
      case "remove":
        remove(targetKey);
        break;
      default:
        return;
    }
  };

  const remove = useCallback(
    (targetKey) => {
      let lastIndex;
      panes.forEach((pane, i) => {
        if (pane.key === targetKey) lastIndex = i - 1;
      });
      setPanes((panes) => panes.filter((pane) => pane.key !== targetKey));
      if (panes.length && activeKey === targetKey) {
        lastIndex >= 0
          ? setActiveKey(panes[lastIndex].key)
          : setActiveKey(panes[0].key);
      }
    },
    [panes, activeKey]
  );

  const add = useCallback(() => {
    const key = (++useKeys.current).toString();
    setPanes((panes) => [
      ...panes,
      { title: `newTab${key}`, content: "New Tab Pane", key, closable: true },
    ]);
    setActiveKey(key);
  }, [panes]);

  return (
    <>
      <Tabs
        size="large"
        animated
        hideAdd
        onChange={(activeKey) => setActiveKey(activeKey)}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
      >
        {panes.map((pane) => (
          <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
            {pane.content}
          </TabPane>
        ))}
      </Tabs>
    </>
  );
}
