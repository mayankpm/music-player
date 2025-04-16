import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function AlbumDetailPage({ isPlaying, onPlayingChange }) {
  // eslint-disable-next-line no-unused-vars
  const { albumId = '1' } = useParams();
  const [activeTrack, setActiveTrack] = useState(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Example album data - in a real app, this would come from an API or props
  const album = {
    id: 1,
    title: "After Hours",
    artist: "The Weeknd",
    releaseYear: 2020,
    cover: "/afterhours.jpeg", // Add a default placeholder album art
    description: "After Hours is the fourth studio album by Canadian singer-songwriter The Weeknd, released on March 20, 2020. Characterized by its dark atmosphere and retro aesthetic, the album blends elements of new wave, dream pop, and R&B, creating a sonic landscape that's both nostalgic and forward-thinking. Thematically, it explores the artist's complex relationship with love, fame, and self-destructive tendencies, delivered through his signature falsetto and haunting production.",
    credits: [
      { role: "Producer", name: "The Weeknd, Max Martin, Oscar Holter" },
      { role: "Mixing", name: "Serban Ghenea, Kevin Peterson" },
      { role: "Mastering", name: "Dave Kutch" }
    ],
    tracks: [
      { id: 1, title: "Alone Again", duration: "4:10" },
      { id: 2, title: "Too Late", duration: "3:59" },
      { id: 3, title: "Hardest To Love", duration: "3:31" },
      { id: 4, title: "Scared To Live", duration: "3:11" },
      { id: 5, title: "Snowchild", duration: "4:07" },
      { id: 6, title: "Escape From LA", duration: "5:56" },
      { id: 7, title: "Heartless", duration: "3:21" },
      { id: 8, title: "Faith", duration: "4:43" },
      { id: 9, title: "Blinding Lights", duration: "3:20" },
      { id: 10, title: "In Your Eyes", duration: "3:57" },
      { id: 11, title: "Save Your Tears", duration: "3:35" },
      { id: 12, title: "After Hours", duration: "6:01" },
      { id: 13, title: "Until I Bleed Out", duration: "3:10" },
    ]
  };

  // Handle play/pause for album
  const togglePlayAlbum = () => {
    onPlayingChange(!isPlaying);
    
    // If nothing is active, select first track when playing
    if (!activeTrack && !isPlaying) {
      setActiveTrack(album.tracks[0].id);
    }
  };

  // Handle track selection
  const handleTrackSelect = (trackId) => {
    setActiveTrack(trackId);
    onPlayingChange(true);
  };

  // Animation on page load
  useEffect(() => {
    // Slight delay for a smoother entrance animation
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-black via-black to-purple-900/20">
      {/* Ambient light effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl opacity-25" />
      
      {/* Main content container */}
      <div className="flex flex-1 relative z-10">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main content with padding to account for sidebar */}
        <main className="w-full pl-0 md:pl-16 mt-2 md:mt-6 pb-24">
          <div className={`max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 transform ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            
            {/* Album detail layout - flex on larger screens, column on smaller */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 pt-4 md:pt-10">
              
              {/* Hero section (Left side) */}
              <div className={`lg:w-2/5 transition-all duration-1000 delay-100 transform ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                {/* Album cover */}
                <div className="aspect-square max-w-md mx-auto lg:mx-0 mb-8 relative">
                  <img 
                    src={album.cover}
                    alt={`${album.title} by ${album.artist}`}
                    className="w-full h-full object-cover rounded-2xl shadow-xl"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100%25" height="100%25" viewBox="0 0 300 300"%3E%3Crect width="300" height="300" fill="%23333"%3E%3C/rect%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23fff"%3EAlbum Art%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
                
                {/* Album info */}
                <div className="text-center lg:text-left mb-8 lg:mb-12">
                  <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">{album.title}</h1>
                  <h2 className="text-white/70 text-sm uppercase tracking-widest mb-6">{album.artist} • {album.releaseYear}</h2>
                  
                  {/* Play button */}
                  <button 
                    onClick={togglePlayAlbum}
                    className="inline-flex items-center px-8 py-3 rounded-full 
                    text-white hover:text-white transition-all duration-300 
                    shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                  >
                    <span className="flex items-center justify-center w-6 h-6 mr-3">
                      {isPlaying ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <rect x="6" y="4" width="4" height="16" />
                          <rect x="14" y="4" width="4" height="16" />
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5,3 19,12 5,21" />
                        </svg>
                      )}
                    </span>
                    {isPlaying ? 'Pause Album' : 'Play Album'}
                  </button>
                </div>
              </div>
              
              {/* Tracklist section (Right side) */}
              <div className={`lg:w-3/5 pt-4 transition-all duration-1000 delay-300 transform ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                {/* Table header */}
                <div className="grid grid-cols-[auto_1fr_auto] gap-4 px-4 pb-4 text-white/40 text-sm uppercase tracking-wider">
                  <div className="w-10 text-center">#</div>
                  <div>Title</div>
                  <div className="text-right">Duration</div>
                </div>
                
                {/* Tracks list */}
                <div className="px-4">
                  {album.tracks.map((track) => (
                    <button
                      key={track.id}
                      onClick={() => handleTrackSelect(track.id)}
                      className={`w-full grid grid-cols-[auto_1fr_auto] items-center gap-4 group py-3 
                        bg-transparent border-0 hover:border-transparent p-0
                        ${activeTrack === track.id ? 'text-white' : 'text-white/70 hover:text-white'}`}
                    >
                      <div className="w-10 flex items-center justify-center">
                        <span className="group-hover:opacity-0 transition-opacity duration-200">
                          {track.id}
                        </span>
                        <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 left-5">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5,3 19,12 5,21" />
                          </svg>
                        </span>
                      </div>
                      <div className="text-left font-medium">{track.title}</div>
                      <div className="text-right text-white/60">{track.duration}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Album Description Section - Below both album and tracklist */}
            <div className={`mt-16 lg:mt-24 transition-all duration-1000 delay-500 transform ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <div className="max-w-4xl mx-auto">
                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-16"></div>
                
                {/* Description */}
                <div className="px-4 md:px-8">
                  <h2 className="font-serif text-2xl md:text-3xl text-white/90 mb-8 tracking-wide">About the Album</h2>
                  <p className="text-white/70 leading-relaxed text-lg font-light mb-12 tracking-wide">
                    {album.description}
                  </p>
                  
                  {/* Credits */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    {album.credits.map((credit, index) => (
                      <div key={index} className="text-center">
                        <h3 className="text-white/40 text-sm uppercase tracking-widest mb-2">{credit.role}</h3>
                        <p className="text-white/80 font-medium">{credit.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Bottom gradient fade */}
                <div className="h-24 bg-gradient-to-t from-black/50 to-transparent mt-24"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
