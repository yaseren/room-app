import { useEffect, useState, createRef, useRef } from 'react';

import detectrtc from "detectrtc/DetectRTC";

import { JanusComponent, JanusPublisher, JanusVideoRoom } from '../janus';

import { publishToRoom, publishOwnFeed, unpublishOwnFeed, sendData, publishChatroom } from '../janus/utils/publisher';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme'
import UserList from './componnets/Userlist';
import ChatBox from './componnets/Chat';
import AppBar from './componnets/Appbar';

import ResponsiveAutoExample from './grids/testGrid'

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
        console.log(vide_panel_ref.current.parentElement);
        console.log(vide_panel_ref.current.parentElement.offsetHeight);
        console.log(vide_panel_ref.current.parentElement.offsetWidth);
    }, []);

    //#endregion

    const [hasMic, setHasMic] = useState(false)
    const [hasWebcam, setHasWebcam] = useState(false)
    const [hasSpeakers, sethasSpeakers] = useState(false)

    const [room, setRoom] = useState(1004);
    const [pubId, setPubId] = useState(null);
    const [pubPvtId, setPubPvtId] = useState(null);
    const [chatroom, setChatroom] = useState(null);


    const [isMuted, setIsMuted] = useState(false);
    const [isPublishingVideo, setVideoPublishing] = useState(false);
    const [sfutest, setSfuTest] = useState(null);

    const [streams,setStreams]=useState([])




    //#region  //! detect microphon - webcam - aspekers and webrtc suport
    useEffect(() => {
        console.log(detectrtc.browser)
        detectrtc.load();
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
    }, [])
    //#endregion

    const publishOwnfeed = (p) => {
        if (p) {

            publishOwnFeed(sfutest, true, true);
            setVideoPublishing(true);

        } else {
            unpublishOwnFeed(sfutest);
            setVideoPublishing(false);

        }
    }


    const setMute = () => {
        if (!sfutest.isAudioMuted()) {
            sfutest.muteAudio();
        }
        setIsMuted(sfutest.isAudioMuted());
    }

    const setUnMute = () => {
        if (sfutest.isAudioMuted()) {
            sfutest.unmuteAudio();
        }
        setIsMuted(sfutest.isAudioMuted());
    }

    useEffect(() => {
        console.log("room: " + room);

    })

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
                        <JanusComponent server="wss://media.setup-infra.ir" >
                            <JanusVideoRoom>
                                <JanusPublisher
                                    opaqueId="test12234"
                                    secret="1004"
                                    username="React_user"
                                    setRoom={setRoom}
                                    room={room}
                                    setPubId={setPubId}
                                    setPubPvtId={setPubPvtId}
                                    stutest={sfutest}
                                    setSfuTest={setSfuTest}
                                    isPublishingVideo={isPublishingVideo}
                                >
                                </JanusPublisher>
                            </JanusVideoRoom>

                        </JanusComponent>
                        {streams.length>0 &&(
                        <ResponsiveAutoExample height={height} />
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