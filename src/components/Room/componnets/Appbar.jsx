import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import MicOffIcon from '@mui/icons-material/MicOff';
import MicIcon from '@mui/icons-material/Mic';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import LogoutIcon from '@mui/icons-material/Logout';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

export default function UploadButtons() {
    
    return (
        <Stack direction="row" alignItems="center" spacing={2} style={{
            justifyContent: 'center',
            height:80
        }}>
            <Button variant="contained" component="label">
            <LogoutIcon />
            </Button>
            <Button variant="contained" component="label">
            <MicIcon />
            </Button>
            <Button variant="contained" component="label">
            <VolumeUpIcon />
            </Button>
            <Button variant="contained" component="label">
            <VideocamIcon />
            </Button>
            <Button variant="contained" component="label">
            <ScreenShareIcon />
            </Button>


        </Stack>
    );
}