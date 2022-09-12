import Janus from './janus';

export function AttchSubscriberHandler(janus, opaqueId, room, id, pvtId, display, audio, video, callback) {
    let subscriberHandle = null;

    janus.attach(
		{
			plugin: "janus.plugin.videoroom",
			opaqueId: opaqueId,
			success: function(pluginHandle) {
				subscriberHandle = pluginHandle;
				subscriberHandle.simulcastStarted = false;
				Janus.log("Plugin attached! (" + subscriberHandle.getPlugin() + ", id=" + subscriberHandle.getId() + ")");
                Janus.log("  -- This is a subscriber");
                
				var subscribe = { 
                    "request": "join", 
                    "room": room, 
                    "ptype": "subscriber", 
                    "feed": id, 
					"private_id": pvtId ,
					"data": true
                };

				if(Janus.webRTCAdapter.browserDetails.browser === "safari" &&
						(video === "vp9" || (video === "vp8" && !Janus.safariVp8))) {
					if(video)
						video = video.toUpperCase()
					subscribe["offer_video"] = false;
				}
				subscriberHandle.videoCodec = video;
				subscriberHandle.send({"message": subscribe});
			},
			error: function(error) {
                Janus.error("  -- Error attaching plugin...", error);
                callback(subscriberHandle, "error", error);
			},
			onmessage: function(msg, jsep) {
				Janus.debug(" ::: Got a message (subscriber) :::");
                Janus.debug(msg);
                
                if(jsep !== undefined && jsep !== null) {
					Janus.debug("SUBS: Handling SDP as well...");
                    Janus.debug(jsep);
					// Answer and attach
					subscriberHandle.createAnswer(
						{
							jsep: jsep,
							// Add data:true here if you want to subscribe to datachannels as well
							// (obviously only works if the publisher offered them in the first place)
							media: { audioSend: false, videoSend: false },	// We want recvonly audio/video
							success: function(jsep) {
								Janus.debug("Got SDP!");
								Janus.debug(jsep);
								var body = { "request": "start", "room": room };
								subscriberHandle.send({"message": body, "jsep": jsep});
							},
							error: function(error) {
								Janus.error("WebRTC error:", error);
							}
						});
				}
				
			},
			webrtcState: function(on) {
				Janus.log("Janus says this WebRTC PeerConnection (feed #" + subscriberHandle.rfindex + ") is " + (on ? "up" : "down") + " now");
			},
			onlocalstream: function(stream) {
				// The subscriber stream is recvonly, we don't expect anything here
			},
			onremotestream: function(stream) {
                callback(subscriberHandle, "onremotestream", stream);
			},
			oncleanup: function() {
                callback(subscriberHandle, "oncleanup");
			}
        });
    return subscriberHandle;
}
