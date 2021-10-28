import React, { useState, useEffect, useCallback, useContext } from 'react';
import { List, Drawer, Button, Row, Col, Slider, Collapse  } from 'antd';

// redux
import { connect } from 'react-redux'

// useContext
// import { AppContext } from '../../context'

import ListCardItem from '../ListCardItem'
import { get } from '../../ajax'

import './index.less'


// UI组件
function Comic(props) {

  const { gutter, vgutter, column } = props.grid

  // state
  const [comicData, setComicData] = useState([])

  // effect
  useEffect(() => {
    
    get('/getDirData', { type: 'comic'} )
    .then( res => {
      console.log('comicData', res)
      setComicData(res)
    })
    .catch( err => console.error(err))

  }, [])


  return (
    <>
    <div className="comic">
      <List
        // sitemLayout="vertical"
        // size="small"
        grid={{ gutter:[gutter,vgutter], column }}
        // 分页器
        pagination={{
          // 只有一页时隐藏分页器
          // hideOnSinglePage: true,
          size: "small",
          showSizeChanger: true,
          showQuickJumper: true,
          position: "both",
          // 每页默认条数
          defaultPageSize: 20,
          // 点击翻页事件
          onChange: (page) => console.log(page),
        }}
        // 列表数据
        dataSource={ comicData }
        // 列表项目
        renderItem={ item => (
          <List.Item key={item._id}>
            <ListCardItem item={item} />
          </List.Item>
        )}
      />
    </div>
    </>
  )
}

// 容器组件
export default connect(
  // 映射状态
  state => ({ grid: state.grid })
  // 映射action
)(Comic)
