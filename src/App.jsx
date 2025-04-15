import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import Home from './pages/Home';
import MiniPlayer from './components/MiniPlayer';
import Sidebar from './components/Sidebar';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);

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

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
        <Sidebar />
        <main className="pl-0 md:pl-16"> {/* Remove left padding on mobile */}
          <Routes>
            <Route path="/" element={<Home />} />
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
