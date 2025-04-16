import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import Home from './pages/Home';
import MiniPlayer from './components/MiniPlayer';
import Sidebar from './components/Sidebar';
import LoadingScreen from './components/LoadingScreen';
import AlbumDetailPage from './components/AlbumDetailPage';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshHome, setRefreshHome] = useState(0);

  // Handle spacebar press for play/pause
  const handleKeyPress = useCallback((event) => {
    // Only handle spacebar if we're not in an input/textarea/contenteditable
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

  // Handle loading screen completion
  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <Router>
      {isLoading && (
        <LoadingScreen onLoadComplete={handleLoadComplete} />
      )}
      <div className={`min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Sidebar refreshHome={() => setRefreshHome(prev => prev + 1)} />
        <main className="pl-0 md:pl-16"> {/* Remove left padding on mobile */}
          <Routes>
            <Route path="/" element={<Home key={refreshHome} />} />
            <Route path="/album/:albumId" element={<AlbumDetailPage isPlaying={isPlaying} onPlayingChange={setIsPlaying} />} />
          </Routes>
        </main>
        <div className="pb-20 md:pb-0"> {/* Add padding at bottom on mobile for MiniPlayer */}
          <MiniPlayer 
            isPlaying={isPlaying}
            onPlayingChange={setIsPlaying}
          />
        </div>
      </div>
    </Router>
  );
}
