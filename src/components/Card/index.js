import React from 'react'
import { Card } from 'antd'
import './index.css'

export default function myCard (props) {
    return (
        <Card className="card" title={props.title} bordered={false}>
            {props.children}
        </Card>
    )
}