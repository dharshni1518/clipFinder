import { useVideoContext } from "../context/VideoContext"
import VideoCard from "../components/VideoCard"
import CategorySelector from "../components/CategorySelector"
import "./HomePage.css"

const HomePage = () => {
  const { trendingVideos, loading, error, selectedCategory } = useVideoContext()

  if (loading) {
    return <div className="loading">Loading trending videos...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="home-page">
      <h1 className="page-title">Discover YouTube Clips</h1>

      <CategorySelector />

      <section>
        <h2 className="section-title">
          Trending {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Clips
        </h2>

        {trendingVideos.length === 0 ? (
          <div className="no-videos">No trending videos found. Try another category.</div>
        ) : (
          <div className="videos-grid">
            {trendingVideos.map((video) => (
              <VideoCard key={video.videoId} video={video} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default HomePage
