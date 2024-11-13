import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import VideoThumbnail from './components/VideoThumbnail';

import VideoPlayer from './components/VideoPlayer';
// import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar'; // Import SearchBar

const YOUTUBE_API_KEY = 'AIzaSyDjVnufagLCUNOBk_faBvU86UsCh7P6_2w';
const YOUTUBE_PLAYLIST_ID = 'PLUy3kPVdQjN8PQB6lseAatwThsXfAvh7L';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State to handle search term

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems`,
        {
          params: {
            part: 'snippet',
            maxResults: 140, // Set to 100 to fetch more videos
            playlistId: YOUTUBE_PLAYLIST_ID,
            key: YOUTUBE_API_KEY
          }
        }
      );

      const fetchedVideos = response.data.items.map((item) => {
        const snippet = item.snippet;
        const videoId = snippet?.resourceId?.videoId;
        const title = snippet?.title;
        const thumbnailUrl = snippet?.thumbnails?.high?.url;
        const url = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

        return {
          id: videoId,
          title: title,
          thumbnail: thumbnailUrl,
          url: url,
        };
      });

      setVideos(fetchedVideos);
      setSelectedVideo(fetchedVideos[0]); // Set the first video as selected
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  // Remove a video from the videos list
  const removeVideo = (videoId) => {
    setVideos(videos.filter((video) => video.id !== videoId));
    // If the deleted video was selected, set the first remaining video as selected
    if (selectedVideo?.id === videoId) {
      setSelectedVideo(videos.length > 1 ? videos[0] : null);
    }
  };

  const handleSearch = () => {
    if (searchTerm) {
      const filteredVideos = videos.filter((video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setVideos(filteredVideos);
    } else {
      fetchVideos();
    }
  };

  return (
    <div className="App">
      {/* Header with SearchBar */}
      <Header>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />
      </Header>

      <main>
        {/* Video Player */}
        {selectedVideo && (
          <VideoPlayer url={selectedVideo.url} title={selectedVideo.title} />
        )}

        {/* Video Gallery with 6 columns */}
        <div className="video-gallery">
          {videos.map((video) => (
            <div key={video.id} className="video-thumbnail">
              <VideoThumbnail
                video={video}
                onClick={() => setSelectedVideo(video)}
              />
              <button onClick={() => removeVideo(video.id)}>Delete</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
