
import { useState, useRef } from 'react'
import Login from "./components/Login/Login";
import Room from "./components/Room/Room";


const App = () => {
   const [authenticated,setauthenticated]=useState(false); // برای مرحله توسعه مقدار true پاس داده شده
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
         if(data.userName==="admin"&&data.password==="3126")
         {
            setauthenticated(true);
         }

        
         console.log(data);
        
      } else {
         setauthenticated(false);
         
      }

   }

   if (authenticated) {
      return (
         <Room
         roomName={room}
         >
           
         </Room>
      )
   } else {
      return (
         <Login room={room} linkIsValid={linkIsValid} onLogin={handlLogin}></Login>
      )
   }

}

export default App