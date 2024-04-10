import { client } from "./client";

// This function needs to be called in app.js file
export function handleEvents() {

    // This event will be triggered when a new stream is added to the room
    client.room.on("stream-added", ({ peerId, label }) => {
        const container = document.querySelector("#remotePeers");

        // Create a new video element to show the remote stream
        let mediaRef = document.createElement("video");

        // If the stream is audio, then create audio element
        if (label == "audio") {
            mediaRef = document.createElement("audio");
        }

        // Get the track of remote peer from the room by getting the remote peer's consumer
        const remoteTrack = client.room
            .getRemotePeerById(peerId)
            ?.getConsumer(label)?.track;

        // Create a new media stream from the remote track and set it to the media element
        mediaRef.srcObject = new MediaStream([remoteTrack]);
        mediaRef.id = `${peerId}-${label}`;
        mediaRef.autoplay = true;

        // If the stream is video, then mute it
        if (label == "video") {
            mediaRef.muted = true;
        }
        mediaRef.className = "border-2 rounded-xl border-white-400 aspect-video";
        container.appendChild(mediaRef);
    });

    // This event will be triggered when a stream is closed in the room
    client.room.on("stream-closed", ({ peerId, label }) => {
        // Get the reference of media element    
        const mediaRef = document.querySelector(`#${peerId}-${label}`);
        // Stop the track and remove the media element
        mediaRef.srcObject.getTracks().forEach((track) => track.stop());
        mediaRef.srcObject = null;
        mediaRef.remove();
    });
}