import * as React from 'react';
import './Appbar.css'


import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../theme'
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
import RecordIcon from '@mui/icons-material/FiberManualRecord';

export default function Appbar({ publishCamera, setMute, setUnMute, hasMic, hasWebcam, hasSpeakers }) {
    const [recording, setRecording] = React.useState(false);
    const [mic, setMic] = React.useState(false);
    const [camera, setCamera] = React.useState(false);
    const [audio, setAudio] = React.useState(false);
    const [screen, setScreen] = React.useState(false);

    const handlRecord = () => {
        if (recording) {
            setRecording(false)
        } else {
            setRecording(true)
        }
    }

    const handlMic = () => {
        if (mic) {
            setMic(false);
            setMute();
        } else {
            setMic(true)
            setUnMute()
        }

    }

    //! publish camera
    const handleCamera = () => {
        if (camera) {
            setCamera(false)
            setMic(false);
            publishCamera(false);
        } else {
            setCamera(true);
            setMic(true);
            publishCamera(true);
        }

    }
    const handleAudio = () => { audio ? setAudio(false) : setAudio(true) }
    const handleScreen = () => { screen ? setScreen(false) : setScreen(true) }
    
 
return (
    <ThemeProvider theme={theme}>
    <Stack className='appbar' direction="row" alignItems="center" spacing={2} style={{
        justifyContent: 'center',
        height: 80,
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.text.light,
    }}>
        <Button variant="contained" component="label">
            <LogoutIcon onClick={()=>{window.location.reload()}} />
        </Button>
        {hasMic && (
            <Button variant="contained" component="label" onClick={handlMic}>
                {mic ? <MicIcon sx={{ color: '#8ac926' }} /> : <MicOffIcon />}

            </Button>

        )}

        {hasWebcam && (

            <Button variant="contained" component="label" onClick={handleCamera}>
                {camera ? <VideocamIcon sx={{ color: '#8ac926' }} /> : <VideocamOffIcon />}

            </Button>
        )}

        {hasSpeakers && (

            <Button variant="contained" component="label" onClick={handleAudio}>
                {audio ? <VolumeUpIcon sx={{ color: '#8ac926' }} /> : <VolumeOffIcon />}

            </Button>
        )}



        <Button variant="contained" component="label" onClick={handleScreen}>
            {screen ? <ScreenShareIcon sx={{ color: '#8ac926' }} /> : <ScreenShareIcon />}

        </Button>
        <Button variant="contained" component="label" onClick={handlRecord} >
            <RecordIcon sx={{ color: '#ff0000' }} /> {recording ? "recording" : "record"}
        </Button>



    </Stack>
    </ThemeProvider>
);
}