import React, { Suspense, useCallback, useState, useEffect } from 'react'
import { Drawer, Button, Row, Col, Slider } from "antd";

import Loading from '../../components/Loading'
import Comic from '../../components/ViewComic'
import Music from '../../components/ViewMusic'
import ViewHead from '../../components/ViewHead';
import Search from '../../components/Search';
import GrudSetting from '../../components/GridSetting'

import './index.less'


export default function View(props) {

    const data = props.location.state
    const { type } = data

    const [visible, setVisible] = useState(false)
    

    const open = useCallback( () => setVisible(true) )
    const close = useCallback( () => setVisible(false) )

    const setView = useCallback( type => {
        switch(type){
            case 'comic':
                return <Comic data={data}/>
            case 'music':
                return <Music data={data}/>
            default:
                return <p>DEFAULT</p>
        }
    },[])

    return (
        <>

            <ViewHead />

            {/* <Button type="primary" onClick={open}>Open</Button> */}

            <Search />

            <Suspense fallback={ <Loading /> }>
                {
                    setView(type)
                }
            </Suspense>

            <Drawer
            className="drawer"
            title="Basic Drawer"
            placement="right"
            closable={false}
            onClose={close}
            visible={visible}
            getContainer={false}
            width="500"
            >
                <GrudSetting />
            </Drawer>
 
        </>
    )
}
