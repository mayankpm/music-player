import RecentlyPlayedWide from './RecentlyPlayedWide';
import RecentlyPlayedCompact from './RecentlyPlayedCompact';

const wideTrack = {
  title: 'Work',
  artist: 'Yeat',
  image: '/work.jpeg'
};

const compactTracks = [
  {
    title: 'HNDRXX',
    artist: 'Future',
    image: '/hndrxx.jpeg'
  },
  {
    title: 'The Life Of Pablo',
    artist: 'Kanye West',
    image: '/tlop.jpeg'
  },
  {
    title: 'ASTROWORLD',
    artist: 'Travis Scott',
    image: '/astroworld.jpeg'
  },
  {
    title: 'Government Plates',
    artist: 'Death Grips',
    image: '/governmentplates.jpeg'
  }
];

// Accept a prop to control the wide position
export default function JumpRightBack({ widePosition = 'left' }) {
  return (
    <section className="mt-8 px-6">
      <h2 className="text-white text-2xl font-semibold mb-4">Jump back in</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {widePosition === 'left' ? (
          <>
            {/* Wide track on the left */}
            <RecentlyPlayedWide track={wideTrack} />

            {/* Two columns of compact tracks */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <RecentlyPlayedCompact track={compactTracks[0]} />
                <RecentlyPlayedCompact track={compactTracks[1]} />
              </div>
              <div className="flex flex-col gap-4">
                <RecentlyPlayedCompact track={compactTracks[2]} />
                <RecentlyPlayedCompact track={compactTracks[3]} />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Two columns of compact tracks on the left */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <RecentlyPlayedCompact track={compactTracks[0]} />
                <RecentlyPlayedCompact track={compactTracks[1]} />
              </div>
              <div className="flex flex-col gap-4">
                <RecentlyPlayedCompact track={compactTracks[2]} />
                <RecentlyPlayedCompact track={compactTracks[3]} />
              </div>
            </div>
            {/* Wide track on the right */}
            <RecentlyPlayedWide track={wideTrack} />
          </>
        )}
      </div>
    </section>
  );
}
