import React, { useRef, useState, useEffect } from 'react';

import $ from 'jquery';
import Janus from '../utils/janus';
import { AttchPublisherHandler } from '../utils/publisher';
import { subscribeRemoteFeed, sendData } from '../utils/subscriber';
import JanusPlayer from './JanusPlayer';

import VideoPlayer from './VideoPlayer';
import VideoJS from "./VideoJs";
import { CleaningServices } from '@mui/icons-material';
import { browser } from 'detectrtc';
//import JanusChat from './JanusChat';

const JanusSubscriber = ({ janus, opaqueId, room, pubId, pubPvtId, children, subscribeList }) => {
    const videoArea = useRef(null);
    const playerRef = React.useRef(null);

   // const videoPlayer = useRef(null);

    const [playerState, setPlayerState] = useState("Ready");
    const [sfutest, setSfuTest] = useState(null);
    const [remoteFeed, setRemoteFeed] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);


    const remoteFeedCallback = (_remoteFeed, eventType, data) => {
        setRemoteFeed(_remoteFeed);
        if (eventType === "onremotestream") {
            setRemoteStream(data);
           // const videoContainer = videoArea.current;
            //const videoPlayer = videoContainer.querySelector(".janus-video-player")
            console.log("remoot Stream ==>>", data);
           // Janus.attachMediaStream(videoPlayer, remoteStream);
           console.log("get tracks",data.getTracks());
          
            setPlayerState("play");
            if (_remoteFeed.webrtcStuff.pc.iceConnectionState !== "completed" &&
                _remoteFeed.webrtcStuff.pc.iceConnectionState !== "connected") {
                setPlayerState("Live");
            }
            var videoTracks = remoteStream.getVideoTracks();
            if (videoTracks === null || videoTracks === undefined || videoTracks.length === 0) {
                setPlayerState("Error");
            }
        } else if (eventType === "oncleanup") {
            setPlayerState("Paused");
        } else if (eventType === "error") {
            setPlayerState("Error");
        }
    }

    useEffect(() => {
        console.log("----------janus subscriber component useEffect executed");
        if (subscribeList.length > 0) {
            let publisher = subscribeList[0];
            console.log("publisher to register ", publisher);
            const { id, display, audio_codec, video_codec } = publisher;
            subscribeRemoteFeed(janus, opaqueId, room, publisher, remoteFeedCallback);
        }


    }, [subscribeList])

    const playerElement = children ? children : <JanusPlayer />;



    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        muted:true,
        // liveui:true,
        sources: [{
            src: null,
            type: 'video/vp9'
        }]
      };
    
      const handlePlayerReady = (player) => {
        playerRef.current = player;
    
        // You can handle player events here, for example:
        player.on('waiting', () => {
          console.log('player is waiting');
        });
    
        player.on('dispose', () => {
            console.log('player will dispose');
        });
      };



    return (
        // <div className="janus-subscriber">
        //     <div className="janus-video">
        //         { React.cloneElement(playerElement, { 
        //             ref: videoArea,
        //             isPublisher: false,
        //             status: playerState,
        //             remoteStream
        //         }) }
        //         {/* <JanusPlayer 
        //             ref={videoArea}
        //             isPublisher={false}
        //             status={playerState}
        //         /> */}
        //     </div>
        // </div>
        <>
            {remoteStream != null ? (

                // <VideoPlayer 
                // stream={remoteStream}
                // />
                <VideoJS options={videoJsOptions } onReady={handlePlayerReady} />
            ) : null}
        </>

    )
};

export default JanusSubscriber;