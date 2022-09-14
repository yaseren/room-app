import React, { useRef, useState, useEffect } from 'react';

const JanusPlayer = React.forwardRef((
    {
        isPublisher,
        status,
        isMuted,
        onStart,
        onStop,
        onMute,
        onUnmute,
        onBandwidthChange,

        readyText,
        pausedText,
        liveText,
        errorText
    }, ref) => {
    return (
        <div className="janus-video-container" ref={ref}>
            <div className="janus-video-status">
                {status === "Ready" && (
                    <span style={{ color: "grey" }}>{readyText ? readyText : 'Ready'}</span>
                )}
                {status === "Paused" && (
                    <span style={{ color: "grey" }}>{pausedText ? readyText : 'Paused'}</span>
                )}
                {status === "Live" && (
                    <span style={{ color: "green" }}>{liveText ? readyText : 'Live'}</span>
                )}
                {status === "Error" && (
                    <span style={{ color: "red" }}>{errorText ? readyText : 'Error'}</span>
                )}
            </div>
            
           <video
                className="janus-video-player"
                autoPlay
                playsInline
               muted={isPublisher}
                
                />
           
            

            {isPublisher && (
                <div className="janus-video-controls">
                    {status === "Paused" && (
                        <button className="janus-btn" onClick={onStart}>Start</button>
                    )}
                    {status === "Live" && (
                        <button className="janus-btn" onClick={onStop}>Stop</button>
                    )}

                    {status === "Live" && (
                        <React.Fragment>
                            {isMuted && (
                                <button className="janus-btn" onClick={onUnmute}>UnMute</button>
                            )}
                            {!isMuted && (
                                <button className="janus-btn" onClick={onMute}>Mute</button>
                            )}
                        </React.Fragment>
                    )}

                    <div className="janus-select">
                        <select onChange={(e) => { onBandwidthChange(parseInt(e.target.value) * 1000) }}>
                            <option value={0}>اتوماتیک</option>
                            <option value={128}>پایین</option>
                            <option value={512}>متوسط</option>
                            <option value={1500}>خوب</option>

                        </select>
                    </div>
                </div>
            )}
        </div>
    )
})

export default JanusPlayer;