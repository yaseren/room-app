import React, { useRef, useState, useEffect } from 'react';
import $ from 'jquery';
import Janus from '../utils/janus';
import { AttchPublisherHandler } from '../utils/publisher';
import { subscribeRemoteFeed, sendData } from '../utils/subscriber';
import JanusPlayer from './JanusPlayer';
import { CleaningServices } from '@mui/icons-material';
//import JanusChat from './JanusChat';

const JanusSubscriber = ({ janus, opaqueId, room, pubId, pubPvtId, children , subscribeList }) => {
    const videoArea = useRef(null);
    const [playerState, setPlayerState] = useState("Ready");
    const [sfutest, setSfuTest] = useState(null);
    const [remoteFeed, setRemoteFeed] = useState(null);

    let remoteStream = null;

    const remoteFeedCallback = (_remoteFeed, eventType, data) => {
        setRemoteFeed(_remoteFeed);
        if(eventType === "onremotestream"){
            remoteStream = data;
            const videoContainer = videoArea.current;
            const videoPlayer = videoContainer.querySelector(".janus-video-player")
            console.log("remoot Stream ==>>",data);
            Janus.attachMediaStream(videoPlayer, remoteStream);
            if (_remoteFeed.webrtcStuff.pc.iceConnectionState !== "completed" &&
            _remoteFeed.webrtcStuff.pc.iceConnectionState !== "connected") {
                setPlayerState("Live");
            }
            var videoTracks = remoteStream.getVideoTracks();
            if (videoTracks === null || videoTracks === undefined || videoTracks.length === 0) {
                setPlayerState("Error");
            }
        }else if(eventType === "oncleanup"){
            setPlayerState("Paused");
        }else if(eventType === "error"){
            setPlayerState("Error");
        }
    }
    
     useEffect(()=>{
        console.log("----------janus subscriber component useEffect executed");
        if(subscribeList.length>0){
            let publisher = subscribeList[0];
            console.log("publisher to register ",publisher);
            const { id, display, audio_codec, video_codec} = publisher;
            subscribeRemoteFeed(janus, opaqueId, room, publisher, remoteFeedCallback); 
        }
                  

    },[subscribeList])

    const playerElement = children ? children : <JanusPlayer />;
    
    return (
        <div className="janus-subscriber">
            <div className="janus-video">
                { React.cloneElement(playerElement, { 
                    ref: videoArea,
                    isPublisher: false,
                    status: playerState
                }) }
                {/* <JanusPlayer 
                    ref={videoArea}
                    isPublisher={false}
                    status={playerState}
                /> */}
            </div>
        </div>
    )
};

export default JanusSubscriber;