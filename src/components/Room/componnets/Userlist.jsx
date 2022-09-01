

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
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.text.light,
            width:'100%',overflowY:'scroll',

        }}
        
        
        height
    >
        <List sx={{ width: '100%', maxWidth: 360, direction: 'rtl', textAlign: 'right' }} dense={dense}>
            {generate(
                <ul style={{paddingRight:2, paddingLeft:2}}>
                    <PersonIcon fontSize='small' /> 
                    <span style={{paddingLeft:50,marginRight:5 }} >نام کاربر</span>
                    <span>
                    <MicIcon className='user_icon' fontSize='medium'  />
                    <VolumeUpIcon  className='user_icon' fontSize='medium'  />
                    <PresentToAllIcon  className='user_icon' fontSize='medium'  />
                    </span>
                </ul>,
            )}
        </List>
        </Box>
    );
}



