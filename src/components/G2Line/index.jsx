import React, { useContext, useState, useEffect, useRef, useCallback } from 'react'
import { Line } from '@antv/g2plot';

let line = null;

export default function G2Line(props) {

    const { data } = props

    console.log('chart',data);

    const chart = useRef()

    useEffect(() => {

        line = new Line( chart.current, {
            data,
            padding: 'auto',
            xField: 'time',
            yField: 'value',
            xAxis: {
                type: 'time',
                mask: 'HH:MM',
            },
            yAxis: {
                min: 0,
                max: 100
            },
            smooth: true,
        });

        line.render();

    }, [])


    useEffect(() => {

        line.changeData(data);

    }, [data])



    return (
        <div ref={chart} style={{ width: '100%', height: '100%' }}>
        </div>
    )
}

