import React, { Suspense, useCallback, useState } from 'react'
import { Drawer, Button } from "antd";

import Loading from '../../components/Loading'
import Comic from '../../components/ViewComic'
import Music from '../../components/ViewMusic'

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

            <Button type="primary" onClick={open}>Open</Button>

            <Suspense fallback={ <Loading /> }>
                {
                    setView(type)
                }
            </Suspense>

            <Drawer
            title="Basic Drawer"
            placement="right"
            closable={false}
            onClose={close}
            visible={visible}
            getContainer={false}
            style={{ position: 'absolute' }}
            >
            <p>内容</p>
            </Drawer>
 
        </>
    )
}
