import { useEffect } from "react";

function YouTubePlayer({ videoId, onReady, onPlay, onPause, onEnd }) {
  useEffect(() => {
    // Load the IFrame Player API code asynchronously.
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // This function creates an <iframe> (and YouTube player)
    // after the API code downloads.
    window.onYouTubeIframeAPIReady = () => {
      window.player = new window.YT.Player('player', {
        height: '360',
        width: '640',
        videoId: videoId,
        events: {
          'onReady': onReady,
          'onStateChange': onPlayerStateChange
        }
      });
    };

    function onPlayerStateChange(event) {
      switch (event.data) {
        case window.YT.PlayerState.PLAYING:
          onPlay();
          break;
        case window.YT.PlayerState.PAUSED:
          onPause();
          break;
        case window.YT.PlayerState.ENDED:
          onEnd();
          break;
        default:
          break;
      }
    }
  }, [videoId, onReady, onPlay, onPause, onEnd]);

  return <div id="player"></div>;
}

export default YouTubePlayer;
