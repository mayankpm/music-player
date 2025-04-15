import { useState } from 'react';

export default function RecentlyPlayedCompact({ track }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="hidden md:flex w-64 h-16 items-center gap-4 cursor-pointer hover:bg-gray-800 py-8 rounded-lg transition">
      {imgError || !track.image ? (
        <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center text-gray-300 text-xs">
          No Image
        </div>
      ) : (
        <div className="relative w-16 h-16 rounded-lg overflow-hidden group">
          <img
            src={track.image}
            alt={track.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
          
          {/* Dark overlay always present but only visible on hover */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          
          {/* Play button - positioned in center, appears on hover */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
      
      <div className="overflow-hidden">
        <p className="text-white text-sm font-medium truncate">{track.title}</p>
        <p className="text-gray-400 text-xs truncate">{track.artist}</p>
      </div>
    </div>
  );
}