// src/components/VideoThumbnail.js
import React from 'react';

const VideoThumbnail = ({ video, onClick }) => {
  return (
    <div className="video-thumbnail" onClick={onClick}>
      <img src={video.thumbnail} alt={video.title} />
      <p>{video.title}</p>
    </div>
  );
};

export default VideoThumbnail;
