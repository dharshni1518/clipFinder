"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useVideoContext } from "../context/VideoContext"
import { useAuthContext } from "../context/AuthContext"
import VideoCard from "../components/VideoCard"
import "./SavedClips.css"

const SavedClips = () => {
  const { savedVideos, loading, error, fetchSavedVideos } = useVideoContext()
  const { isAuthenticated } = useAuthContext()

  useEffect(() => {
    if (isAuthenticated) {
      fetchSavedVideos()
    }
  }, [fetchSavedVideos, isAuthenticated])

  if (loading) {
    return <div className="loading">Loading saved clips...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  if (!isAuthenticated) {
    return (
      <div className="auth-required">
        <h1 className="page-title">Saved Clips</h1>
        <div className="auth-message">
          <p>Please log in to view your saved clips.</p>
          <div className="auth-buttons">
            <Link to="/login" className="auth-button">
              Login
            </Link>
            <Link to="/register" className="auth-button secondary">
              Register
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="saved-clips">
      <h1 className="page-title">Your Saved Clips</h1>

      {savedVideos.length === 0 ? (
        <div className="no-saved">
          <p>You haven't saved any clips yet.</p>
          <p>Browse videos and click the save button to add them here.</p>
          <Link to="/" className="browse-button">
            Browse Videos
          </Link>
        </div>
      ) : (
        <div className="videos-grid">
          {savedVideos.map((video) => (
            <VideoCard key={video.videoId} video={video} />
          ))}
        </div>
      )}
    </div>
  )
}

export default SavedClips
