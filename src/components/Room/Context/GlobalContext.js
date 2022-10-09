import {createContext} from 'react';

const GlobalContext = createContext({

    roomId:0,
    roomDescription:"",
    userNicName:"",
    userId:0,
    userPrrivateId:0,
    userApqueId:0,
    isPublishingVideo:false,
    setVideoPublishing:()=>{},
    isPublishingAudio:false,
    setPublishingAudio:()=>{},
    



})

export default GlobalContext;