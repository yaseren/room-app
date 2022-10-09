import { useEffect, useRef } from 'react';

import Janus from '../utils/janus';




const VideoPlayer = ({ stream ,style}) => {
    const videoPlayer = useRef(null);
  
    useEffect(() => {
        async function attachmedia() {
            if (stream) {
                console.log(stream);
                //Janus.attachMediaStream(videoPlayer.current, stream);
                // const url = URL.createObjectURL(stream);
                if(stream.kind==="video"){
                 let videoStream=new MediaStream([stream])
                 console.log(videoStream);
               // videoPlayer.current.srcObject = videoStream;
                Janus.attachMediaStream(videoPlayer.current, videoStream);
                }
 
            }

        }
        attachmedia();
        // videoPlayer.current.muted=false;
    }, [])

    return (
        <>
        {
          
            
         <video
                style={style ? style :{
                    height: "auto",
                  //  width: "65%",
                    margin:'auto',
                    borderRadius:'5px'
                }}

                ref={videoPlayer}
                autoPlay={true}
                playsInline
                


            />
        }
           
        </>



    )

}


export default VideoPlayer;