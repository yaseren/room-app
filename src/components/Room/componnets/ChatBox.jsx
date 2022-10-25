import * as React from 'react';

import "./room.css"

const  ChatBox=({messages})=> {

    const chatBox=React.useRef();

    React.useEffect(()=>{

        chatBox.current.scrollTo(0, chatBox.current.scrollHeight)
    })

    function getDateString(jsonDate) {
        var when = new Date();
        if(jsonDate) {
          when = new Date(Date.parse(jsonDate));
        }
       
        return `${when.toLocaleDateString("fa-IR")}-${when.toLocaleTimeString("fa-IR",{ hour: '2-digit', minute: '2-digit' })}`
       
    }

    return (
        <ul id="chat_box" ref={chatBox}>
            {messages.length>0 && (
                messages.map((msg,index)=>{
                    const {name,message}=JSON.parse(msg.data);
                    return (
                        <li key={index} className="me">
                        <div className="entete">
                            <span className="status green"></span>
                            <h3>{getDateString(msg.date)}</h3>
                            {" - "}
                            <h2>{name}</h2>
                        </div>
                        <div className="triangle"></div>
                        <div className="message">
                           {message}
                        </div>
                    </li>
                    )
                })

            )}
      
     
    </ul>
       
    );
}

export default ChatBox;



