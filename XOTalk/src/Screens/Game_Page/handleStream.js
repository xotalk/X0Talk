import { client } from './client';

// This function will enable or disable audio stream
export function handleAudioStream(element) {
  element.addEventListener("click", async () => {
    // Reference to the button to enable/disable audio
    const audioRef = document.querySelector("#audio");
    // If audio stream is disabled, then enable it
    if (audioRef.textContent == "Disable Audio") {
      // This will disable the audio stream and other participants will not be able to hear you
      await client.localPeer.disableAudio();
      audioRef.textContent = "Enable Audio";
    } else {
      // This will enable the audio stream and other participants will be able to hear you
      await client.localPeer.enableAudio();
      audioRef.textContent = "Disable Audio";
    }
  });
}

// This function will enable or disable video stream
export function handleVideoStream(element) {
  element.addEventListener('click', async () => {

    // Reference to the button to enable/disable video
    const videoRef = document.querySelector('#videoRef');

    // If video stream is already enabled, then disable it
    if (videoRef.srcObject) {
      client.localPeer.disableVideo();
      videoRef.srcObject = null;
      document.querySelector('#video').textContent = 'Enable Video';
      return;
    }

    // This will fetch video stream and return MediaStream 
    const stream = await client.localPeer.enableVideo();

    // This will set the stream to the video element
    videoRef.srcObject = stream;
    videoRef.onloadedmetadata = async () => {
      try {
        await videoRef.play();
        document.querySelector('#video').textContent = 'Disable Video';
      } catch (error) {
        console.error(error);
      }
    };
  });
}

// This function will enable or disable screen share
export function handleScreenStream(element) {
  element.addEventListener('click', async () => {

    // Reference to the button to enable/disable screen share
    const screenRef = document.querySelector('#screenRef');

    // If screen share is already enabled, then disable it
    if (screenRef.srcObject) {
      client.localPeer.stopScreenShare();
      screenRef.srcObject = null;
      document.querySelector('#screen').textContent = 'Share Screen';
      return;
    }

    // This will fetch screen share stream and return MediaStream
    const stream = await client.localPeer.startScreenShare();

    // This will set the stream to the video element
    screenRef.srcObject = stream;
    screenRef.onloadedmetadata = async () => {
      try {
        await screenRef.play();
        document.querySelector('#screen').textContent = 'Stop Sharing';
      } catch (error) {
        console.error(error);
      }
    };
  });
}
