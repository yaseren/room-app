import * as React from 'react';

import "./room.css"
import Box from '@mui/material/Box';
import { theme } from '../../../theme'

import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';


export default function UserList() {


    return (
        <Box

            sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 2,
                boxShadow: 1,

                color: theme.palette.text.light,
                width: '100%', overflowY: 'hidden',

            }}


            height
        >
            <div className='chat_main'>
                <div className='chat_header'>
                    <div>
                        <ChatIcon fontSize='large' />
                    </div>
                </div>
                <ul id="chat_box">
                    <li class="you">
                        <div class="entete">
                            <span class="status green"></span>
                            <h2>مجید</h2>
                            <h3>10:12AM, Today</h3>
                        </div>
                        <div class="triangle"></div>
                        <div class="message">
                            به نظرت کلود میت خوبه ؟
                        </div>
                    </li>
                    <li class="me">
                        <div class="entete">
                            <h3>10:12AM, Today</h3>
                            <h2>محسن</h2>
                            <span class="status blue"></span>
                        </div>
                        <div class="triangle"></div>
                        <div class="message">
                            آره جالب به نظر میرسه
                        </div>
                    </li>
                    <li class="you">
                        <div class="entete">
                            <h2>علی</h2>
                            <h3>10:12AM, Today</h3>
                            <span class="status blue"></span>
                        </div>
                        <div class="triangle"></div>
                        <div class="message">
                            به نظر منم خووبه
                        </div>
                    </li>
                    <li class="you">
                        <div class="entete">
                            <span class="status green"></span>
                            <h2>محمد</h2>
                            <h3>10:12AM, Today</h3>
                        </div>
                        <div class="triangle"></div>
                        <div class="message">
                            البته خیلی کار داره ،اما با پتانسیلی که از تیم میبینم ، موفق خواهند بود
                        </div>
                    </li>
                    <li class="me">
                        <div class="entete">
                            <h3>10:12AM, Today</h3>
                            <h2>محسن</h2>
                            <span class="status blue"></span>
                        </div>
                        <div class="triangle"></div>
                        <div class="message">
                            منم موافقم ، پر انرژی باشندهمیشه
                        </div>
                    </li>
                    <li class="you">
                        <div class="entete">
                            <h2>مجید</h2>
                            <h3>10:12AM, Today</h3>
                            <span class="status blue"></span>
                        </div>
                        <div class="triangle"></div>
                        <div class="message">
                            آمــبن
                        </div>
                    </li>
                </ul>
                <div className='chat_footer'>
                    <textarea placeholder="Type your message"></textarea>
                    <button className="chat_send">
                        <SendIcon />
                    </button>
                </div>
            </div>
        </Box>
    );
}



