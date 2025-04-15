import { useState } from 'react';

const spotlightData = [
  {
    id: 1,
    title: 'This is Radiohead',
    artist: 'Radiohead',
    image: '/thisisradiohead.jpg',
    tag: 'Featured'
  },
  {
    id: 2,
    title: 'Timeless Music',
    artist: 'Featuring Fleetwood Mac',
    image: '/fleet.png',
    tag: null
  },
  {
    id: 3,
    title: 'Revisit Daft Punk',
    artist: 'Daft Punk',
    image: '/thisisdaftpunk.jpeg', // this one will fallback
    tag: null
  },
  {
    id: 4,
    title: 'GNX',
    artist: 'Kendrick Lamar',
    image: '/gnx.jpg', // this one will fallback
    tag: 'New'
  }
];

export default function SpotlightCarousel() {
  return (
    <section className="mt-8 px-6">
      <h2 className="text-2xl font-semibold mb-4 text-white">Spotlight</h2>

      {/* Mobile view: single full-width card */}
      <div className="md:hidden w-full overflow-x-auto snap-x snap-mandatory no-scrollbar">
        <div className="flex">
          {spotlightData.map((item) => (
            <div key={item.id} className="flex-none w-full snap-center px-1">
              <SpotlightCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop view: horizontal scrolling multiple cards */}
      <div className="hidden md:flex gap-6 overflow-x-auto no-scrollbar">
        {spotlightData.map((item) => (
          <SpotlightCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function SpotlightCard({ item }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="relative group aspect-[16/9] w-full md:w-64 rounded-lg overflow-hidden cursor-pointer"
    >
      {!imgError ? (
        <>
          <img
            src={item.image}
            alt={item.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          {/* Dark overlay mask */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-300" />
        </>
      ) : (
        <div className="w-full h-full bg-[#222223] flex items-center justify-center">
          <p className="text-gray-300 text-sm">Image not available</p>
        </div>
      )}

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end px-4 p-1 pointer-events-none">
        <p className="text-white text-lg font-semibold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
          {item.title}
        </p>
        <p className="text-gray-300 text-sm">{item.artist}</p>
        {item.tag && (
          <span className="absolute top-4 left-4 bg-white/10 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            {item.tag}
          </span>
        )}
      </div>
    </div>
  );
}
