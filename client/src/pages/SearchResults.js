import { useVideoContext } from "../context/VideoContext"
import VideoCard from "../components/VideoCard"
import "./SearchResults.css"

const SearchResults = () => {
  const { searchResults, loading, error } = useVideoContext()

  if (loading) {
    return <div className="loading">Searching videos...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="search-results">
      <h1 className="page-title">Search Results</h1>

      {searchResults.length === 0 ? (
        <div className="no-results">No videos found. Try different search terms.</div>
      ) : (
        <>
          <p className="results-count">{searchResults.length} videos found</p>
          <div className="videos-grid">
            {searchResults.map((video) => (
              <VideoCard key={video.videoId} video={video} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default SearchResults
