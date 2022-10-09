

import * as React from 'react';

import "./room.css"

import List from '@mui/material/List';
import Box from '@mui/material/Box';



import { theme } from '../../../theme'

import MicIcon from '@mui/icons-material/Mic';
import PersonIcon from '@mui/icons-material/Person';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import { ButtonGroup, Grid, IconButton, Tooltip } from '@mui/material';
import { useEffect } from 'react';


export default function UserList({ userList }) {
   
    useEffect(() => {
        console.log("List of users ", userList);
    }, [userList])

    return (
        <>

            <Box

                sx={{
                    display: 'inline-block',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 2,
                    boxShadow: 1,

                    // color: theme.palette.text.light,
                    width: '100%', overflow: 'hidden',

                }}
                height
            >
                <div className='user_header'>
                    <div>
                    <span style={{fontSize:'medium'}}>{userList.length}</span><PersonIcon fontSize='medium' />
                    </div>
                </div>

                <ul id="user_box" >
                    {userList.map(user =>

                        <li className='user_row' key={user.id} >

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
                                        <p>{user.name}</p>
                                        <Tooltip title={user.name}>
                                            <PersonIcon fontSize='small' />

                                        </Tooltip>

                                    </div>

                                </Grid>
                            </Grid>

                        </li>

                    )}
                </ul>
            </Box>
        </>

    );
}



