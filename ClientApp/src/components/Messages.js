import React from 'react';

export const Messages = props => (
<>
    <h2>Messages</h2>
    <>
        {
            props.messages.map((messageObj, index) => (
                <p key={"Message_" + index}>{messageObj.time + ", " + messageObj.message}</p>
            ))
        }
    </>
</>
);