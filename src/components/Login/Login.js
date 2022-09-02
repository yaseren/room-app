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
import { shouldSkipGeneratingVar, ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://setup-infra.ir/">
                Srtup-infra
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


// main componnent function 

export default function SignIn({ room, linkIsValid, onLogin }) {
    const [nickname, setNickname] = React.useState(localStorage.getItem('nickname'));

    //! handle login
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const logindata = {
            userName: data.get('userName'),
            password: data.get('password'),
            nickname: data.get('nickname')
        }
        if (logindata.nickname) {
            localStorage.setItem('nickname', logindata.nickname)
        }

        console.log(logindata);

        onLogin(logindata)
    };

    let roomName = 'لینک اتاق نا معتبر است';
    if (linkIsValid) {
        roomName = room;
        return (

            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs" sx={{overflow:'hidden'}}>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderRadius: 5,
                            boxShadow:3,
                          
                            padding: 5,
                            backgroundColor:'#f2f2f2'
                           

                        }}
                    >
                        <Avatar sizes='large' sx={{ m: 1, bgcolor:theme.palette.primary.main }}>
                            <CloudIcon fontSize='large' />
                        
                        </Avatar>
                        <Typography component="h1" variant="h4">
                           CLOUDMEET
                        </Typography>
                        <Typography component="h2" variant="h5">
                            {roomName}
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, color: theme.palette.text.light }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="nickname"
                                label="نام نمایشی"
                                name="nickname"
                                value={nickname}
                                autoFocus
                                onChange={(e) => { setNickname(e.target.value) }}
                                sx={{fontFamily:'inherit'}}
                           
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="userName"
                                label="نام کاربری"
                                name="userName"
                                autoComplete="email"
                                sx={{fontFamily:'inherit'}}

                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="کلمه عبور"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />

                            <Grid container>
                                <Grid item xs>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        ورود
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, ml: 1 }}
                                    >
                                        مهمان
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>
        );
    } else {
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderRadius: 5,
                            padding: 5,
                            backgroundColor:'#f2f2f2',
                            boxShadow:3,

                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <CloudOffIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {roomName}
                        </Typography>

                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>
        )
    }




}