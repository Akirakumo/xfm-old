import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
// 引入柱状图图表，图表后缀都为 Chart
import { LineChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  DatasetComponentOption,
  TransformComponent
} from 'echarts/components'
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

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
])

let chart = null;

export default function ChartLine(props) {

    const { data } = props

    const chartContainer = useRef()

    const [cpuUsage, setCpuUsage ] = useState([0])
    const [memUsage, setMemUsage ] = useState([0])
    const [times, setTims] = useState(new Array(40).fill(''))

    useEffect(() => {
        // 初始化chart实例
        if( chart != null ) chart.dispose()
        chart = echarts.init(chartContainer.current)
        return () => {
            if( chart != null ) chart.dispose()
        }
    }, [])

    useEffect( () => {
        if ( data != null ) {
            setCpuUsage( cpuUsage => {
                if(cpuUsage.length >= 40) cpuUsage.unshift()
                return [data.cpuUsage, ...cpuUsage]
            })
            setMemUsage( memUsage => {
                if(memUsage.length >= 40) memUsage.unshift()
                return [data.memUsage, ...memUsage]
            })
        }
    },[data])

      // 绘制图表
    useEffect(() => {
        // 绘制图表
        chart.setOption({
            legend: {
                data: [{
                    name: 'cpu',
                },
                {
                    name: '内存'
                }],
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
        })
    }, [cpuUsage,memUsage])

    return (
        <>
            <div ref={chartContainer} style={{width:'100%',height:'100%'}}></div>
        </>
    )
}
