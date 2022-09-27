import React, { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Janus from '../utils/janus';
import { AttchPublisherHandler, publishOwnFeed, unpublishOwnFeed, sendData, publishChatroom } from '../utils/publisher';
import JanusPlayer from './JanusPlayer';
import "./video-room.css";
//import JanusChat from './JanusChat';

const JanusPublisher = ({ janus, opaqueId, room, secret, pin, username, setRoom,
    setPvtId, setId, children, publisherHandler, setPublisherHandler, startPublishsing,
    setPublishers }) => {
    const [playerState, setPlayerState] = useState("Ready");
    const [isMuted, setIsMuted] = useState(false);
    // const [publisherHandler, setpublisherHandler] = useState(null);

    const videoArea = useRef(null);
    let mystream = null;

    useEffect(() => {
        console.log("----------janus publisher component useEffect executed");
        AttchPublisherHandler(janus, opaqueId, room, secret, pin, username, true,
            (_publisherHandler, eventType, data) => {
               
                setPublisherHandler(_publisherHandler)
                if (eventType === "created") {
                    setRoom(data.room);
                } else if (eventType === "joined") {
                    const { id, private_id ,publishers,attendees} = data;

                    setId(id);
                    setPvtId(private_id);
                    if(publishers){
                        setPublishers(publishers);
                    }
                  
                    setPlayerState("Paused");
                } else if (eventType === "onlocalstream") {
                    mystream = data;
                    const videoContainer = videoArea.current;
                    const videoPlayer = videoContainer.querySelector(".janus-video-player")
                   
                    if(mystream){
                      //  setPublishers(mystream);
                    }
                    Janus.attachMediaStream(videoPlayer, mystream);

                    if (_publisherHandler.webrtcStuff.pc.iceConnectionState !== "completed" &&
                        _publisherHandler.webrtcStuff.pc.iceConnectionState !== "connected") {
                        setPlayerState("Live");
                    }
                    var videoTracks = mystream.getVideoTracks();
                    if (videoTracks === null || videoTracks === undefined || videoTracks.length === 0) {
                        setPlayerState("Error");
                    }
                } else if (eventType === "oncleanup") {
                    setPlayerState("Paused");
                    setIsMuted(false);
                } else if (eventType === "error") {
                    setPlayerState("Error");
                    setIsMuted(false);
                }else if (eventType === "publishers") {
                   
                   let {publishers}=data;        
                    if(publishers){
                        setPublishers(publishers);
                    }
                  
                    setPlayerState("Paused");
                }
            }
        )

    }, [janus])

 
    const onStartClick = () => {
        publishOwnFeed(publisherHandler, true);
    }

    const onStopClick = () => {
        unpublishOwnFeed(publisherHandler);
        setPlayerState("Paused");
    }

    const onMuteClick = () => {
        if (!publisherHandler.isAudioMuted()) {
            publisherHandler.muteAudio();
        }
        setIsMuted(publisherHandler.isAudioMuted());
    }

    const onUnMuteClick = () => {
        if (publisherHandler.isAudioMuted()) {
            publisherHandler.unmuteAudio();
        }
        setIsMuted(publisherHandler.isAudioMuted());
    }

    const onBandwidthChange = (bitrate) => {
        publisherHandler.send({ "message": { "request": "configure", "bitrate": bitrate } });
    }

    const playerElement = children ? children : <JanusPlayer />;


    if (startPublishsing) {
        return (
            <Box

                sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 2,
                    boxShadow: 1,
                    // backgroundColor: theme.palette.primary.lighter,
                    // color: theme.palette.text.light,
                    width: '100%', overflowY: 'hidden',

                }}
                height
            >
                <div className="janus-publisher">
                    <div className="janus-video">
                        {React.cloneElement(playerElement, {
                            ref: videoArea,
                            isPublisher: true,
                            status: playerState,
                            isMuted: isMuted,
                            onStart: onStartClick,
                            onStop: onStopClick,
                            onMute: onMuteClick,
                            onUnmute: onUnMuteClick,
                            onBandwidthChange: onBandwidthChange

                        })}
                    </div>
                </div>
            </Box>

        )
    } else {
        return (
            <></>
        )
    }





};

export default JanusPublisher;