import React, { useState } from "react";

export const ProgressBar = (props) => {
    const [counter, setCounter] = useState(0);
    if (counter < props.progress) {
        setTimeout(() => {
            setCounter(counter + 1);
        }, 50);
    }
    return ( 
        <div className="progress-outer">
            <span className="progress-text">{counter}%</span>
            <div className="progress-inner" style={{ width: `${counter}%`}}></div>
        </div>
    );
}