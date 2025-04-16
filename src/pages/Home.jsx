import { useState, useEffect } from 'react';
import CuratedPlaylists from '../components/CuratedPlaylists'
import LogoHeader from '../components/LogoHeader'
import RecentlyPlayed from '../components/RecentlyPlayed'
import SpotlightCarousel from '../components/SpotlightCarousel'
import JumpRightBack from '../components/JumpRightBack'
import './Home.css'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simple fade-in on component mount
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className={`home-container ${isLoaded ? 'home-loaded' : ''}`}>
      <LogoHeader />
      <SpotlightCarousel/>
      <CuratedPlaylists/>
      <RecentlyPlayed/>
      <div style={{ marginBottom: '100px' }}>
        <JumpRightBack widePosition="right"/>
      </div>
    </main>
  )
}
