import React, { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Janus from '../utils/janus';
import { AttchPublisherHandler, publishOwnFeed, unpublishOwnFeed, sendData, publishChatroom } from '../utils/publisher';
import VideoPlayer from './VideoPlayer';
import "./video-room.css";
//import JanusChat from './JanusChat';

const JanusPublisher = ({ janus, opaqueId, room, secret, pin, username, setRoom,
    setPvtId, setId, children, publisherHandler, setPublisherHandler, startPublishsing,
    setPublishers,setAttendees ,mystreams,setMyStreams,addUser,removeUser}) => {
     
    
    // const [publisherHandler, setpublisherHandler] = useState(null);

    const videoArea = useRef(null);
    //let mystream = null;

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
                    if(attendees){
                        setAttendees(attendees)
                    }
                  
                    
                } else if (eventType === "onlocaltrack") {

                    if(data.kind==="video"){
                       
                        setMyStreams([data])
                    }
                   
                    console.log("local tracks ====>",mystreams,data );
                

                    if (_publisherHandler.webrtcStuff.pc.iceConnectionState !== "completed" &&
                        _publisherHandler.webrtcStuff.pc.iceConnectionState !== "connected") {
                        
                    }
                    var videoTracks = mystreams[0].getVideoTracks();
                    if (videoTracks === null || videoTracks === undefined || videoTracks.length === 0) {
                       
                    }
                } else if (eventType === "oncleanup") {
                   
                  
                } else if (eventType === "error") {
                   
                  
                }else if (eventType === "publishers") {
                   
                   let {publishers}=data;        
                    if(publishers){
                        setPublishers(publishers);
                    }
                  
                   
                }
                
                // else if (eventType==="paricipants"){
                //     console.log("list of Participants",data.participants)
                // }
                else if (eventType==="joining"){
                    console.log("user is joined===> ",data.joining)
                    addUser({
                        id:data.joining.id,
                        name:data.joining.display
                    })
                }
                else if (eventType==="leaving"){
                    console.log("user is leaved===> ",data.leaving)
                    removeUser(data.leaving)
                }
            }
        )

    }, [janus])

 
  
    const onBandwidthChange = (bitrate) => {
        publisherHandler.send({ "message": { "request": "configure", "bitrate": bitrate } });
    }

   


    if (startPublishsing) {
        return (
            <Box

                sx={{
                    marginTop: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 2,
                    boxShadow: 1,
                    backgroundColor: "black",
                    // color: theme.palette.text.light,
                    width: '100%', overflowY: 'hidden',

                }}
                height
            >
                {
                    mystreams.length>0 &&(
                        <VideoPlayer
                         style={{
                            height: "95%",
                            margin: "auto",
                            borderRadius: 5,
                        }}
                        
                        stream={mystreams[0]}/>
                    )
                }
                   
            </Box>

        )
    } else {
        return (
            <></>
        )
    }





};

export default JanusPublisher;