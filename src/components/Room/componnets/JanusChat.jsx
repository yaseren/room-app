import React, { useRef, useState, useEffect } from 'react';
import { publishChatroom, sendData } from '../utils/chatroom';
import ChatBox from './ChatBox'


import Box from '@mui/material/Box';
import { theme } from '../../../theme'
import "./room.css"
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import { keys } from '@mui/system';

const JanusChat = ({ janus, opaqueId, isPublisher, chatroom, setChatroom, username, display }) => {
    const [chatroomHandler, setChatroomHandler] = useState(null);

    const [currentMessage, setCurrentMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [recvObj, setRecvObj] = useState(null);




    useEffect(() => {
        publishChatroom(janus, opaqueId, isPublisher, chatroom, username, display,
            (_chatroomHandler, eventType, data) => {
                if (eventType === "created") {
                    setChatroom(data);
                } else if (eventType === "joined") {
                    setChatroomHandler(_chatroomHandler);
                } else if (eventType === "ondata") {
                    setRecvObj(data)
                    // addmessage(data)
                    // setMessages([...messages, data]);

                    //  console.log(data);
                }
            }
        );

    }, [janus]);

    useEffect(() => {
        addmessage(recvObj)
    }, [recvObj])

    const addmessage = async (msg) => {
        if (msg) {
            let list = [...messages];
            //list = list.concat()
            setMessages([...list, msg]);
            return "receive messages: " + list
        }


    }

    const onMessageSend = () => {
        // setMessages([...messages, currentMessage]);
        let msg = {
            name: display,
            message: currentMessage,
        }
        sendData(chatroomHandler, chatroom, JSON.stringify(msg));
        setCurrentMessage("");
    }

    const onInputChane = (e) => {

        setCurrentMessage(e.target.value)

    }

    const onInputEnter=(e)=>{
        if (e.key === "Enter") {
            // Cancel the default action, if needed
            e.preventDefault();
            // Trigger the button element with a click
            onMessageSend();
        }
    }


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
                        <span style={{ fontSize: 10 }}>{messages.length}</span>  <ChatIcon fontSize='large' />
                    </div>
                </div>
                {messages && (
                    <ChatBox messages={messages} />
                )}

                <div className='chat_footer'>
                    <input type="text" placeholder="متن پیام شما" value={currentMessage} onChange={(e) => onInputChane(e)} onKeyUp={(e)=>{onInputEnter(e)}} />
                    <button className="chat_send" onClick={onMessageSend} >
                        <SendIcon />
                    </button>
                </div>
            </div>
        </Box>

    )
};

export default JanusChat;