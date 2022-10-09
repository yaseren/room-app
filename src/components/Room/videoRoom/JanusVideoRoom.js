import React, { useEffect } from 'react';


const JanusVideoRoom = ({ children, janus, roomId }) => {
    useEffect(() => {
        if(janus){
            
        }
    }, [janus])
    return (
        <>
            {children &&
                children.length && 
                    children.map((child, i) => (
                        React.cloneElement(child, { janus: janus, key: i })
                    ))
            }
            {children &&
                !children.length && 
                    React.cloneElement(children, { janus: janus })
            }
        </>
    );
}

export default JanusVideoRoom