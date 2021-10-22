import React, { useContext, useState, useEffect, useRef } from 'react'
import { Typography, Card, Row, Col } from 'antd'
import io from 'socket.io-client'
import * as echarts from 'echarts';
// 引入柱状图图表，图表后缀都为 Chart
import { LineChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  DatasetComponentOption,
  TransformComponent
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

import { AppContext, UPDATA_USERNAME } from "../../context";
import { get, req_path } from "../../ajax";

import './index.less'


const { Title, Paragraph, Text } = Typography;
let cpuChart = null;

// 创建socket
const socket = io( req_path, { autoConnect: false });

export default function InfoCenter() {

  // context
  const { state: { userName }, dispatch } = useContext(AppContext)

  // state
  const [sysInfo, setSysInfo ] = useState(null)
  const [times, setTims] = useState(new Array(40).fill(''))
  const [cpuUsage, setCpuUsage ] = useState([0])
  const [memUsage, setMemUsage ] = useState([0])


  // ref
  const cpu = useRef()
  const mem = useRef()
  

  // effect
  useEffect(() => {
    
    // 获取系统信息
    get('/sysInfo')
    .then( res => {
      console.log(res)
      setSysInfo(res)
    })
    .catch( err => {
      console.error(err)
    })

      // 手动开启socket连接
      socket.open()
      socket.on('system info', msg => {
        setCpuUsage( cpuUsage => {
          if(cpuUsage.length >= 40) cpuUsage.unshift()
          return [msg.cpuUsage, ...cpuUsage]
        })
        setMemUsage( memUsage => {
          if(memUsage.length >= 40) memUsage.unshift()
          return [msg.memUsage, ...memUsage]
        })
      });

    // 基于准备好的dom，初始化echarts实例
    if( cpuChart != null ) cpuChart.dispose()
    cpuChart = echarts.init(cpu.current)

    return () => {
      // 断开socket连接
      socket.close()
    }
  }, [])

  // 绘制图表
  useEffect(() => {
    
    // 绘制图表
    cpuChart.setOption({
      legend: {
        data: [
          {
            name: 'cpu',
          },
          {
            name: '内存'
          },
        ],
        bottom: 0
      },
      animation: false,
      xAxis: {
        data: times
      },
      yAxis: {
        boundaryGap: false,
        type: 'value',
        min: 0,
        max: 100
      },
      series: [
        {
          name: 'cpu',
          data: cpuUsage,
          type: 'line',
          symbol: 'none',
          lineStyle: {
            color: '#3af'
          },
          areaStyle: {
            color: '#3af',
            opacity: 0.5
          }
        },
        {
          name: '内存',
          data: memUsage,
          type: 'line',
          symbol: 'none',
          areaStyle: {}
        },
      ]
    }); 
    return () => {
      
    }
  }, [cpuUsage,memUsage])

  return (
    <>
        <Row gutter={[16, 16]} className="sysinfo">
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

              <Paragraph className="card-title"> CPU </Paragraph>
              <div ref={cpu} style={{width:'100%',height:'300px'}}></div>
            </Card>
          </Col>

          <Col span={8}>
            <Card bordered={false} >

              <Paragraph className="card-title"> 内存 </Paragraph>
              
            </Card>
          </Col>

        </Row>
    </>
  );
}
