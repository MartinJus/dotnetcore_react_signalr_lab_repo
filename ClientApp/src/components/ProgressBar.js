import React from "react";

export const ProgressBar = (props) => {
    return ( 
        <div className="progress-outer">
            <span className="progress-text">{props.progress}%</span>
            <div className="progress-inner" style={{ width: `${props.progress}%`}}></div>
        </div>
    );
}