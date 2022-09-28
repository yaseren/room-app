import { useEffect, useState, createRef, useRef } from 'react';

import detectrtc from "detectrtc/DetectRTC";
import Janus from './utils/janus';


import { publishOwnFeed, unpublishOwnFeed, sendData, publishChatroom } from './utils/publisher';

import JanusVideoRoom from './videoRoom/JanusVideoRoom'
import JanusPublisher from './videoRoom/JanusPublisher'
import JanusSubscriber from './videoRoom/JanusSubscriber'

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme'
import UserList from './componnets/Userlist';
import ChatBox from './componnets/Chat';
import AppBar from './componnets/Appbar';



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
    const [room, setRoom] = useState(parseInt(roomName.replace(/[^\d.]/g, '')));//in final get room id from backend db
    const [id, setId] = useState(null);
    const [pvtId, setPvtId] = useState(null);
    const [chatroom, setChatroom] = useState(null);
    const [userName, setUserName] = useState(nickname);
    const [apqueId, setApqueId] = useState(Janus.randomString(12));

    const [publishers, setPublishers] = useState([]);//total publishers
    const [subscriptions, setSubscriptions] = useState([]); // publishers list that subscriber
    const [toSubscribe, setToSubscribe] = useState([]); //publishers that is to be subscribed
    const [usersList, setUsersList] = useState([{
        id: 0,
        name: nickname,
    },]);



    const [isMuted, setIsMuted] = useState(false);
    const [isPublishingVideo, setVideoPublishing] = useState(false);

    const [publisherHandler, setPublisherHandler] = useState(null);
    const [mystreams,setMyStreams]=useState([]);

    const [subscriberHandle, setSubscriberHandle] = useState(null);

    const [ispublisher, setIspublisher] = useState(false);

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

    useEffect(() => {
        detectrtc.load(() => {

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



    }, [])

    //#endregion
    useEffect(() => {
        JanusInit();
    }, []);


    const publishOwnfeed = () => {
        if (isPublishingVideo) {
            setVideoPublishing(false);
            console.log("unpublishing===== ");
           
            setTimeout(() => {
                unpublishOwnFeed(publisherHandler);
                
            }, 500)

        } else {
            setVideoPublishing(true);
            setTimeout(() => {
                publishOwnFeed(publisherHandler, true, true)
            }, 500)


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
        console.log("roomName: " + roomName);
        console.log("roomId: " + room);

    }, [])

    useEffect(() => {
        console.log("list of publishers to subscribe: ", publishers);
        if (publishers.length > 0) {

            publishers.map((pub) => {
                let user = { id: pub.id, name: pub.display };
                addToUserList(user);
            })

            console.log("list of users to update", usersList);


        }

        setToSubscribe(publishers);


    }, [publishers])


    const addToUserList = (user) => {

        let duser = usersList.find(u => {
            return u.id === user.id;
        })
        if (!duser) {
            setUsersList([...usersList, user]);
        }

    }
    const removeFromUserList = (user) => {

        let newUserList=usersList.filter(u=>{
            return  u.id!==user.id
        });

        setUsersList(newUserList);
    }

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


                        {/* //! video grids  */}
                        {/*  local webcam  */}
                        {/* //! subscriber  */}

                        <JanusVideoRoom janus={janusInstance}>
                            <JanusSubscriber
                                opaqueId={apqueId}
                                room={room}
                                pubId={id}
                                pubPvtId={pvtId}
                                subscribeList={toSubscribe}
                            />
                        </JanusVideoRoom>

                        {/* {feedStreams.length > 0 && (
                            <VideoGrid height={height} feedStreams={feedStreams} />
                        )} */}
                    </Box>
                    <Box

                        sx={{

                            borderRadius: 2,
                            boxShadow: 0,
                            p: 0,
                            m: 1,
                            justifyItems: 'center',
                            justifyContent: 'center',



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
                        {/*  local webcam  */}
                        {/* //! publisher  */}
                        <JanusVideoRoom janus={janusInstance}>
                            <JanusPublisher
                                publisherHandler={publisherHandler}
                                setPublisherHandler={setPublisherHandler}
                                room={room}
                                setRoom={setRoom}
                                apqueId={apqueId}
                                username={userName}
                                setId={setId}
                                setPvtId={setPvtId}
                                setMystream={setMystream}
                                startPublishsing={isPublishingVideo}
                                setPublishers={setPublishers}
                                mystreams={mystreams}
                                setMyStreams={setMyStreams}
                            ></JanusPublisher>
                        </JanusVideoRoom>
                        {/*  users list and chat and other panels come here  */}
                        <UserList usersList={usersList} />
                        <ChatBox />
                        {/*  users list and chat and other panels come here  */}

                    </Box>
                </Grid>

            </Grid>



        </ThemeProvider>

    )

}


export default Room;