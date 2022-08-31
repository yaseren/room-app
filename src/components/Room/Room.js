import * as React from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme'
import UserList from './componnets/Userlist';
const Room = ({ roomName, nickname }) => {

    const [contextMenu, setContextMenu] = React.useState(null);

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
                // Other native context menus might behave different.
                // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
                null,
        );
    };

    const handleClose = () => {
        setContextMenu(null);
    };

    return (

        <ThemeProvider theme={theme}>
            <Grid container sx={{ flexGrow: 1 }} height style={{ overflow: "hidden" }} onContextMenu={handleContextMenu} >
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
                               <UserList/>

                           </Box>
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

            <Menu
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                }
            >
                <MenuItem onClick={handleClose}>Refresh</MenuItem>
                <MenuItem onClick={handleClose}>Print</MenuItem>
                <MenuItem onClick={handleClose}>Full Screen</MenuItem>
                <MenuItem onClick={handleClose}>Close</MenuItem>
            </Menu>

        </ThemeProvider>

    )

}


export default Room;