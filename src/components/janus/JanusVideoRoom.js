import React, { useRef, useState, useEffect ,forwardRef, createRef} from 'react';
import Janus from './utils/janus';

const JanusVideoRoom =forwardRef(({ children, janus, roomId },ref) => {
    useEffect(() => {
        if(janus){
            
        }
    }, [janus])
    const _ref=createRef();
     
    return (
        <div className="janus-video-room" ref={_ref}>
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
        </div>
    );
})

export default JanusVideoRoom