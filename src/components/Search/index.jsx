import React, { useState, useEffect, useCallback, useContext } from 'react';
import { List, Drawer, Button, Row, Col, Collapse  } from 'antd';

import GrudSetting from '../GridSetting'

import './index.less'

const { Panel } = Collapse;

export default function Search() {

    const onCollapseChange = useCallback( key => {
        console.log(key);
    })
  
    return (
        <>
            <Collapse 
            className="view-head-search"
            onChange={onCollapseChange}
            bordered={false}
            >
                <Panel header="搜索" key="1">
                    
                </Panel>
                <Panel header="调整大小" key="2">
                    <GrudSetting />
                </Panel>
            </Collapse>
        </>
    )
}
