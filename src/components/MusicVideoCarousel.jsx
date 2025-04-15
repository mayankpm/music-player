import { useState } from 'react';

const spotlightData = [
  {
    id: 1,
    title: 'Midnight Reverie',
    artist: 'Noirwave',
    image: '/thisisradiohead.jpg',
    tag: 'Featured'
  },
  {
    id: 2,
    title: 'Echoes of Silk',
    artist: 'Lumen Drift',
    image: '/fleet.png',
    tag: 'New Drop'
  },
  {
    id: 3,
    title: 'Lost Frequencies',
    artist: 'Aether',
    image: '/thisisdaftpunk.jpeg', // this one will fallback
    tag: null
  },
  {
    id: 4,
    title: 'Lost Frequencies',
    artist: 'Aether',
    image: '/gnx.jpg', // this one will fallback
    tag: null
  }
];

export default function SpotlightCarousel() {
  return (
    <section className="mt-8 px-6">
      <h2 className="text-2xl font-semibold mb-4 text-white">Spotlight</h2>

      <div className="flex gap-6 overflow-x-auto no-scrollbar">
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
      className="relative group aspect-[16/9] w-64 rounded-lg overflow-hidden cursor-pointer"
    >
      {!imgError ? (
        <img
          src={item.image}
          alt={item.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full bg-[#222223] flex items-center justify-center">
          <p className="text-gray-300 text-sm">Image not available</p>
        </div>
      )}

      {/* <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-300 flex flex-col justify-end p-4">
        <p className="text-white text-lg sm:text-xl font-semibold">{item.title}</p>
        <p className="text-gray-300 text-sm">{item.artist}</p>
        {item.tag && (
          <span className="absolute top-4 left-4 bg-white/10 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            {item.tag}
          </span>
        )}
      </div> */}
    </div>
  );
}
