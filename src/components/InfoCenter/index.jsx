import React, { useContext, useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Typography, Card, Row, Col, Collapse, Button  } from 'antd'
import { SettingOutlined } from '@ant-design/icons';
import io from 'socket.io-client'

import EChartLine from '../EChartLine';
import G2Line from '../G2Line';
import ViewSetting from '../ViewSetting'
import { get, path } from "../../ajax";

import './index.less'


const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const genExtra = () => (
  <SettingOutlined
    onClick={ e => {
      e.stopPropagation();
      console.log('打开编辑');
    }}
  />
);

// 创建socket
const socket = io( path, { autoConnect: false });

export default function InfoCenter() {

  // state
  const [sysInfo, setSysInfo ] = useState(null)
  const [usage, setUsage] = useState({cpuUsage:0,memUsage:0})
  const [chartData, setChartData] = useState([{time:new Date().getTime(),value:0}])

  useEffect ( () => {

    const time = new Date().getTime();
    setChartData( chartData => {
      if( chartData.length < 10 ) {
        return [...chartData, { time, value: usage.cpuUsage }]
      } else {
        return chartData.slice(1).concat({ time, value: usage.cpuUsage })
      }
    })

  },[usage])

  // callback
  const viewSetting = useCallback( () => {
    return <ViewSetting />
  },[])
  
  // effect
  useEffect(() => {
    
    // 获取系统信息
    get('/sysInfo')
    .then( res => {
      setSysInfo(res)
    })
    .catch( err => {
      console.error(err)
    })

    // 手动开启socket连接
    socket.open()
    socket.on('system info', msg => {
      setUsage(msg)
    })

    return () => {      
      // 断开socket连接
      socket.close()
    }
  }, [])

  return (
    <>
        <Row gutter={[16, 16]} className="info-center">
          <Col span={8}>
            <Card bordered={false}>
              <Paragraph className="card-title"> 服务器信息 </Paragraph>
              {
                sysInfo != null ? (
                  <>
                    <p className="card-lable">计算机名称</p>
                    <Paragraph>{sysInfo.hostname}</Paragraph>
                    <p className="card-lable">系统</p>
                    <Paragraph>{`${sysInfo.os} ${sysInfo.arch}`}</Paragraph>
                    <p className="card-lable">CPU</p>
                    <Paragraph>{sysInfo.cpus[0].model}</Paragraph>
                    <p className="card-lable">核心数</p>
                    <Paragraph>{sysInfo.cpus.length}</Paragraph>
                    <p className="card-lable">内存</p>
                    <Paragraph>{sysInfo.totalmem + 'G'}</Paragraph>
                    {/* 
                    <p className="card-lable">地址</p>
                    <Paragraph>{sysInfo.network['WLAN 2'][1].address}</Paragraph> 
                    */}
                  </>
                ) : <p>无</p>
              }
            </Card>
          </Col>
          
          <Col span={8}>
            <Card bordered={false} >
              <Paragraph className="card-title"> CPU/内存 </Paragraph>
              <div style={{width:'100%',height:'300px'}}>
                {/* <G2Line data={chartData} /> */}
                <EChartLine data={usage} />
              </div>
              
            </Card>
          </Col>

          <Col span={8}>
            <Card bordered={false} >
              <Paragraph className="card-title"> 内存 </Paragraph>
            </Card>
          </Col>
          
          <Col span={8}>
            <Card 
              className="card-item-manager"
              bordered={false} 
              title="项目管理"
              extra={<Button type="link" onClick={ viewSetting }>新增</Button>}>
              <Collapse
                className="item-manager-list"
                bordered={false}
                onChange={()=>console.log('change')}
              >
                <Panel header="COMIC" key="1" extra={ genExtra() }>
                  <div>111</div>
                </Panel>
                <Panel header="MUSIC" key="2" extra={ genExtra() }>
                  <div>111</div>
                </Panel>
              </Collapse>
            </Card>
          </Col>
        </Row>
    </>
  );
}
