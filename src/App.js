import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import VideoThumbnail from './components/VideoThumbnail';
import VideoPlayer from './components/VideoPlayer';
import SearchBar from './components/SearchBar'; // Import SearchBar
import LandingPage from './components/LandingPage'; // Import LandingPage component

const YOUTUBE_API_KEY = 'AIzaSyDjVnufagLCUNOBk_faBvU86UsCh7P6_2w';
const YOUTUBE_PLAYLIST_ID = 'PLEPQby6_o7m34KVQslk3BJV-nWgBhD-mk';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [showLandingPage, setShowLandingPage] = useState(true); // Show landing page
  const [isLoading, setIsLoading] = useState(false); // Loading state for videos

  // Memoized function for fetching videos
  const fetchVideos = useCallback(
    async (pageToken = '') => {
      setIsLoading(true); // Start loading
      try {
        const response = await axios.get(
          'https://www.googleapis.com/youtube/v3/playlistItems',
          {
            params: {
              part: 'snippet',
              maxResults: 50, // Max allowed by YouTube API
              playlistId: YOUTUBE_PLAYLIST_ID,
              key: YOUTUBE_API_KEY,
              pageToken: pageToken, // Pass token for pagination
            },
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
            title,
            thumbnail: thumbnailUrl,
            url,
          };
        });

        // Append new videos to the existing list
        setVideos((prevVideos) => [...prevVideos, ...fetchedVideos]);

        // Fetch next page if available
        if (response.data.nextPageToken) {
          fetchVideos(response.data.nextPageToken);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    },
    [] // Empty array because dependencies aren't changing
  );

  // Ensure useEffect only runs when fetchVideos changes
  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

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

  // Start button handler to hide landing page
  const handleStartWatching = () => {
    setShowLandingPage(false);
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

            {/* Loading Spinner */}
            {isLoading && <div className="spinner">Loading...</div>}

            {/* Video Gallery */}
            <div className="video-gallery">
              {videos.map((video) => (
                <div key={video.id} className="video-thumbnail">
                  <VideoThumbnail
                    video={video}
                    onClick={() => setSelectedVideo(video)}
                  />
                  {/* Add delete functionality only if needed */}
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
