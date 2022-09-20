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
                videoPlayer.current.srcObject = stream;

                console.log(audioPlayer);

                audioPlayer.current.srcObject=stream.getAudioTracks();
            

            }

        }


        attachmedia();
        // videoPlayer.current.muted=false;
    }, [stream])


    // useEffect(() => {
    //     console.log("unmute video ");
    //     console.log(videoPlayer);
    //    // videoPlayer.current.muted = false;
      
    // }, [])


    return (
<>
<video
            ref={videoPlayer}
            autoPlay={true}
            playsInline
            muted


        />

        <audio  ref={audioPlayer} autoPlay playsInline controls />

        

</>
       


    )

}


export default VideoPlayer;