import React, { useEffect, useRef } from 'react'

import * as echarts from 'echarts';

export default function BarChr(props) {
    const homeRef = useRef();
    useEffect(() => {
        const chartDom = homeRef.current;
        const myChart = echarts.init(chartDom);

        const option = {
            title: {
                text: props.title,
                subtext: props.subtext
            },
            xAxis: {
                type: 'category',
                data: props.xAxisData
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: props.seriesData,
                    type: 'bar'
                }
            ]
        };
        option && myChart.setOption(option);
    }, [])

    return (
        <div ref={homeRef} style={{width: "400px", height: "480px", position: "absolute", left: props.left}} ></ div>
    )
}
