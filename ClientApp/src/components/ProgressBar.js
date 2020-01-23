import React from "react";

export const ProgressBar = props => (
    <p>
        <div className="progress-outer">
            <div className="progress-inner" style={{ width: `${props.progress}%`}}></div>
        </div>
    </p>
)