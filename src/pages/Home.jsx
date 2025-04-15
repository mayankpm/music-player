import CuratedPlaylists from '../components/CuratedPlaylists'
import LogoHeader from '../components/LogoHeader'
import RecentlyPlayed from '../components/RecentlyPlayed'
import SpotlightCarousel from '../components/SpotlightCarousel' // if added later
import JumpRightBack from '../components/JumpRightBack'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
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
