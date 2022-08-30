
import { useState, useRef } from 'react'
import Login from "./components/Login/Login";
import Room from "./components/Room/Room";


const App = () => {
   const [authenticated,setauthenticated]=useState(true);
   let room, linkIsValid;
   const urlPath = window.location.pathname.toLocaleLowerCase().split('/');

   if (urlPath[1].startsWith('ch-')) {
      //گرفتن اطلاعات اتاق از سرور 
      //room.name=fetched room description
      room = urlPath[1];
      linkIsValid = true;
   } else {
      room = urlPath;
      linkIsValid = false;
   }
   const handlLogin = (data) => {

      //get data from databse and if user can login ? or guest
      if (data) {

         setauthenticated(true);
        
      } else {
         setauthenticated(false);
         
      }

   }

   if (authenticated) {
      return (
         <Room
         roomName={room}
         >
            This is the room
         </Room>
      )
   } else {
      return (
         <Login room={room} linkIsValid={linkIsValid} onLogin={handlLogin}></Login>
      )
   }

}

export default App