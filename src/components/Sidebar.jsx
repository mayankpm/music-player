import { useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar({ refreshHome }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Mock recently played albums data
  const recentAlbums = [
    { id: 1, cover: '/dsotm.jpeg', title: 'Dark Side of the Moon' },
    { id: 2, cover: '/testing.jpeg', title: 'Testing' },
    { id: 3, cover: '/chromakopia.jpeg', title: 'CHROMAKOPIA' },
    // Add more albums as needed
  ];

  return (
    <>
      {/* Main sidebar - hidden on mobile, visible on md and above */}
      <div className={`fixed left-0 top-0 h-screen w-16 hidden md:block bg-black/30 z-40 
        ${isExpanded ? 'w-64' : 'w-16'} transition-all duration-300`}>
        {/* Toggle button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -right-4 top-6 w-8 h-8 bg-white rounded-full 
            flex items-center justify-center text-white/60 hover:text-white transition-colors duration-200
            border border-white/10"
        >
          <IoMenu size={20} className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        {/* Navigation buttons */}
        <div className="flex flex-col gap-2 p-3 mt-16">
          {/* Home button */}
          <button
            className={`flex items-start gap-2 text-white/60 hover:text-white
                      transition-colors duration-200 p-2 rounded bg-transparent hover:bg-white/10
                      ${isExpanded ? 'justify-start' : 'justify-start'}`}
            onClick={(e) => {
              e.preventDefault();
              if (location.pathname === '/') {
                // If already on home, just trigger refresh animation
                refreshHome();
              } else {
                // Navigate to home
                navigate('/');
              }
            }}
          >
            <div className="w-6 h-6 flex items-start justify-start">
              <svg
                className="text-white w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
            </div>
            <span
              className={`whitespace-nowrap transition-opacity duration-200 ${
                isExpanded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Home
            </span>
          </button>

          {/* Search button */}
          <button
            className={`flex items-start gap-2 text-white/60 hover:text-white
                      transition-colors duration-200 p-2 rounded bg-transparent hover:bg-white/10
                      ${isExpanded ? 'justify-start' : 'justify-start'}`}
          >
            <div className="w-6 h-6 flex items-start justify-start">
              <svg
                className="text-white w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z" />
              </svg>
            </div>
            <span
              className={`whitespace-nowrap transition-opacity duration-200 ${
                isExpanded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Search
            </span>
          </button>
        </div>

        {/* Recent albums section */}
        <div
          className={`mt-4 px-4 transition-opacity duration-200 ${
            isExpanded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h3 className="text-sm font-medium text-white/40 px-2 mb-3">
            Recent Albums
          </h3>
          <div className="flex flex-col gap-2">
            {recentAlbums.map((album) => (
              <button
                key={album.id}
                className="flex items-center gap-2 p-2 rounded
                         hover:bg-white/10 transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-white/5 rounded-md overflow-hidden">
                  <img
                    src={album.cover}
                    alt={album.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" fill="%23333"/><text x="50%" y="50%" font-family="Arial" font-size="8" fill="white" text-anchor="middle" dy=".3em">No Image</text></svg>';
                    }}
                  />
                </div>
                <span className="text-sm text-white/80 truncate">
                  {album.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Backdrop overlay when sidebar is expanded - only visible on desktop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 hidden md:block"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
}
