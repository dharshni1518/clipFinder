"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import VideoCard from "../components/VideoCard"
import "./PlaylistDetails.css"

const PlaylistDetails = () => {
  const { id } = useParams()
  const [playlist, setPlaylist] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await axios.get(`https://clipfinder.onrender.com/api/playlists/${id}`)
        setPlaylist(res.data)
      } catch (err) {
        setError("Failed to fetch playlist. Please try again.")
        console.error("Error fetching playlist:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPlaylist()
  }, [id])

  if (loading) {
    return <div className="loading">Loading playlist...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  if (!playlist) {
    return <div className="error">Playlist not found</div>
  }

  return (
    <div className="playlist-details">
      <div className="playlist-header">
        <div>
          <h1 className="playlist-title">{playlist.name}</h1>
          {playlist.description && <p className="playlist-description">{playlist.description}</p>}
          <p className="video-count">
            {playlist.videos.length} {playlist.videos.length === 1 ? "video" : "videos"}
          </p>
        </div>
        <Link to="/playlists" className="back-button">
          <i className="fas fa-arrow-left"></i> Back to Playlists
        </Link>
      </div>

      {playlist.videos.length === 0 ? (
        <div className="no-videos">
          <p>This playlist is empty.</p>
          <p>Browse videos and add them to this playlist.</p>
        </div>
      ) : (
        <div className="videos-grid">
          {playlist.videos.map((video) => (
            <VideoCard key={video.videoId} video={video} />
          ))}
        </div>
      )}
    </div>
  )
}

export default PlaylistDetails
