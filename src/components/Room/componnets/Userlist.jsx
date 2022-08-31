

import * as React from 'react';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


import ListItemText from '@mui/material/ListItemText';

import IconButton from '@mui/material/IconButton';
import MicIcon from '@mui/icons-material/Mic';
import PersonIcon from '@mui/icons-material/Person';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import {  ListItemIcon } from '@mui/material';

function generate(element) {
    return [0, 1, 2,3,5,1,1,1,1,1,1,1,1,1].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}



export default function UserList() {
    const [dense, setDense] = React.useState(true);
   

    return (
        <List sx={{ width: '100%', maxWidth: 360,direction:'rtl',textAlign:'right' }}  dense={dense}>
            {generate(
                <ListItem secondaryAction={ <IconButton edge="end" >  </IconButton>  }
                >
                    <ListItemIcon> <PersonIcon /> </ListItemIcon>
                    <ListItemText primary="نام کاربر"/>
                    <IconButton><MicIcon fontSize='medium' color='primary' /></IconButton>
                    <IconButton><VolumeUpIcon fontSize='medium' color='primary' /></IconButton>
                    <IconButton><PresentToAllIcon  fontSize='medium' color='primary' /></IconButton>
                    

                </ListItem>,
            )}
        </List>
    );
}



