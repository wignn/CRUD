"use client"
import React, { useEffect } from "react";

const BackgroundVideo = () => {
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    const videoElement = document.getElementById("wallpaper-video");
    videoElement.addEventListener("contextmenu", handleContextMenu);

    return () => {
      videoElement.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <div id="wallpaper-container">
      <video
        autoPlay
        muted
        loop
        playsInline
        id="wallpaper-video"
        src="/video.mp4"
        type="video/mp4"
        disablePictureInPicture
        controlsList="nodownload noplaybackrate"
      />
      <style jsx>{`
        #wallpaper-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: -1; /* Ensure it stays behind other content */
        }

        #wallpaper-video {
          width: 100%;
          height: 100%;
          object-fit: cover; /* Ensures the video covers the whole background */
          pointer-events: none; /* Prevent interactions with the video */
        }
      `}</style>
    </div>
  );
};

export { BackgroundVideo };
