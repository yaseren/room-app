import Janus from './janus';

export function attachRemoteFeed(janus, opaqueId, room, publishers, callback) {
	let subscriberHandle = null;

	janus.attach(
		{
			plugin: "janus.plugin.videoroom",
			opaqueId: opaqueId,
			success: function (pluginHandle) {
				subscriberHandle = pluginHandle;
				subscriberHandle.simulcastStarted = false;
				Janus.log("Plugin attached! (" + subscriberHandle.getPlugin() + ", id=" + subscriberHandle.getId() + ")");
				Janus.log("  -- This is a subscriber");
				Janus.log("List of Publisher to subscribe ",publishers);

				let streams = [];

				publishers.forEach(publisher => {
					let pstream = publisher.stream;
					streams.push({
						"feed": publisher.id,
						"mid": pstream.mid,
					})
				

				});


				var subscribe = {
					"request": "join",
					"room": room,
					"ptype": "subscriber",
					"streams": streams
					//"private_id": pvtId ,
					//"data": true
				};

				// if(Janus.webRTCAdapter.browserDetails.browser === "safari" &&
				// 		(publisher.video_codec === "vp9" || (publisher.video_codec === "vp8" && !Janus.safariVp8))) {
				// 	if(publisher.video_codec)
				// 	publisher.video_codec = publisher.video_codec.toUpperCase()
				// 	subscribe["offer_video"] = false;
				// }
				//subscriberHandle.videoCodec = publisher.video_codec;
				console.log("subscribe to : ", subscribe);
				subscriberHandle.send({ "message": subscribe });
			},
			error: function (error) {
				Janus.error("  -- Error attaching plugin...", error);
				callback(subscriberHandle, "error", error);
			},
			onmessage: function (msg, jsep) {
				Janus.debug(" ::: Got a message (subscriber) :::");
				Janus.debug(msg);
				console.log("**** get subscription ", jsep);
				if (jsep !== undefined && jsep !== null) {
					Janus.debug("SUBS: Handling SDP as well...");
					Janus.debug(jsep);
					// Answer and attach
					subscriberHandle.createAnswer(
						{
							jsep: jsep,
							// Add data:true here if you want to subscribe to datachannels as well
							// (obviously only works if the publisher offered them in the first place)
							//	media: { audioSend: false, videoSend: false },	// We want recvonly audio/video
						//	tracks: [		{ type: 'data' }],
							tracks: [],
							success: function (jsep) {
								Janus.debug("Got SDP!");
								Janus.debug(jsep);
								var body = { "request": "start", "room": room };
								subscriberHandle.send({ "message": body, "jsep": jsep });
							},
							error: function (error) {
								Janus.error("WebRTC error:", error);
							}
						});
				}

				const event = msg.videoroom;
                if (event !== undefined && event !== null) {
                    if (event === "joined") {
                        callback(subscriberHandle, "joined", msg)
                    } else if (event === "destroyed") {
                        Janus.warn("The room has been destroyed!");
                        callback(subscriberHandle, "destroyed", event);
                    }
                    // else if (event === "paricipants") {
                    //     Janus.warn("get list of participants ");
                    //     callback(publishHandle, "paricipants", msg);
                    // }  
                    else if (event === "event") {
                        if (msg.error !== undefined && msg.error !== null) {
                            callback(subscriberHandle, "error", msg);
                        } else if (msg.publishers !== undefined && msg.publishers !== null) {
                            Janus.log("Got list of publishers", msg.publishers);
                            callback(subscriberHandle, "publishers", msg);
                        } else if (msg["leaving"] !== undefined && msg["leaving"] !== null) {
                            Janus.log("a user left ", msg);

                            callback(subscriberHandle, "leaving", msg);
                        } else if (msg["unpublished"] !== undefined && msg["unpublished"] !== null) {
                            Janus.log("publisher Unpublished", msg);
                           
                            callback(subscriberHandle, "unpublished", msg)
                        }
                    }
                }


			},
			webrtcState: function (on) {
				Janus.log("Janus says this WebRTC PeerConnection (feed #" + subscriberHandle.id + ") is " + (on ? "up" : "down") + " now");
			},
			onlocalstream: function (stream) {
				// The subscriber stream is recvonly, we don't expect anything here
			},
			onremotetrack: function (track, mid, on) {
				Janus.log("Remote track (mid=" + mid + ") " + (on ? "added" : "removed") + ":", track);
				let stream = {
					track, mid, on
				}
				console.log(stream);
				callback(subscriberHandle, "onremotetrack", stream);
			},
			oncleanup: function () {
				callback(subscriberHandle, "oncleanup");
			}
		});
	return subscriberHandle;
}

export function subscribeRemoteFeed(pluginHandle, publishers) {
	let streams = [];

	publishers.forEach(publisher => {
		let pstream = publisher.stream;
		streams.push({
			"feed": publisher.id,
			"mid": pstream.mid,
		})
		

	});

	console.log("subscribe to : ", streams);
	pluginHandle.send({
		'message': {
			'request': 'subscribe',
			"streams": streams
		}
	})

	return;
}
