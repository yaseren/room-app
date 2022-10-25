import React, { useState, useEffect } from 'react';

import { subscribeRemoteFeed, attachRemoteFeed } from '../utils/subscriber';
import VideoGrid from './grids/VideoGrid';
import AudioPlayer from './AudioPlayer';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VideocamIcon from '@mui/icons-material/Videocam';

const JanusSubscriber = ({ janus, opaqueId, room, roomTitle, pubId, pubPvtId, publishers, unpublished }) => {

    const [remoteFeedHandler, setRemoteFeedHandler] = useState(null);
    // const [remoteStream, setRemoteStream] = useState([]);
    const [videoTracks, setVideoTracks] = useState([]);
    const [audioTracks, setAudioTracks] = useState([]);
    const [feeds, setFeeds] = useState([]);

    const remoteFeedCallback = (_remoteFeed, eventType, data) => {
        if (!remoteFeedHandler) {
            setRemoteFeedHandler(_remoteFeed);
        }
        if (eventType === "onremotetrack") {
            console.log("remote track ", data);
            handleMedia(data);
            // if (data.on) {
            //     addMediaTrack(data.track)

            // } else {
            //     removeTrack(data.track)
            //     //  removeMediaTrack(data.track)
            // }
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

    useEffect(()=>{
    console.log("--janus subscriber to janus useEffect executed: ");
    attachRemoteFeed(janus, opaqueId, room, [], remoteFeedCallback);


    },[janus])
  
   //! وصل شدن به استریم های پابلیشر ها
   useEffect(() => {
    console.log("--janus subscriber to publisher useEffect executed: ", publishers);
    if (publishers.length > 0) {
        let toSubscribe = [];
        let feedlist = feeds;

        publishers.forEach((pub) => {
            let publisherStreams = pub.streams;
            publisherStreams.map(stream => {
                let dstream = feeds.find(str => {
                    return str.mid === stream.mid
                })
                if (!dstream) {//! این استریم در فید هایی که قبلا متصل شده ایم وجود ندارد
                    let newStream = { id: pub.id, stream };
                    toSubscribe.push(newStream);
                    
                    feedlist = [...feedlist, { id: pub.id, mid: stream.mid, track: null, enabled: false }]
                

                }
            })
        })
        setFeeds([...feedlist]);
        console.log("feeds ", feeds);

        console.log("publisher to register ", toSubscribe);
        // const { id, display, audio_codec, video_codec } = publishers;
        if (toSubscribe.length > 0) {
            if (remoteFeedHandler) {
                subscribeRemoteFeed(remoteFeedHandler, toSubscribe, remoteFeedCallback)
                console.log("subscribe Only to ", toSubscribe);
            } else {
                //! فقط به آنهایی که تا لان متصل نشدم متصل شویم
                attachRemoteFeed(janus, opaqueId, room, toSubscribe, remoteFeedCallback);
                console.log("attach and Subscribe to: ", toSubscribe);

            }
        }

    }


}, [publishers])
    //* new codes

    const handleMedia = (stream) => {
        let streamList = [...feeds];
        if (stream !== null && stream !== "undefined") {
            console.log("handle stream", stream);
            console.log("feeds", streamList,feeds);
            let feedindex = streamList.findIndex((fee) => {// find stream in feeds array
                return fee.mid == stream.mid;
            })
            let feed = streamList[feedindex];
            console.log("feed is", feed, feedindex);

            if (feed !== null && feed !== "undefined") {
                if (stream.on) { //if remote track become enabled

                    if (!feed.track) {//track of feed ==null
                        feed.track = stream.track;
                    }
                    feed.enabled = true;


                } else { //if remote track become disabled
                    feed.enabled = false;

                }

                streamList[feedindex] = feed;
                setFeeds([...streamList]);
                console.log("feeds ", feeds);
            }
        }

    }

    useEffect(() => {
        console.log("list of feeds", feeds);
        feeds.map(feed => {
            if (feed.track != null) {
                let track = feed.track;
                if (track.kind === "video") {
                    let videolist = videoTracks;
                    videolist.push(feed);
                    setVideoTracks([...videolist]);

                } else if (track.kind === "audio") {
                    let audioList = audioTracks;
                    audioList.push(feed);
                    setAudioTracks([...audioList]);

                }
            }
        })

    }, [feeds])

    //* new code end

  


    //! یک پابلیشر ،استریم خود را قطع کرده است و باید استریم های آن حذف شود
    useEffect(() => {
        //! با اجرای این کد تمام استریم های مرتبط با کاربر حذف میش ود
        //!، ?آیا می توان فقط استریم های مرتبط با یک استریم خاص را حذف نمود
        let newList = feeds.filter(feed => {
            return feed.id !== unpublished
        })

        setFeeds([...newList]);

    }, [unpublished])


 

    return (
        <>
            <span style={{ fontSize: 12, width: '100%' }}>{roomTitle}  -  <VideocamIcon fontSize='inherit' /> {videoTracks.length} <VolumeUpIcon fontSize='inherit' /> {audioTracks.length}</span>

            <VideoGrid sources={videoTracks} />

            {
                audioTracks.length > 0 && (
                    <>
                        {
                            audioTracks.map(feed => {
                                return (
                                    <AudioPlayer
                                        key={feed.track.mid}
                                        track={feed.track}
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