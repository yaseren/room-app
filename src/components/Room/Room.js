import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CloudIcon from '@mui/icons-material/Cloud';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme'
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
                    </Box>
                </Grid>
                <Grid xs={12} md={12} sx={{}} height >
                    <Box
                      
                        sx={{

                            display: 'flex',
                            //flexDirection: 'row',
                            alignItems: 'center',
                            borderRadius: 2,
                            boxShadow: 0,
                            m: 2,

                            backgroundColor: theme.palette.primary.dark,
                            color: theme.palette.text.light,
                            height: 100


                        }}

                    >

                        This is tool pan

                    </Box>
                </Grid>

            </Grid>
        </ThemeProvider>

    )

}


export default Room;