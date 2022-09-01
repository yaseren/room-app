

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
                width: '100%', overflowY: 'scroll',

            }}


            height
        >
            <div className='chat_main'>
                    <div className='chat_header'>
                        <div>
                            <h4>Chat</h4>
                        </div>
                    </div>
                    <ul id="chat_box">
                        <li class="you">
                            <div class="entete">
                                <span class="status green"></span>
                                <h2>Vincent</h2>
                                <h3>10:12AM, Today</h3>
                            </div>
                            <div class="triangle"></div>
                            <div class="message">
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                            </div>
                        </li>
                        <li class="me">
                            <div class="entete">
                                <h3>10:12AM, Today</h3>
                                <h2>Vincent</h2>
                                <span class="status blue"></span>
                            </div>
                            <div class="triangle"></div>
                            <div class="message">
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                            </div>
                        </li>
                        <li class="me">
                            <div class="entete">
                                <h3>10:12AM, Today</h3>
                                <h2>Vincent</h2>
                                <span class="status blue"></span>
                            </div>
                            <div class="triangle"></div>
                            <div class="message">
                                OK
                            </div>
                        </li>
                        <li class="you">
                            <div class="entete">
                                <span class="status green"></span>
                                <h2>Vincent</h2>
                                <h3>10:12AM, Today</h3>
                            </div>
                            <div class="triangle"></div>
                            <div class="message">
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                            </div>
                        </li>
                        <li class="me">
                            <div class="entete">
                                <h3>10:12AM, Today</h3>
                                <h2>Vincent</h2>
                                <span class="status blue"></span>
                            </div>
                            <div class="triangle"></div>
                            <div class="message">
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                            </div>
                        </li>
                        <li class="me">
                            <div class="entete">
                                <h3>10:12AM, Today</h3>
                                <h2>Vincent</h2>
                                <span class="status blue"></span>
                            </div>
                            <div class="triangle"></div>
                            <div class="message">
                                OK
                            </div>
                        </li>
                    </ul>
                    <div className='chat_footer'>
                    <textarea placeholder="Type your message"></textarea>
                    <a href="#">Send</a>
                </div>
                </div>
        </Box>
    );
}



