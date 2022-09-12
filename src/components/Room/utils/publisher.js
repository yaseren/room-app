import Janus from './janus';
// publisher helper

export function AttchPublisherHandler(janus, opaqueId, room, secret,
    pin, username, isPublisher, callback) {
    let publishHandle = null;
    let mystream = null;

    if (!janus) {
        return;
    }

    janus.attach(
        {
            plugin: "janus.plugin.videoroom",
            opaqueId: opaqueId,
            success: function (pluginHandle) {
                publishHandle = pluginHandle;
                Janus.log("  -- This is a publisher/manager ss");
                //!start yass codes
                if (isPublisher) {
                    var register = {
                        "request": "join",
                        "room": room,
                        "ptype": "publisher",
                        "display": username || "guest_publisher"
                    };
                    publishHandle.send({ message: register });
                }

                //! end yass code


            //#region //! orgin codes
                
                // if room is available
                // if(isPublisher){    
                //     const create = {
                //         "request": "create",
                //         "notify_joining": true,
                //         room,
                //         secret,
                //         pin
                //     };
                //     // send message to create new room
                //     publishHandle.send({
                //         message: create,
                //         success: (data) => {
                //             // check if room create is okay
                //             if (data.videoroom && data.videoroom === "created") {
                //                 // now register ourselves

                //                 var register = {
                //                     "request": "join",
                //                     "room": data.room,
                //                     "ptype": "publisher",
                //                     "display": username
                //                 };
                //                 publishHandle.send({ message: register });

                //                 callback(publishHandle, "created", data);
                //             }
                //         },
                //         error: (error) => {
                //             console.log("Error creating room " + error);
                //         }
                //     });
                // }else{
                //     var register = {
                //         "request": "join",
                //         "room": room,
                //         "ptype": "publisher",
                //         "display": username || "guest_publisher"
                //     };
                //     publishHandle.send({ message: register });
                // }

    //#endregion
            },
            error: function (error) {
                Janus.log("  -- Error attaching plugin...", error);
                callback(publishHandle, "error", error);
            },
            consentDialog: function (on) {
                Janus.debug("Consent dialog should be " + (on ? "on" : "off") + " now");

            },
            mediaState: function (medium, on) {
                Janus.log("Janus " + (on ? "started" : "stopped") + " receiving our " + medium);
            },
            webrtcState: function (on) {
                Janus.log("Janus says our WebRTC PeerConnection is " + (on ? "up" : "down") + " now");

            },
            onmessage: function (msg, jsep) {
                Janus.debug(" ::: Got a message (publisher) :::");
                Janus.debug(msg);

                Janus.log("Got message", msg);

                const event = msg.videoroom;
                if (event != undefined && event != null) {
                    if (event === "joined") {
                        callback(publishHandle, "joined", msg)
                    } else if (event === "destroyed") {
                        Janus.warn("The room has been destroyed!");
                        callback(publishHandle, "destroyed", event);
                    } else if (event === "event") {
                        if (msg.error !== undefined && msg.error !== null) {
                            callback(publishHandle, "error", msg);
                        } else if (msg.publishers !== undefined && msg.publishers !== null) {
                            callback(publishHandle, "publishers", msg);
                        } else if (msg["leaving"] !== undefined && msg["leaving"] !== null) {
                            callback(publishHandle, "leaving", msg);
                        } else if (msg["unpublished"] !== undefined && msg["unpublished"] !== null) {
                            callback(publishHandle, "unpublished", msg)
                        }
                    }
                }

                if (jsep !== undefined && jsep !== null) {
                    Janus.debug("Handling SDP as well...");
                    Janus.debug(jsep);
                    publishHandle.handleRemoteJsep({ jsep: jsep });
                    // Check if any of the media we wanted to publish has
                    // been rejected (e.g., wrong or unsupported codec)
                    var audio = msg["audio_codec"];
                    if (mystream && mystream.getAudioTracks() && mystream.getAudioTracks().length > 0 && !audio) {
                        // Audio has been rejected
                        Janus.log("Our audio stream has been rejected, viewers won't hear us");
                    }
                    var video = msg["video_codec"];
                    if (mystream && mystream.getVideoTracks() && mystream.getVideoTracks().length > 0 && !video) {
                        Janus.log("Our video stream has been rejected, viewers won't see us");
                    }
                }
            },
            onlocalstream: function (stream) {
                Janus.debug(" ::: Got a local stream :::");
                mystream = stream;
                callback(publishHandle, "onlocalstream", stream);
            },
            onremotestream: function (stream) {
                // The publisher stream is sendonly, we don't expect anything here
            },
            oncleanup: function () {
                Janus.log(" ::: Got a cleanup notification: we are unpublished now :::");
                callback(publishHandle, "oncleanup");
            }
        }
    );

    return publishHandle;
}

export function publishOwnFeed(publishHandle,useVideo, useAudio) {
    // Publish our stream
    publishHandle.createOffer(
        {
            // Add data:true here if you want to publish datachannels as well
            media: { audioRecv: false, videoRecv: false, audioSend: useAudio, videoSend: useVideo },
            simulcast: false,
            success: function (jsep) {
                Janus.debug("Got publisher SDP!");
                Janus.debug(jsep);

                var publish = { "request": "publish", "audio": useAudio, "video": useVideo };
                publishHandle.send({ "message": publish, "jsep": jsep });
            },
            error: function (error) {
                Janus.error("WebRTC error:", error);
                if (useAudio) {
                    publishOwnFeed(publishHandle, false ,useAudio);
                    return;
                } else {
                    Janus.log("Error publishing feed: " + error);
                    return
                }
               
            }
        });
}

export function publishOwnAuidoFeed(publishHandle, useAudio) {
    // Publish our stream
    publishHandle.createOffer(
        {
            // Add data:true here if you want to publish datachannels as well
            media: { audioRecv: false, videoRecv: false, audioSend: useAudio, videoSend: false },
            simulcast: false,
            success: function (jsep) {
                Janus.debug("Got publisher SDP!");
                Janus.debug(jsep);

                var publish = { "request": "publish", "audio": useAudio, "video": false };
                publishHandle.send({ "message": publish, "jsep": jsep });
            },
            error: function (error) {
                Janus.error("WebRTC error:", error);
                
                    Janus.log("Error publishing feed: " + error);
                    return             
            }
        });
}

export function unpublishOwnFeed(publishHandle) {
    // Unpublish our stream
    var unpublish = { "request": "unpublish" };
    publishHandle.send({ "message": unpublish });
    publishHandle.hangup();
}
