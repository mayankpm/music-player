import { useState, useEffect, useCallback } from 'react';
import { PlayerContext } from './context';

export function PlayerProvider({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({
    title: "Starboy",
    artist: "The Weeknd",
    album: "Starboy",
    duration: "3:50",
    cover: "/album1.jpg"
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState({
    title: "Starboy",
    artist: "The Weeknd",
    year: "2016",
    cover: "/album1.jpg",
    tracks: [
      { id: 1, title: "Starboy", duration: "3:50" },
      { id: 2, title: "Party Monster", duration: "4:09" },
      { id: 3, title: "False Alarm", duration: "3:40" },
      { id: 4, title: "Reminder", duration: "3:38" },
      { id: 5, title: "Rockin'", duration: "3:52" },
    ]
  });

  // Handle spacebar controls
  const handleKeyPress = useCallback((event) => {
    // Only handle spacebar if we're not in an input/textarea
    if (event.code === 'Space' && 
        !(event.target.tagName === 'INPUT' || 
          event.target.tagName === 'TEXTAREA' || 
          event.target.isContentEditable)) {
      event.preventDefault(); // Prevent page scroll
      setIsPlaying(prev => !prev);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <PlayerContext.Provider value={{
      isExpanded,
      setIsExpanded,
      currentTrack,
      setCurrentTrack,
      isPlaying,
      setIsPlaying,
      currentAlbum,
      setCurrentAlbum
    }}>
      {children}
    </PlayerContext.Provider>
  );
}
