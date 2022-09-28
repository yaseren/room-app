import { useEffect, useRef } from 'react';

import Janus from '../utils/janus';




const VideoPlayer = ({ stream }) => {
    const videoPlayer = useRef(null);
    const audioPlayer = useRef(null);

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
                if(stream.kind==="audio"){
                    videoPlayer.current.hide();
                    let audiostrm=new MediaStream([stream])
                    Janus.attachMediaStream(audioPlayer.current, audiostrm);
                    //audioPlayer.current.srcObject = [stream];
                }
                
                // audioPlayer.play();


            }

        }


        attachmedia();
        // videoPlayer.current.muted=false;
    }, [stream])

    return (
        <>
            <video
                style={{
                    height: "auto",
                    width: "65%",
                    margin:'auto',
                    borderRadius:'5%'
                }}

                ref={videoPlayer}
                autoPlay={true}
                playsInline
                


            />

            <audio ref={audioPlayer} autoPlay playsInline />



        </>



    )

}


export default VideoPlayer;