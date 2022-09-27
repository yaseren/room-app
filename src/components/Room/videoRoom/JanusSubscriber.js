import React, { useState, useEffect } from 'react';

import { subscribeRemoteFeed, sendData } from '../utils/subscriber';
import VideoPlayer from './VideoPlayer';
import VideoGrid from './grids/VideoGrid';


const JanusSubscriber = ({ janus, opaqueId, room, pubId, pubPvtId, children, subscribeList }) => {
  

    
    const [remoteFeed, setRemoteFeed] = useState(null);
    const [remoteStream, setRemoteStream] = useState([]);


    const remoteFeedCallback = (_remoteFeed, eventType, data) => {
        setRemoteFeed(_remoteFeed);
        if (eventType === "onremotestream") {
            setRemoteStream(data);
           // const videoContainer = videoArea.current;
            //const videoPlayer = videoContainer.querySelector(".janus-video-player")
            console.log("remoot Stream ==>>", data);
           // Janus.attachMediaStream(videoPlayer, remoteStream);
           console.log("get tracks",data.getTracks());
          
            if (_remoteFeed.webrtcStuff.pc.iceConnectionState !== "completed" &&
                _remoteFeed.webrtcStuff.pc.iceConnectionState !== "connected") {
              
            }
            var videoTracks = remoteStream.getVideoTracks();
            if (videoTracks === null || videoTracks === undefined || videoTracks.length === 0) {
               
            }
        } else if (eventType === "oncleanup") {
         
        } else if (eventType === "error") {
          
        }
    }

    useEffect(() => {
        console.log("----------janus subscriber component useEffect executed: ",subscribeList);
        if ( subscribeList.length>0) {
            let publisher = subscribeList[0];
            console.log("publisher to register ", publisher);
            const { id, display, audio_codec, video_codec } = publisher;
            subscribeRemoteFeed(janus, opaqueId, room, publisher, remoteFeedCallback);
        }


    }, [subscribeList])


    return (
        <>
            {remoteStream != null ? (
                <VideoGrid  sources={[remoteStream]} />
            ) : null}
        </>

    )
};

export default JanusSubscriber;