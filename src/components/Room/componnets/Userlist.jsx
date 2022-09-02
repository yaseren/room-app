

import * as React from 'react';

import "./room.css"

import List from '@mui/material/List';
import Box from '@mui/material/Box';


import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../theme'

import MicIcon from '@mui/icons-material/Mic';
import PersonIcon from '@mui/icons-material/Person';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import { Button, ButtonGroup, Grid, IconButton, Stack, Tooltip } from '@mui/material';


function generate(element) {
    return [0, 1, 2, 3, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}



export default function UserList() {
    const [dense, setDense] = React.useState(true);


    return (
        <Box

            sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 2,
                boxShadow: 1,
                backgroundColor: theme.palette.primary.lighter,
                color: theme.palette.text.light,
                width: '100%', overflowY: 'scroll',

            }}
            height
        >
            <List sx={{ width: '100%' }} dense={dense}>
                {generate(
                    <li className='user_row' >

                        <Grid container >
                            <Grid item xs={4}>
                                <div className='user_button_group'>

                                    <ButtonGroup variant="text"  >
                                        <Tooltip title="میکروفن">
                                            <IconButton><MicIcon className='user_icon' fontSize='small' /></IconButton>
                                        </Tooltip>

                                        <IconButton><VolumeUpIcon className='user_icon' fontSize='small' /></IconButton>
                                        <IconButton><PresentToAllIcon className='user_icon' fontSize='small' /></IconButton>
                                    </ButtonGroup>

                                </div>
                            </Grid>
                            <Grid item xs={8}>
                                <div size='small' className='user_name'>
                                    <p>نام کاربر </p>
                                    <Tooltip title="نام کاربر">
                                        <PersonIcon fontSize='small' />

                                    </Tooltip>

                                </div>

                            </Grid>
                        </Grid>









                    </li>,
                )}
            </List>
        </Box>
    );
}



