import { useEffect, useState } from 'react';
import './LoadingScreen.css';

export default function LoadingScreen({ onLoadComplete }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [hideLoadingScreen, setHideLoadingScreen] = useState(false);

  useEffect(() => {
    // Start fade out after 1.5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    // Hide the loading screen completely after the fade out
    const hideTimer = setTimeout(() => {
      setHideLoadingScreen(true);
      if (onLoadComplete) onLoadComplete();
    }, 1300); // 1.5s delay + 1s fade out

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [onLoadComplete]);

  if (hideLoadingScreen) return null;

  return (
    <div className={`loading-screen${fadeOut ? ' fade-out' : ''}`}> 
      <div className="loading-content">
        <h1 className="loading-title">OPUS</h1>
        <p className="loading-subtitle">Curating your vibe...</p>
      </div>
    </div>
  );
}
