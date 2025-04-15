import React from 'react';

const playlists = [
  { name: 'Chill Mix' },
  { name: 'Jazz' },
  { name: 'Evening' },
  { name: 'Ambient' }
];

export default function CuratedPlaylists() {
  return (
    <section className="mt-8 px-6">
      <h2 className="text-white text-2xl font-semibold mb-4">Curated Playlists</h2>
      
      {/* Mobile view: full-width swipable cards */}
      <div className="md:hidden w-full overflow-x-auto snap-x snap-mandatory no-scrollbar">
        <div className="flex">
          {playlists.map((playlist, index) => (
            <div key={index} className="flex-none w-full snap-center px-1">
              <div className="w-full h-20 bg-[#222223] hover:bg-[#292933] text-white flex items-center justify-center rounded-lg transition duration-300 cursor-pointer shadow-md">
                <span className="text-lg sm:text-xl font-medium">{playlist.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Desktop view: horizontal scrolling multiple cards */}
      <div className="hidden md:flex gap-6 overflow-x-auto no-scrollbar">
        {playlists.map((playlist, index) => (
          <div
            key={index}
            className="w-64 h-20 bg-[#222223] hover:bg-[#292933] text-white flex items-center justify-center rounded-lg transition duration-300 cursor-pointer shadow-md"
          >
            <span className="text-lg sm:text-xl font-medium">{playlist.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
