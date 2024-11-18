import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import VideoThumbnail from './components/VideoThumbnail';
import VideoPlayer from './components/VideoPlayer';
import SearchBar from './components/SearchBar'; // Import SearchBar
import LandingPage from './components/LandingPage'; // Import the new LandingPage component

const YOUTUBE_API_KEY = 'AIzaSyDjVnufagLCUNOBk_faBvU86UsCh7P6_2w';
const YOUTUBE_PLAYLIST_ID = 'PLUy3kPVdQjN8PQB6lseAatwThsXfAvh7L';


const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State to handle search term
  const [showLandingPage, setShowLandingPage] = useState(true); // State to handle landing page visibility

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
            maxResults: 140,
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

  // Start button handler to remove the landing page
  const handleStartWatching = () => {
    setShowLandingPage(false);
  };

  // Function to remove a video by its ID
  const removeVideo = (videoId) => {
    const updatedVideos = videos.filter(video => video.id !== videoId);
    setVideos(updatedVideos); // Update the state with the new list of videos
  };

  return (
    <div className="App">
      {/* Conditionally render LandingPage or main content */}
      {showLandingPage ? (
        <LandingPage onStart={handleStartWatching} />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default App;
