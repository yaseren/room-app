import React, { useRef, useState, useEffect } from 'react';
import Janus from '../utils/janus';
import { AttchPublisherHandler, publishOwnFeed, unpublishOwnFeed, sendData, publishChatroom } from '../utils/publisher';
import JanusPlayer from './JanusPlayer';
//import JanusChat from './JanusChat';

const JanusPublisher = ({ janus, opaqueId, room, secret, pin, username, setRoom,
     setPvtId, setId, children ,publisherHandler,setPublisherHandler ,startPublishsing,
     feedStreams, setFeedStreams }) => {
    const [playerState, setPlayerState] = useState("Ready");
    const [isMuted, setIsMuted] = useState(false);
   // const [publisherHandler, setpublisherHandler] = useState(null);

    const videoArea = useRef(null);
    let mystream = null;
    
    useEffect(() => {
        AttchPublisherHandler(janus, opaqueId, room, secret, pin, username, true,
            (_publisherHandler, eventType, data) => {
               // setpublisherHandler(_publisherHandler);
                setPublisherHandler(_publisherHandler)
                if(eventType === "created"){
                    setRoom(data.room);
                }else if(eventType === "joined"){
                    const { id, private_id} = data;

                    setId(id);
                    setPvtId(private_id);

                    setPlayerState("Paused");
                }else if(eventType === "onlocalstream"){
                    mystream = data;
                    const videoContainer = videoArea.current;
                    const videoPlayer = videoContainer.querySelector(".janus-video-player")
                    feedStreams.push(mystream);
                    setFeedStreams(feedStreams);
                    console.log("Mys streams : ", mystream);
                    Janus.attachMediaStream(videoPlayer, mystream);
                  
                    if (_publisherHandler.webrtcStuff.pc.iceConnectionState !== "completed" &&
                        _publisherHandler.webrtcStuff.pc.iceConnectionState !== "connected") {
                        setPlayerState("Live");
                    }
                    var videoTracks = mystream.getVideoTracks();
                    if (videoTracks === null || videoTracks === undefined || videoTracks.length === 0) {
                        setPlayerState("Error");
                    }
                }else if(eventType === "oncleanup"){
                    setPlayerState("Paused");
                    setIsMuted(false);
                }else if(eventType === "error"){
                    setPlayerState("Error");
                    setIsMuted(false);
                }
            }
        )

    }, [janus])

    useEffect(()=>{

    },[])

    const onStartClick = () => {
        publishOwnFeed(publisherHandler, true);
    }

    const onStopClick = () => {
        unpublishOwnFeed(publisherHandler);
        setPlayerState("Paused");
    }   

    const onMuteClick = () => {
        if(!publisherHandler.isAudioMuted()){
            publisherHandler.muteAudio();
        }
        setIsMuted(publisherHandler.isAudioMuted());
    }

    const onUnMuteClick = () => {
        if(publisherHandler.isAudioMuted()){
            publisherHandler.unmuteAudio();
        }
        setIsMuted(publisherHandler.isAudioMuted());
    }

    const onBandwidthChange = (bitrate) => {
        publisherHandler.send({"message": { "request": "configure", "bitrate": bitrate }});
    }

    const playerElement = children ? children : <JanusPlayer />;
    
    
    if (startPublishsing) {
        return (<div className="janus-publisher">
        <div className="janus-video">
            { React.cloneElement(playerElement, { 
                ref: videoArea,
                isPublisher: true,
                status:playerState,
                isMuted:isMuted,
                onStart:onStartClick,
                onStop:onStopClick,
                onMute:onMuteClick, 
                onUnmute:onUnMuteClick, 
                onBandwidthChange:onBandwidthChange
                
            }) }
        </div>
        </div>)
    } else {
        return(
            <></>
        )
    }

  

      
   
};

export default JanusPublisher;