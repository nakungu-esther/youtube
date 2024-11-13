// src/components/VideoPlayer.js
import React from 'react';

const VideoPlayer = ({ url, title }) => {
  return (
    <div className="video-player">
      <iframe
        src={url}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <h2>{title}</h2>
    </div>
  );
};

export default VideoPlayer;
