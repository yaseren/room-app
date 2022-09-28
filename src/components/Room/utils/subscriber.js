import Janus from './janus';

export function subscribeRemoteFeed(janus, opaqueId, room,publisher, callback) {
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
                    "streams":[
						{
							"feed":publisher.id
						},
					]
					//"private_id": pvtId ,
					//"data": true
                };

				if(Janus.webRTCAdapter.browserDetails.browser === "safari" &&
						(publisher.video_codec === "vp9" || (publisher.video_codec === "vp8" && !Janus.safariVp8))) {
					if(publisher.video_codec)
					publisher.video_codec = publisher.video_codec.toUpperCase()
					subscribe["offer_video"] = false;
				}
				subscriberHandle.videoCodec = publisher.video_codec;
				console.log("subscribe to : ",subscribe);
				subscriberHandle.send({"message": subscribe});
			},
			error: function(error) {
                Janus.error("  -- Error attaching plugin...", error);
                callback(subscriberHandle, "error", error);
			},
			onmessage: function(msg, jsep) {
				Janus.debug(" ::: Got a message (subscriber) :::");
                Janus.debug(msg);
                console.log("**** get subscription ",jsep);
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
				Janus.log("Janus says this WebRTC PeerConnection (feed #" + subscriberHandle.id + ") is " + (on ? "up" : "down") + " now");
			},
			onlocalstream: function(stream) {
				// The subscriber stream is recvonly, we don't expect anything here
			},
			onremotetrack: function(track,mid,on) {
				Janus.debug("Remote track (mid=" + mid + ") " + (on ? "added" : "removed") + ":", track);
				let stream={
					track ,mid,on
				}
				console.log(stream);
                callback(subscriberHandle, "onremotestream", stream);
			},
			oncleanup: function() {
                callback(subscriberHandle, "oncleanup");
			}
        });
    return subscriberHandle;
}
