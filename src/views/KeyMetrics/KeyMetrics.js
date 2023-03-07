import React from "react";

export const KeyMetrics = ({data}) => {
    return <div className='keyMetrics'>
        {data.map((line)=>{
            console.log(line)
            return <div className='keyMetricsBox'>
                {Object.entries(line.metrics).map(([metricName, metric])=><div className='keyMetric' style={{ color: line.color }}>{metricName}: {metric}</div>)}
            </div>
        })}

    </div>
}