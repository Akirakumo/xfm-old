import React, { Suspense, useCallback, useState, useEffect, useContext } from 'react'
import { Slider, Radio } from 'antd'
// redux
import { connect } from 'react-redux'
import { 
    updataGutter, 
    updataVGutter, 
    updataColumn, 
    updataComponentSize
} from '../../redux/actions/grid'

// useContext
// import { AppContext } from '../../context'
// import { 
//     UPDATA_GUTTER,
//     UPDATA_VGUTTER,
//     UPDATA_COLUMN
// } from '../../context/constant'

// 样式
import './index.less'


function GrudSetting(props) {

    const onGutterChange = useCallback( v => props.updataGutter(v))
    const onVGutterChange = useCallback( v => props.updataVGutter(v))
    const onColumnChange = useCallback( v => props.updataColumn(v))
    // const setComponentSize = useCallback( v => props.updataComponentSize(v))

    const { gutter, vgutter, column } = props.grid

    return (
        <>
            <div className="size-radio">
                <p>项目大小: </p>
                <Radio.Group
                // value={componentSize}
                // onChange={e => setComponentSize(e.target.value)}
                >
                    <Radio.Button value="small">Small</Radio.Button>
                    <Radio.Button value="middle">Middle</Radio.Button>
                    <Radio.Button value="large">Large</Radio.Button>
                </Radio.Group>
            </div>
            
            <span>列间距 (px): </span>
            <Slider 
            min={0}
            max={100}
            defaultValue={gutter}
            onChange={onGutterChange}
            />

            <span>行间距 (px): </span>
            <Slider
            min={0}
            max={100}
            defaultValue={vgutter}
            onChange={onVGutterChange}
            />

            <span>一行显示的数量:</span>
            <Slider
            min={0}
            max={30}
            defaultValue={column}
            onChange={onColumnChange}
            />

        </>
    )
}


// 容器组件
export default connect(
    // 映射状态
    state => ({ grid: state.grid }),
    // 映射action
    {
        updataGutter,
        updataVGutter,
        updataColumn
    }
)(GrudSetting)
