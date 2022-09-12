import { useEffect, useState, createRef, useRef } from 'react';

import detectrtc from  "detectrtc/DetectRTC";
import Janus from './utils/janus';


import { AttchPublisherHandler, publishOwnFeed, unpublishOwnFeed, sendData, publishChatroom } from './utils/publisher';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme'
import UserList from './componnets/Userlist';
import ChatBox from './componnets/Chat';
import AppBar from './componnets/Appbar';

import VideoGrid from './grids/VideoGrid';

const Room = ({ roomName, nickname }) => {

    //#region //! get and set video panel h w
    const vide_panel_ref = useRef(null);

    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setHeight(vide_panel_ref.current.offsetHeight);
        setWidth(vide_panel_ref.current.offsetWidth);

        // 👇️ if you need access to parent
        // of the element on which you set the ref
      //  console.log(vide_panel_ref.current.parentElement);
      //  console.log(vide_panel_ref.current.parentElement.offsetHeight);
     //   console.log(vide_panel_ref.current.parentElement.offsetWidth);
    }, []);

    //#endregion

    const [hasMic, setHasMic] = useState(false)
    const [hasWebcam, setHasWebcam] = useState(false)
    const [hasSpeakers, sethasSpeakers] = useState(false)

    const [mystream, setMystream] = useState(null)

    const [server, setServer] = useState("wss://media.setup-infra.ir")
    const [janusInstance, setJanusInstance] = useState(null);
    const [room, setRoom] = useState(1004);
    const [id, setId] = useState(null);
    const [pvtId, setPvtId] = useState(null);
    const [chatroom, setChatroom] = useState(null);
    const [userName, setUserName] = useState(nickname);
    const [apqueId, setApqueId] = useState(Janus.randomString(12));



    const [isMuted, setIsMuted] = useState(false);
    const [isPublishingVideo, setVideoPublishing] = useState(false);
    const [publisherHandler, setPublisherHandler] = useState(null);
    const [subscriberHandle, setSubscriberHandle] = useState(null);

    const[ispublisher,setIspublisher]=useState(false);

    const [feedStreams, setFeedStreams] = useState([])
  
    
    const JanusInit = () => {
        Janus.init({
            debug: "all",
            callback: function () {
                if (!Janus.isWebrtcSupported()) {
                    console.log("No WebRTC support... ");
                    return;
                }

                const janus = new Janus(
                    {
                        server: server,
                        // No "iceServers" is provided, meaning janus.js will use a default STUN server
                        // Here are some examples of how an iceServers field may look like to support TURN
                        // 		iceServers: [{urls: "turn:yourturnserver.com:3478", username: "janususer", credential: "januspwd"}],
                        // 		iceServers: [{urls: "turn:yourturnserver.com:443?transport=tcp", username: "janususer", credential: "januspwd"}],
                        // 		iceServers: [{urls: "turns:yourturnserver.com:443?transport=tcp", username: "janususer", credential: "januspwd"}],
                        // Should the Janus API require authentication, you can specify either the API secret or user token here too
                        //		token: "mytoken",
                        //	or
                        //		apisecret: "serversecret",
                        success: function () {
                            // Attach to echo test plugin
                            console.log("Janus loaded");
                            
                            setJanusInstance(janus);
                          
                        },
                        error: function (error) {
                            Janus.error(error);
                            setJanusInstance(null);
                        },
                        destroyed: function () {
                            setJanusInstance(null);
                        }
                    });
            }
        });
    }
 



    //#region  //! detect microphon - webcam - speakers and webrtc suport and init janus
    
    useEffect(()=>{
        detectrtc.load(()=>{
            console.log(detectrtc.version);
            if (detectrtc.isWebRTCSupported === false) {
                console.log('Please use Chrome or Firefox.');
            }
    
            if (detectrtc.hasWebcam === false) {
                console.log('Please install an external webcam device.');
            } else {
                setHasWebcam(detectrtc.hasWebcam)
            }
    
            if (detectrtc.hasMicrophone === false) {
                console.log('Please install an external microphone device.');
            } else {
                setHasMic(detectrtc.hasMicrophone);
            }
    
            if (detectrtc.hasSpeakers === false && (detectrtc.browser.name === 'Chrome' || detectrtc.browser.name === 'Edge')) {
                console.log('Oops, your system can not play audios.');
            } else {
                sethasSpeakers(detectrtc.hasSpeakers);
            }
        
        }
        );
    },[])
 
    //#endregion
useEffect(()=>{
    JanusInit();
},[]);
useEffect(()=>{
    if (janusInstance) {
        AttchPublisherHandler(janusInstance, apqueId, room, null, null, userName, true, (handler, eventType, data) => {
            setPublisherHandler(handler);
           
            if (eventType === "joined") {
                const { id, private_id } = data;
                setId(id);
                setPvtId(private_id);
            } else if (eventType === "onlocalstream") {
                setMystream(data);
                //   const videoContainer = videoArea.current;
                //  const videoPlayer = videoContainer.querySelector(".janus-video-player")
    
                //  Janus.attachMediaStream(videoPlayer, mystream);
                console.log(mystream);
                if (handler.webrtcStuff.pc.iceConnectionState !== "completed" &&
                    handler.webrtcStuff.pc.iceConnectionState !== "connected") {
                    //  setPlayerState("Live");
                }
                var videoTracks = mystream.getVideoTracks();
                if (videoTracks === null || videoTracks === undefined || videoTracks.length === 0) {
                    //    setPlayerState("Error");
                }
            } else if (eventType === "oncleanup") {
                //  setPlayerState("Paused");
                setIsMuted(false);
            } else if (eventType === "error") {
                //  setPlayerState("Error");
                setIsMuted(false);
            }
    
        });
    }
    
},[janusInstance]);


    const publishOwnfeed = (p) => {
        if (publisherHandler) {
            if (p) {

                publishOwnFeed(publisherHandler, true, true);
                setVideoPublishing(true);

            } else {
                unpublishOwnFeed(publisherHandler);
                setVideoPublishing(false);

            }
        }

    }


    const setMute = () => {
        if (!publisherHandler.isAudioMuted()) {
            publisherHandler.muteAudio();
        }
        setIsMuted(publisherHandler.isAudioMuted());
    }

    const setUnMute = () => {
        if (publisherHandler.isAudioMuted()) {
            publisherHandler.unmuteAudio();
        }
        setIsMuted(publisherHandler.isAudioMuted());
    }

    useEffect(() => {
        console.log("room: " + room);

    },[])

    return (

        <ThemeProvider theme={theme}>
            <Grid container sx={{ flexGrow: 1 }} height style={{ overflow: "hidden" }} >
                <Grid xs={12} md={9} sx={{
                    height: '85%',
                    p: 1

                }}>
                    <Box
                        maxWidth="xlg"
                        sx={{
                            overflow: "hidden",
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderRadius: 2,
                            boxShadow: 3,
                            padding: 1,
                            m: 1,
                            backgroundColor: theme.palette.primary.dark,
                            color: theme.palette.text.light

                        }}
                        height
                        ref={vide_panel_ref}
                    >

                        {feedStreams.length > 0 && (
                            <VideoGrid height={height} feedStreams={feedStreams} />
                        )}
                    </Box>
                    <Box

                        sx={{

                            borderRadius: 2,
                            boxShadow: 0,
                            p: 1,
                            m: 1,
                            justifyItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: theme.palette.primary.dark,
                            color: theme.palette.text.light,


                        }}


                    >
                        {/* //! appbar */}
                        <AppBar
                            hasMic={hasMic}
                            hasWebcam={hasWebcam}
                            hasSpeakers={hasSpeakers}
                            publishCamera={publishOwnfeed}
                            setMute={setMute}
                            setUnMute={setUnMute}

                        />

                    </Box>
                </Grid>
                <Grid xs={12} md={3} sx={{
                    height: '99%',
                    p: 1
                }}>
                    <Box
                        maxWidth="xlg"
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderRadius: 2,
                            boxShadow: 3,
                            padding: 1,
                            m: 1,
                            backgroundColor: theme.palette.primary.dark,
                            color: theme.palette.text.light

                        }}
                        height
                    >
                        {/*  users list and chat and other panels come here  */}
                        <UserList />
                        <ChatBox />
                        {/*  users list and chat and other panels come here  */}

                    </Box>
                </Grid>
                <Grid xs={12} md={12}  >

                </Grid>

            </Grid>



        </ThemeProvider>

    )

}


export default Room;