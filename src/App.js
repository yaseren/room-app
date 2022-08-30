import { styled } from '@mui/material/styles';

import Grid from '@mui/material/Grid';

import RoomHeader from "./components/Header/RoomHeader";
import UsersList from "./components/UsersList/UsersList";
import ChatPanel from "./components/ChatPanel/ChatPanel";
import MainPanel from "./components/MainPanel/MainPanel";
import RoomFooter from "./components/Footer/RoomFooter";


const App = () => {
   return (
 
         <Grid container spacing={1} padding={2} >
            <Grid setHight  md={12} xs={12}>

               <RoomHeader></RoomHeader>
            </Grid>

            <Grid  md={10} xs={12}>
               <MainPanel>
               </MainPanel>

            </Grid>
            <Grid  md={2} xs={12}>

               <UsersList ></UsersList>
               <ChatPanel></ChatPanel>
            </Grid>
            <Grid  md={12} xs={12}>
               <RoomFooter>toolbar</RoomFooter>
            </Grid>
         </Grid>

   

   )
}

export default App