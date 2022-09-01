import * as React from 'react';

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
                        This is main pan
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
                            padding: 3,
                            m: 1,
                            backgroundColor: theme.palette.primary.dark,
                            color: theme.palette.text.light

                        }}
                        height
                    >
                        This is user adn chat pan

                        <UserList />
                        <ChatBox />


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
                            justifyContent:'center',
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