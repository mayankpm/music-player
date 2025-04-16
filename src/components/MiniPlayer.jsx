import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function MiniPlayer({ isPlaying, onPlayingChange }) {
  const [imageError, setImageError] = useState(false);
  const [progress, setProgress] = useState(0);   // 0..100
  const [isDragging, setIsDragging] = useState(false);
  const [wasPlayingBeforeDrag, setWasPlayingBeforeDrag] = useState(false);
  const [duration, setDuration] = useState(0); // Store actual song duration in seconds
  const [currentTime, setCurrentTime] = useState(0); // Current time in seconds
  
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const requestRef = useRef(null);

  // Initialize audio on component mount
  useEffect(() => {
    const audio = new Audio('/comfortable.mp3');
    audioRef.current = audio;
    
    // Get audio duration when metadata is loaded
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    
    // Handle audio ending
    audio.addEventListener('ended', () => {
      setProgress(100);
      onPlayingChange(false);
    });
    
    return () => {
      cancelAnimationFrame(requestRef.current);
      audioRef.current.pause();
      audioRef.current.src = '';
    };
  }, []);

  // Update progress during playback function
  const updateAudioProgress = () => {
    if (audioRef.current && !isDragging) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress((audioRef.current.currentTime / duration) * 100);
      
      if (isPlaying && !isDragging) {
        requestRef.current = requestAnimationFrame(updateAudioProgress);
      }
    }
  };

  // Handle playback state changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Playback error:", error);
          onPlayingChange(false);
        });
        // Start progress updates
        requestRef.current = requestAnimationFrame(updateAudioProgress);
      } else {
        audioRef.current.pause();
        cancelAnimationFrame(requestRef.current);
      }
    }
    
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, isDragging, duration]);

  // Format time to mm:ss
  function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${String(secs).padStart(2, '0')}`;
  }

  const togglePlay = () => {
    // If not playing but progress is finished, reset progress and time
    if (!isPlaying && progress >= 100) {
      setProgress(0);
      setCurrentTime(0);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    }
    onPlayingChange(!isPlaying);
  };

  const handleSeek = (e) => {
    if (!progressBarRef.current || !duration) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    const seekTime = (percentage / 100) * duration;
    
    // Smooth dragging: round to 2 decimal places
    setProgress(Math.round(percentage * 100) / 100);
    setCurrentTime(seekTime);
    
    // Update audio position when seeking
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const handleMouseDown = (e) => {
    setWasPlayingBeforeDrag(isPlaying);  // Store current play state
    setIsDragging(true);
    if (isPlaying) {
      onPlayingChange(false);  // Pause while dragging
    }
    handleSeek(e);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleSeek(e);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      if (progress < 100) {
        // Restore previous play state if we're not at the end
        onPlayingChange(wasPlayingBeforeDrag);
      }
    }
  };

  useEffect(() => {
    // Attach mouse events to document so dragging works even if the mouse leaves our bar
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="fixed bottom-0 md:bottom-4 left-0 md:left-1/2 transform md:-translate-x-1/2 w-full md:w-96 h-16 
      md:rounded-2xl z-50 overflow-hidden select-none">
      
      {/* Base Layer: Glassmorphic effect */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/20 
        shadow-lg md:rounded-2xl" />

      {/* Progress Bar Container */}
      <div 
        ref={progressBarRef} 
        className="absolute inset-0" 
        onMouseDown={handleMouseDown}
      >
        {/* Background Track */}
        <div className="absolute inset-0 bg-white/5" />
        {/* Fill that indicates progress */}
        <div
          className="absolute inset-y-0 left-0 bg-white/30 backdrop-blur-sm transition-all duration-200 ease-linear"
          style={{
            width: `${progress}%`,
            boxShadow: isPlaying || isDragging ? '0 0 20px rgba(255,255,255,0.2)' : 'none',
          }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative h-full px-3 md:px-4 flex items-center justify-between pointer-events-none">
        {/* Track Info - Now clickable with Link */}
        <Link 
          to="/album/1" 
          className="flex items-center gap-2 md:gap-4 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {!imageError ? (
            <img
              src="/carter3.jpeg"
              alt="Track cover"
              className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-cover border border-white/10 transition-transform duration-200 hover:scale-105"
              onError={() => setImageError(true)}
            />
          ):(
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-700/90 backdrop-blur-sm text-white text-xs 
            flex items-center justify-center rounded-lg border border-white/10">
            No<br />track
          </div>
          )}
          <div className="hover:opacity-80 transition-opacity duration-200">
            <p className="text-white text-xs md:text-sm font-medium select-none truncate max-w-[120px] md:max-w-full">
              {isPlaying ? 'Comfortable' : isDragging ? 'Seeking...' : 'Comfortable'}
            </p>
            <p className="text-gray-300 text-[10px] md:text-xs select-none">
              {(isPlaying || isDragging)
                ? `${formatTime(currentTime)} / ${formatTime(duration)}`
                : 'Lil Wayne'}
            </p>
          </div>
        </Link>

        {/* Controls - Buttons closer on mobile */}
        <div 
          className="flex items-center gap-1 md:gap-3 relative" 
          style={{ zIndex: 4, pointerEvents: 'auto' }}
        >
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-9 h-9 md:w-10 md:h-10 bg-white/90 backdrop-blur-sm text-black rounded-full 
              flex items-center justify-center shadow-md hover:scale-105 transition-all duration-300"
          >
            <span className="flex items-center justify-center" style={{ marginTop: '-1px' }}>
              {isPlaying ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              )}
            </span>
          </button>

          {/* Next Button */}
          <button
            className="text-white/60 hover:text-white transition-all duration-300 
                       focus:outline-none bg-transparent p-0 m-0"
            onClick={() => {
              // Restart the current song
              if (audioRef.current) {
                audioRef.current.currentTime = 0;
                setProgress(0);
                setCurrentTime(0);
                
                // If not already playing, start playback
                if (!isPlaying) {
                  onPlayingChange(true);
                }
              }
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="md:w-5 md:h-5">
              <polygon points="6,4 18,12 6,20" />
              <rect x="18" y="4" width="2" height="16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}