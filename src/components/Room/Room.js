import { useEffect, useState, createRef, useRef } from 'react';

import detectrtc from "detectrtc/DetectRTC";
import Janus from './utils/janus';


import { publishOwnFeed, unpublishOwnFeed, publishOwnScreenFeed } from './utils/publisher';

import JanusVideoRoom from './videoRoom/JanusVideoRoom'
import JanusPublisher from './videoRoom/JanusPublisher'
import JanusSubscriber from './videoRoom/JanusSubscriber'
import JanusChat from './componnets/JanusChat'

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme'
import UserList from './componnets/Userlist';
import ChatBox from './componnets/ChatBox';
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




    const [server, setServer] = useState("wss://media.setup-infra.ir")
    const [janusInstance, setJanusInstance] = useState(null);
    const [room, setRoom] = useState(parseInt(roomName.replace(/[^\d.]/g, '')));//in final get room id from backend db
    const [roomDesc, setRoomDesc] = useState("");
    const [id, setId] = useState(null);
    const [pvtId, setPvtId] = useState(null);
    const [chatroom, setChatroom] = useState(null);
    const [userName, setUserName] = useState(nickname);
    const [apqueId, setApqueId] = useState(Janus.randomString(12));
    const [chatUserName, setChatUserName] = useState(Janus.randomString(12));

    const [publishers, setPublishers] = useState([]);//total publishers
    const [subscriptions, setSubscriptions] = useState([]); // publishers list thats are  subscribed
    const [toSubscribe, setToSubscribe] = useState([]); //publishers that is to be subscribed
    const [attendees, setAttendees] = useState([]); //list of attendees

    const [usersList, setUsersList] = useState([]);
    const [joinedUser, setJoinedUser] = useState(null)
    const [leavedUserId, setLeavedUserId] = useState(null)
    const [unpublished, setUnpublished] = useState(null)


    const [isMuted, setIsMuted] = useState(false);
    const [isPublishingVideo, setVideoPublishing] = useState(false);

    const [isPublishingScreen, setIsPublishingScreen] = useState(false);

    const [publisherHandler, setPublisherHandler] = useState(null);
    const [mystreams, setMyStreams] = useState([]);

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
        setUsersList([{ id: 0, name: nickname }])
    }, []);

    useEffect(() => {
        document.title = roomDesc;

    }, [roomDesc])


    const publishOwnfeed = () => {
        if (isPublishingVideo) {
            setVideoPublishing(false);
            console.log("unpublishing===== ");

            // setTimeout(() => {
            //     unpublishOwnFeed(publisherHandler);

            // }, 500)

        } else {
            setVideoPublishing(true);
            // setTimeout(() => {
            //     publishOwnFeed(publisherHandler, true, true)
            // }, 500)


        }

    }

    const publishScreen = () => {
        if (isPublishingScreen) {
            setIsPublishingScreen(false);
            console.log("unpublishing Screen ");

            setTimeout(() => {
                unpublishOwnFeed(publisherHandler);

            }, 500)

        } else {
            setIsPublishingScreen(true);
            setTimeout(() => {
                publishOwnScreenFeed(publisherHandler, true)
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

        if (publishers.length > 0) {

            let list = usersList;
            publishers.forEach(({ id, display }) => {
                let duser = usersList.find(u => {
                    return u.id === id
                })
                if (!duser) {
                    list = [...list, { id, name: display }]
                    console.log("user added=>", id, display);
                }
            });

            setUsersList([...list])


        }

        // get list of publishers to subsctibe

        // let toSubscribe = publishers.filter(x => !subscriptions.includes(x));
        // let subscribed = subscriptions.concat(toSubscribe);

        //setSubscriptions(subscribed);
        setToSubscribe(publishers);
        //console.log("list of all publishers: ", publishers);
        console.log("list of all publishers to subscribe: ", toSubscribe);





    }, [publishers])

    useEffect(() => {
        // add user to list in first login list of attendees

        console.log("list of attendees = ", attendees);

        if (attendees.length > 0) {
            let list = usersList;
            attendees.forEach(({ id, display }) => {
                let duser = usersList.find(u => {
                    return u.id === id
                })
                if (!duser) {
                    list = [...list, { id, name: display }]
                    console.log("user added=>", id, display);
                }


            });

            setUsersList([...list])
        }


    }, [attendees])


    const getUserList = () => {
        if (publisherHandler) {
            let request = {
                "request": "listparticipants",
                "room": room
            }

            publisherHandler.send({ "message": request });
        }
    }

    useEffect(() => {
        if (joinedUser) {
            //add user to list 
            const { id, name } = joinedUser;
            let duser = usersList.find(u => {
                return u.id === id
            })
            if (!duser) {
                let list = usersList;
                list = [...list, { id, name }]
                setUsersList([...list])
            }
            //   const list = usersList.concat([{id, name}]);
            // setUsersList(list);
        }

    }, [joinedUser])

    useEffect(() => {
        // remove user from list
        if (leavedUserId) {
            let newUserList = usersList.filter(u => {
                return u.id !== leavedUserId
            });
            setUsersList(newUserList);
            console.log("userlist after remove ", newUserList);
        }

    }, [leavedUserId])

    const video_panel_style = {
        overflow: "hidden",
        marginTop: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 2,
        boxShadow: 3,
        padding: 1,
        m: 1,
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.text.light
    }
    const appbar_containet_style = {
        borderRadius: 2,
        boxShadow: 0,
        p: 0,
        m: 1,
        justifyItems: 'center',
        justifyContent: 'center',

    }
    const side_bar_style = {
        marginTop: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 2,
        boxShadow: 3,
        padding: 1,
        m: 1,
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.text.light
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
                        sx={video_panel_style}
                        height
                        ref={vide_panel_ref}
                    >


                        {/* //! video grids  */}
                        {/*  local webcam  */}
                        {/* //! subscriber  */}

                        {janusInstance != null && (
                            <JanusSubscriber
                                janus={janusInstance}
                                opaqueId={apqueId}
                                room={room}
                                pubId={id}
                                pubPvtId={pvtId}
                               // publishers={toSubscribe}
                               publishers={[]}
                                roomTitle={roomDesc}
                               //unpublished={unpublished}
                               unpublished={{}}

                            />
                        )}



                    </Box>
                    <Box

                        sx={appbar_containet_style}
                    >
                        {/* //! appbar */}
                        <AppBar
                            hasMic={hasMic}
                            hasWebcam={hasWebcam}
                            hasSpeakers={hasSpeakers}
                            publishCamera={publishOwnfeed}
                            setMute={setMute}
                            setUnMute={setUnMute}
                            publishScreen={publishScreen}


                        />

                    </Box>
                </Grid>
                <Grid xs={12} md={3} sx={{
                    height: '99%',
                    p: 1
                }}>
                    <Box
                        maxWidth="xlg"
                        sx={side_bar_style}
                        height
                    >
                        {/*  local webcam  */}
                        {/* //! publisher  */}

                        {janusInstance != null && (
                            <JanusPublisher
                                janus={janusInstance}
                                publisherHandler={publisherHandler}
                                setPublisherHandler={setPublisherHandler}
                                room={room}
                                setRoom={setRoom}
                                apqueId={apqueId}
                                username={userName}
                                setId={setId}
                                setPvtId={setPvtId}

                                startPublishsing={isPublishingVideo}
                                setPublishers={setPublishers}
                                setAttendees={setAttendees}
                                mystreams={mystreams}
                                setMyStreams={setMyStreams}
                                addUser={setJoinedUser}
                                removeUser={setLeavedUserId}
                                setRoomDescription={setRoomDesc}

                                setUnpublished={setUnpublished}
                            />

                        )}


                        {/*  users list and chat and other panels come here  */}
                        <UserList userList={usersList} />
                        <JanusChat
                            janus={janusInstance}
                            opaqueId={apqueId}
                            isPublisher={false}
                            chatroom={room}
                            //   setChatroom={setChatroom}
                            username={chatUserName.toString()}
                            display={nickname}

                        />
                        {/*  users list and chat and other panels come here  */}

                    </Box>
                </Grid>

            </Grid>
        </ThemeProvider>

    )

}

export default Room;