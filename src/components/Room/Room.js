import { useEffect,useState } from 'react';

import { JanusComponent, JanusPublisher, JanusVideoRoom } from '../janus';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme'
import UserList from './componnets/Userlist';
import ChatBox from './componnets/Chat';
import AppBar from './componnets/Appbar';

const Room = ({ roomName, nickname }) => {
    const [room, setRoom] = useState(1234);
    const [pubId, setPubId] = useState(null);
    const [pubPvtId, setPubPvtId] = useState(null);
    const [chatroom, setChatroom] = useState(null);

    useEffect(() => {
        console.log("room: " + room);
    })

    return (

        <ThemeProvider theme={theme}>
            <Grid container sx={{ flexGrow: 1 }} height style={{ overflow: "hidden" }} >
                <Grid xs={12} md={9} sx={{
                    height: '80%',
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
                        پنل ویدئو و اشتراک دسکتاپ
                        <JanusComponent server="wss://media.setup-infra.ir" >
                            <JanusVideoRoom>
                                <JanusPublisher
                                    opaqueId="test12234"
                                    secret="1234"
                                    username="React_user"
                                    setRoom={setRoom}
                                    room={room}
                                    setPubId={setPubId}
                                    setPubPvtId={setPubPvtId}
                                >

                                </JanusPublisher>
                            </JanusVideoRoom>

                        </JanusComponent>
                    </Box>
                </Grid>
                <Grid xs={12} md={3} sx={{
                    height: '80%',
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

                        <AppBar />

                    </Box>
                </Grid>

            </Grid>



        </ThemeProvider>

    )

}


export default Room;