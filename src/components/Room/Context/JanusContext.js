import {createContext} from 'react'

const JanusContext= createContext({
janusInstanse:{},
setJanusInstanse:()=>{},
janusPublishHandler:{},
setJanusPublishHandler:()=>{},
janusSubscribeHandler:{},
setJanusSubscribeHandler:()=>{},
janusChatHandler:{},
setJanusChatHandler:()=>{},
});

export default JanusContext;