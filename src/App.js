import React, {useMemo} from "react";
import MultilineChart from "./views/MultilineChart";
import trajectoires from './trajectoires.json'
import "./styles.css";
import Legend from "./views/Legend/Legend";
import {KeyMetrics} from "./views/KeyMetrics/KeyMetrics";

const colors = ["#ffffff", "#d53e4f", "#5e4fa2", "rgba(26, 137, 23, 1)", "#32557f"]

const dimensions = {
  width: 1400,
  height: 600,
  margin: {
    top: 30,
    right: 30,
    bottom: 30,
    left: 60
  }
};

export default function App() {
  const generateData = () => {
    return trajectoires.map((line, index)=>{
        const sortedLines = line.points.sort((a,b)=>a.time-b.time)
        return ({
            name: line.id,
            color: colors[index],
            items: sortedLines,
            metrics: sortedLines.reduce((acc,curr, index, currArr)=>{
                acc["Average speed"] += Number(Math.pow(curr.x**2+curr.y**2,1/2).toFixed(2))
                    acc["Total time"] += curr.time
                if(!currArr[index+1]) {

                    acc["Average speed"] = (acc["Average speed"] / acc["Total time"]).toFixed(5)
                } else if(currArr[index+1].x === curr.x && currArr[index+1].y === curr.y) {
                    acc["Stops"]++
                }
                return acc
            },{
                "Stops": 0,
                "Total time": 0,
                "Average speed": 0
            })
        })
    })
  }

  const data = useMemo(()=>generateData(),[trajectoires])

  return (
    <div className="App">
      <Legend
          data={data}
      />
      <MultilineChart
        data={data}
        dimensions={dimensions}
      />
      <KeyMetrics
        data={data}
      />
    </div>
  );
}
