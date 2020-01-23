import React from "react";
import { Progress } from "reactstrap";

export const ProgressBar = props => (
    <p>
        [
            {
                Array(100).fill('_').fill('x', 0, props.progress).map(val=> (
                    <span>{val}</span>
                ))
            }
        ]
    </p>
)