import { useEffect, useRef } from 'react';




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

                console.log(stream.getAudioTracks()[0]);

                audioPlayer.current.srcObject = stream;
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
                muted


            />

            <audio ref={audioPlayer} autoPlay playsInline />



        </>



    )

}


export default VideoPlayer;