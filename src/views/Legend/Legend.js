import React from "react";

const Legend = ({ data }) => (
    <div className="legendContainer">
        {data.map((d) => (
            <div className="checkbox" style={{ color: d.color }} key={d.name}>
                <label>{d.name}</label>
            </div>
        ))}
    </div>
);

export default Legend;