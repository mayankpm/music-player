import { useNavigate } from 'react-router-dom';

export default function RecentlyPlayedWide({ track }) {
  const navigate = useNavigate();
  
  return (
    <>
      {/* Mobile version */}
      <div 
        className="md:hidden w-full bg-[#222223] rounded-xl overflow-hidden flex shadow-md hover:bg-[#23232b] transition"
        onClick={() => navigate('/album/1')}
      >
        {/* Left side: Square album cover with dark mask */}
        <div className="w-24 h-24 relative overflow-hidden group cursor-pointer">
          <img
            src={track.image || '/covers/not-found.jpg'}
            alt={track.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          {/* Play button overlay */}
          <div className="absolute bottom-2 right-2 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Right side: Song info */}
        <div className="flex flex-col justify-center px-4 py-3">
          <p className="text-white text-base font-semibold">{track.title}</p>
          <p className="text-gray-400 text-xs">{track.artist}</p>
        </div>
      </div>

      {/* Desktop version */}
      <div 
        className="hidden md:flex w-[34rem] h-36 bg-[#222223] rounded-xl overflow-hidden shadow-md hover:bg-[#23232b] transition cursor-pointer"
        onClick={() => navigate('/album/1')}
      >
        {/* Left side: Big square album cover with dark mask */}
        <div className="w-36 h-full relative overflow-hidden group cursor-pointer">
          <img
            src={track.image || '/covers/not-found.jpg'}
            alt={track.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          {/* Play button overlay */}
          <div className="absolute bottom-2 right-2 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Right side: Song info */}
        <div className="flex flex-col justify-center px-6">
          <p className="text-white text-lg font-semibold">{track.title}</p>
          <p className="text-gray-400 text-sm">{track.artist}</p>
        </div>
      </div>
    </>
  );
}
