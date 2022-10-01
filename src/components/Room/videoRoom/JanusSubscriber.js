import React, { useState, useEffect } from 'react';

import { subscribeRemoteFeed, sendData } from '../utils/subscriber';
import VideoGrid from './grids/VideoGrid';
import AudioPlayer from './AudioPlayer';


const JanusSubscriber = ({ janus, opaqueId, room, pubId, pubPvtId, children, subscribeList }) => {



    const [remoteFeed, setRemoteFeed] = useState(null);
    // const [remoteStream, setRemoteStream] = useState([]);
    const [videoTracks, setVideoTracks] = useState([]);
    const [audioTracks, setAudioTracks] = useState([]);

    const [trackRemoveQueue, setTrackRemoveQueue] = useState([]);


    const addMediaTrack = (mediaTrack) => {

        if (mediaTrack.kind === "video") {
            let streams = videoTracks;
            let dmedia = streams.filter(f => {
                return f.id === mediaTrack.id
            })
            if (dmedia.length === 0) {
                streams.push(mediaTrack);
                setVideoTracks(streams);
            }
            //! remove video from remove que
            clearQue(mediaTrack);
            //!-----------------------------
            console.log("remote video tracks array ==>>", videoTracks);


        } else if (mediaTrack.kind === "audio") {

            let streams = audioTracks;
            let dmedia = streams.filter(f => {
                return f.id === mediaTrack.id
            })
            if (dmedia.length === 0) {
                streams.push(mediaTrack);
                setAudioTracks(streams);
            }

            //! remove audio from remove que
            clearQue(mediaTrack);
            //!-----------------------------
            console.log("remote audio tracks array ==>>", audioTracks);

        }

        console.log("list of que to remove media track : ", trackRemoveQueue);


    }

    const removeTrack = (mediaTrack) => {
        let list = trackRemoveQueue;
        list.push(mediaTrack);
        setTrackRemoveQueue(list);
        console.log("list of que to remove media track : ", trackRemoveQueue);
        setTimeout(removeMediaTrack(), 5000)

    }


    const removeMediaTrack = () => {

        trackRemoveQueue.forEach(mediaTrack => {
            if (mediaTrack.kind === "video") {
                let streams = videoTracks;
                let FilteredStreams = streams.filter(f => {
                    return f.id !== mediaTrack.id
                })
                setVideoTracks(FilteredStreams);
                console.log("remote video tracks array ==>>", videoTracks);

            } else if (mediaTrack.kind === "audio") {

                let streams = audioTracks;
                let FilteredStreams = streams.filter(f => {
                    return f.id !== mediaTrack.id
                })
                setAudioTracks(FilteredStreams);
                console.log("remote audio tracks array ==>>", audioTracks);

            }

            clearQue(mediaTrack);
           

        })


    }

    const clearQue = (mediaTrack) => {
        let clearedque = trackRemoveQueue.filter(f => {
            return f.id !== mediaTrack.id
        })
        setTrackRemoveQueue(clearedque);
        console.log("list of que to remove media track : ", trackRemoveQueue);
    }

    const remoteFeedCallback = (_remoteFeed, eventType, data) => {
        setRemoteFeed(_remoteFeed);
        if (eventType === "onremotetrack") {
            if (data.on) {
                addMediaTrack(data.track)

            } else {
                removeTrack(data.track)
                //  removeMediaTrack(data.track)
            }
            // const videoContainer = videoArea.current;
            //const videoPlayer = videoContainer.querySelector(".janus-video-player")

            // Janus.attachMediaStream(videoPlayer, remoteStream);
            //    console.log("get tracks",data.getTracks());

            if (_remoteFeed.webrtcStuff.pc.iceConnectionState !== "completed" &&
                _remoteFeed.webrtcStuff.pc.iceConnectionState !== "connected") {

            }
            // var videoTracks = remoteStream.getVideoTracks();
            // if (videoTracks === null || videoTracks === undefined || videoTracks.length === 0) {

            // }
        } else if (eventType === "oncleanup") {

        } else if (eventType === "error") {

        }
    }

    useEffect(() => {
        console.log("----------janus subscriber component useEffect executed: ", subscribeList);
        if (subscribeList.length > 0) {
            let publisher = subscribeList[0];
            console.log("publisher to register ", publisher);
            const { id, display, audio_codec, video_codec } = publisher;
            subscribeRemoteFeed(janus, opaqueId, room, publisher, remoteFeedCallback);
        }


    }, [subscribeList])


    return (
        <>
            <p>videos: {videoTracks.length} audioTracks: {audioTracks.length}</p>
            <VideoGrid sources={videoTracks} />

            {
                audioTracks.length > 0 && (
                    <>
                        {
                            audioTracks.map(track => {
                                return (
                                    <AudioPlayer
                                        key={track.id}
                                        track={track}
                                    />
                                )
                            })
                        }
                    </>

                )
            }
        </>

    )
};

export default JanusSubscriber;