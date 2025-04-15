import RecentlyPlayedWide from './RecentlyPlayedWide';
import RecentlyPlayedCompact from './RecentlyPlayedCompact';

const wideTrack = {
  title: 'Daydreaming',
  artist: 'Radiohead',
  image: '/amoonshapedpool.jpeg'
};

const compactTracks = [
  {
    title: 'Kitchen Lights',
    artist: 'Westside Gunn',
    image: '/brr.jpeg'
  },
  {
    title: 'Nokia',
    artist: 'Drake',
    image: '/drakealbum.png'
  },
  {
    title: 'Out Of Time',
    artist: 'The Weeknd',
    image: '/dawnfm.jpeg'
  },
  {
    title: 'Here Comes The Sun',
    artist: 'The Beatles',
    image: '/abbeyroad.jpeg'
  }
];

// Accept a prop to control the wide position
export default function RecentlyPlayed({ widePosition = 'left' }) {
  return (
    <section className="mt-8 px-6">
      <h2 className="text-white text-2xl font-semibold mb-4">Recently Played</h2>

      {/* Mobile view: Only show the wide track */}
      <div className="md:hidden">
        <RecentlyPlayedWide track={wideTrack} />
      </div>

      {/* Desktop view: Show both wide and compact layouts */}
      <div className="hidden md:flex flex-col md:flex-row gap-6">
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
