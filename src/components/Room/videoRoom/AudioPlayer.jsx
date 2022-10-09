import { useEffect,useRef } from 'react';
import Janus from '../utils/janus';


const AudioPlayer=({ track })=>{
  const audioPlayer = useRef(null);

  useEffect(() => {
    console.log(track);

    async function attachmedia() {
      if (track) {
          if(track.kind==="audio"){
         
              let audiostrm=new MediaStream([track])
             // Janus.attachMediaStream(audioPlayer.current, audiostrm);
             audioPlayer.current.srcObject = audiostrm;
          }

          // audioPlayer.play();
      }

  }
  attachmedia();

  }, [track])

  return ( 
<audio ref={audioPlayer} autoPlay={true}  playsInline />

   );
}

export default AudioPlayer;