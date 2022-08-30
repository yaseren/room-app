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
const Room = ({roomName,nickname}) => {
    return (

        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth={false} style={{height:'98%' , overflow:'hidden'}} >
            <CssBaseline />
            <Box
            maxWidth="xlg"
                sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 2,
                    boxShadow:3,            
                    padding: 5,
                    backgroundColor: theme.palette.primary.dark,
                    height:'80%',color:theme.palette.text.light
                                  
                }}
            >
             This is main pan
            </Box>
            <Box
           maxWidth="xs"
                sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 2,
                    boxShadow:3,            
                    padding: 5,
                    backgroundColor: theme.palette.primary.dark,
                    height:'5%',color:theme.palette.text.light,
                   
                                  
                }}
            >
               This is tool bar
            </Box>    
        </Container>
    </ThemeProvider>

    )

}


export default Room;